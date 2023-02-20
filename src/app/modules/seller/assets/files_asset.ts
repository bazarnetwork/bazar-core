import { BaseAsset, ApplyAssetContext, ValidateAssetContext, cryptography, codec } from 'lisk-sdk';
import { fileRecordAssetSchema } from '../schema/files/fileRecordAsset';
import { orderSchema } from '../schema/order/orderSchema';
import { FileRecordType } from '../types/files/fileRecordType';
import { OrderType } from '../types/order/orderType';
import { RegisterOrderAccountType } from '../types/order/registerOrderAccountType';

const getId = (address: Buffer, nonce: bigint): Buffer => {
    const nonceBuffer = Buffer.alloc(8);
    nonceBuffer.writeBigInt64BE(nonce);
    const seed = Buffer.concat([address, nonceBuffer]);
    return cryptography.hash(seed);
};

export class FilesAsset extends BaseAsset {
	public name = 'files';
    public id = 1;
	public schema = fileRecordAssetSchema;

  public validate({ asset }: ValidateAssetContext<FileRecordType>): void {
    if (asset.filename.length <= 0) {
        throw new Error('Filename is empty');
    } else if (asset.fileType.length <= 0) {
        throw new Error('File Type is empty');
    } else if (asset.fileCategory.length <= 0) {
        throw new Error('File Category is empty');
    } else if (asset.hash.length <= 0) {
        throw new Error('Hash is empty');
    }
  }

	// eslint-disable-next-line @typescript-eslint/require-await
  public async apply({ asset, transaction, stateStore }: ApplyAssetContext<FileRecordType>): Promise<void> {
    const sender = await stateStore.account.get<RegisterOrderAccountType>(transaction.senderAddress);
    
    const orderBuffer = await stateStore.chain.get(asset.orderId);
    if (orderBuffer) {
        const decodedOrder = codec.decode<OrderType>(orderSchema, orderBuffer);
                
        const file = {
            filename: asset.filename,
            fileType: asset.fileType,
            fileCategory: asset.fileCategory,
            hash: asset.hash,
            date: Math.floor(Date.now() / 1000),
            author: sender.address
        };
        const fileId = getId(transaction.senderAddress, transaction.nonce).toString('hex');

        decodedOrder.files.push(file);

        sender.seller.files.push(`${asset.orderId}#${fileId}`);

        await stateStore.chain.set(asset.orderId, codec.encode(orderSchema, decodedOrder));
        await stateStore.account.set(sender.address, sender);
    }    
  } 
}
