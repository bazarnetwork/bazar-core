import {
    ApplyAssetContext,
    BaseAsset,
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
        if (asset.buyerOrderId.length <= 0) {
            throw new Error('Buyer Order Id is empty');
        } else if (asset.sellerOrderId.length <= 0) {
            throw new Error('Seller Order Id is empty');
		} else if (asset.status.length <= 0) {
            throw new Error('Status is empty');
        } else if (asset.token.length <= 0) {
            throw new Error('Token used in transaction is empty');
        } else if (asset.exchangeRate.length <= 0) {
            throw new Error('Exchange Rate is empty');
        } else if (asset.valueXKg.length <= 0) {
            throw new Error('Value X Kg is empty');
        } else if (asset.quantity <= 0) {
            throw new Error('Quantity hasnot value');
        } else if (asset.totalPayToken.length <= 0) {
            throw new Error('Total Payment in Token hasnot value');
        } else if (asset.totalPayInUSD.length <= 0) {
            throw new Error('Total Payment in USD hasnot value');
        } else if (asset.transacctionPayment.length <= 0) {
            throw new Error('Transacction Payment is empty');
        } else if (asset.accountSeller.length <= 0) {
			throw new Error('Account of seller is empty');
		} else if (asset.accountBuyer.length <= 0) {
			throw new Error('Account of buyer is empty');
		} else if (asset.productId.length <= 0) {
            throw new Error('Product Id is empty');
        }
    }

	// eslint-disable-next-line @typescript-eslint/require-await
    public async apply({ asset, transaction, stateStore }: ApplyAssetContext<RegisterOrderType>): Promise<void> {
	    const sender = await stateStore.account.get<RegisterBuyerOrderAccountType>(transaction.senderAddress);
        const orderBuffer = await stateStore.chain.get(asset.sellerOrderId);
        if (orderBuffer) {
            const decodedOrder = codec.decode<OrderType>(orderSchema, orderBuffer);

            if (decodedOrder.quantity >= asset.quantity) {

                const buyerOrder = {
                    id: asset.buyerOrderId,                    
                    sellerOrderId: asset.sellerOrderId,
                    status: asset.status,
                    token: asset.token,
                    exchangeRate: asset.exchangeRate,
                    valueXKg: asset.valueXKg,
                    quantity: asset.quantity,
                    serviceFee: asset.serviceFee,
                    totalPayToken: asset.totalPayToken,
                    totalPayInUSD: asset.totalPayInUSD,
                    transacctionPayment: asset.transacctionPayment,
                    accountSeller: asset.accountSeller,
                    accountBuyer: asset.accountBuyer,
                    productId: asset.productId,
                    date: Math.floor(Date.now() / 1000),
                    author: sender.address
                };

                await stateStore.chain.set(asset.buyerOrderId, codec.encode(buyerOrderSchema, buyerOrder));
                
                // updading inventory
                decodedOrder.quantity = decodedOrder.quantity - asset.quantity
                
                const allOrders: AllOrders = await getAllOrders(stateStore);
                allOrders.orders.push(asset.buyerOrderId);
                await stateStore.chain.set('purchasing_history/all', codec.encode(allOrdersSchema, allOrders));

                sender.buyer.orders.push(asset.buyerOrderId);
                await stateStore.chain.set(asset.sellerOrderId, codec.encode(orderSchema, decodedOrder));
                await stateStore.account.set(sender.address, sender);
            } else {
                throw new Error('Quantity to buy exceeds inventary');
            }
        }
	}
}
