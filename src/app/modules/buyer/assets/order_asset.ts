import {
    ApplyAssetContext,
    BaseAsset,    
    cryptography,
    codec,
    StateStore,
    ValidateAssetContext } from 'lisk-sdk';
import { allOrdersSchema } from '../../seller/schema/order/allOrdersSchema';
import { orderSchema } from '../../seller/schema/order/orderSchema';
import { AllOrders } from '../../seller/types/order/allOrders';
import { OrderType } from '../../seller/types/order/orderType';
import { buyerOrderSchema } from '../schema/order/buyerOrderSchema';
import { registerBuyerOrderAssetSchema } from '../schema/order/registerBuyerOrderAsset';
import { RegisterBuyerOrderAccountType } from '../types/order/RegisterBuyerOrderAccountType';
import { RegisterOrderType } from '../types/order/registerBuyerOrderType';

const getId = (address: Buffer, nonce: bigint): Buffer => {
    const nonceBuffer = Buffer.alloc(8);
    nonceBuffer.writeBigInt64BE(nonce);
    const seed = Buffer.concat([address, nonceBuffer]);
    return cryptography.hash(seed);
};

const getAllOrders = async (stateStore: StateStore) => {
    const all = await stateStore.chain.get('purchasing_history/all');    
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
    public schema = registerBuyerOrderAssetSchema;

    public validate({ asset }: ValidateAssetContext<RegisterOrderType>): void {
        if (asset.sellerOrderId.length <= 0) {
            throw new Error('Seller Order Id is empty');
		} else if (asset.quantity <= 0) {
			throw new Error('Quantity does not have a valid value');
		} else if (asset.price <= 0) {
			throw new Error('Price does not have a valid value');
		}
    }

	// eslint-disable-next-line @typescript-eslint/require-await
    public async apply({ asset, transaction, stateStore }: ApplyAssetContext<RegisterOrderType>): Promise<void> {
	    const sender = await stateStore.account.get<RegisterBuyerOrderAccountType>(transaction.senderAddress);
        const orderBuffer = await stateStore.chain.get(asset.sellerOrderId);
        if (orderBuffer) {
            const decodedOrder = codec.decode<OrderType>(orderSchema, orderBuffer);

            if (decodedOrder.quantity >= asset.quantity) {

                const buyerOrderId = getId(transaction.senderAddress, transaction.nonce).toString('hex'); 

                const buyerOrder = {
                    id: buyerOrderId,
                    productName: decodedOrder.productName,
                    sellerOrderId: asset.sellerOrderId,
                    quantity: asset.quantity,
                    price: asset.price,
                    date: Math.floor(Date.now() / 1000),
                    author: sender.address
                };

                await stateStore.chain.set(buyerOrderId, codec.encode(buyerOrderSchema, buyerOrder));
                
                // updading inventory
                decodedOrder.quantity = decodedOrder.quantity - asset.quantity
                
                const allOrders: AllOrders = await getAllOrders(stateStore);
                allOrders.orders.push(buyerOrderId);
                await stateStore.chain.set('purchasing_history/all', codec.encode(allOrdersSchema, allOrders));

                sender.buyer.orders.push(buyerOrderId);
                await stateStore.chain.set(asset.sellerOrderId, codec.encode(orderSchema, decodedOrder));
                await stateStore.account.set(sender.address, sender);
            } else {
                throw new Error('Quantity to buy exceeds inventary');
            }
        }
	}
}
