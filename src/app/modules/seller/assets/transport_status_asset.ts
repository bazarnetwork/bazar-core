import { BaseAsset, ApplyAssetContext, ValidateAssetContext, cryptography, codec } from 'lisk-sdk';
import { orderSchema } from '../schema/order/orderSchema';
import { transportStatusAssetSchema } from '../schema/transportStatus/transportStatusAsset';
import { OrderType } from '../types/order/orderType';
import { RegisterOrderAccountType } from '../types/order/registerOrderAccountType';
import { TransportStatusType } from '../types/transportStatus/transportStatusType';

const getId = (address: Buffer, nonce: bigint): Buffer => {
    const nonceBuffer = Buffer.alloc(8);
    nonceBuffer.writeBigInt64BE(nonce);
    const seed = Buffer.concat([address, nonceBuffer]);
    return cryptography.hash(seed);
};

export class TransportStatusAsset extends BaseAsset {
	public name = 'transportStatus';
    public id = 2;

  // Define schema for asset
	public schema = transportStatusAssetSchema;

  public validate({ asset }: ValidateAssetContext<TransportStatusType>): void {
    if (asset.orderId.length <= 0) {
        throw new Error('Order Id is empty');
    } else if (asset.origin.length <= 0) {
        throw new Error('Origin is empty');
    } else if (asset.destiny.length <= 0) {
        throw new Error('Destiny is empty');
    } else if (asset.location.length <= 0) {
        throw new Error('Location is empty');
    } else if (asset.status.length <= 0) {
        throw new Error('Status is empty');
    }
  }

	// eslint-disable-next-line @typescript-eslint/require-await
  public async apply({ asset, transaction, stateStore }: ApplyAssetContext<TransportStatusType>): Promise<void> {
    const sender = await stateStore.account.get<RegisterOrderAccountType>(transaction.senderAddress);

    const orderBuffer = await stateStore.chain.get(asset.orderId);
    if (orderBuffer) {
        const decodedOrder = codec.decode<OrderType>(orderSchema, orderBuffer);

        const transport = {
            origin: asset.origin,
            destiny: asset.destiny,
            location: asset.location,
            date: Math.floor(Date.now() / 1000),
            status: asset.status,
            author: sender.address 
        };

        const transportStatusId = getId(transaction.senderAddress, transaction.nonce).toString('hex');

        decodedOrder.transport.push(transport);
        
        sender.seller.transport.push(`${asset.orderId}#${transportStatusId}`);

        await stateStore.chain.set(asset.orderId, codec.encode(orderSchema, decodedOrder));
        await stateStore.account.set(sender.address, sender);
    }
  }
}
