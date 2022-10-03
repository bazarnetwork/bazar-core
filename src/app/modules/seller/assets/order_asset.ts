import {
    ApplyAssetContext,
    BaseAsset,
    cryptography,
    codec,
    StateStore,
    ValidateAssetContext } from 'lisk-sdk';
import { allOrdersSchema } from '../schema/allOrdersSchema';    
import { AllOrders } from '../../../../utils/types/asset/order/allOrders';
import { orderSchema } from '../schema/orderSchema';
import { registerOrderAssetSchema } from '../schema/registerOrderAsset';
import { RegisterOrderType } from '../../../../utils/types/asset/order/registerOrderAssetType';
import { RegisterOrderAccountType } from '../../../../utils/types/module/order/registerOrderAccountType';

const getIdForOrder = (address: Buffer, nonce: bigint): Buffer => {
    const nonceBuffer = Buffer.alloc(8);
    nonceBuffer.writeBigInt64BE(nonce);
    const seed = Buffer.concat([address, nonceBuffer]);
    return cryptography.hash(seed);
};

const getAllOrders = async (stateStore: StateStore) => {
    const all = await stateStore.chain.get('order/all');    
    if (all) {
        const orders: AllOrders = codec.decode(allOrdersSchema, all);
        return orders;
    } else {
        return {
            orders: [],
        };
    }
};

export class OrderAsset extends BaseAsset {	
	public name = 'order';
  	public id = 0;
	public schema = registerOrderAssetSchema;

	public validate({ asset }: ValidateAssetContext<RegisterOrderType>): void {
		if (asset.productId.length <= 0) {
			throw new Error('Product Id is empty');
		}
		if (asset.productName.length <= 0) {
			throw new Error('Product Name is empty');
		}
		if (asset.price <= 0) {
			throw new Error('Price does not have a valid value');
		}
	}

	// eslint-disable-next-line @typescript-eslint/require-await
  public async apply({ asset, transaction, stateStore }: ApplyAssetContext<RegisterOrderType>): Promise<void> {
		const sender = await stateStore.account.get<RegisterOrderAccountType>(transaction.senderAddress);        
        const orderId = getIdForOrder(transaction.senderAddress, transaction.nonce).toString('hex');

        const order = {
            id: orderId,
            productId: asset.productId,
            productName: asset.productName,
            productDescription: asset.productDescription,
            price: asset.price,
            date: Math.floor(Date.now() / 1000),
            author: sender.address
        };

        await stateStore.chain.set(orderId, codec.encode(orderSchema, order));

        const allOrders: AllOrders = await getAllOrders(stateStore);
        allOrders.orders.push(orderId);
        await stateStore.chain.set('order/all', codec.encode(allOrdersSchema, allOrders));
        
        /*if (!sender.) {
            sender.order.orders = [];
        }*/
        sender.seller.orders.push(orderId);
        //sender.order.orders = [...orderId];
        await stateStore.account.set(sender.address, sender);
	}
}
