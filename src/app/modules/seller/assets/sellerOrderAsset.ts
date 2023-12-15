import { ApplyAssetContext, BaseAsset, codec, StateStore, ValidateAssetContext } from 'lisk-sdk';
import { AllOrders, RegisterOrderAccountType, RegisterOrderType } from '../types/orderTypes';
import { registerOrderAssetSchema } from '../schema/order/registerOrderAsset';
import { allOrdersSchema } from '../schema/order/allOrdersSchema';
import { orderSchema } from '../schema/order/orderSchema';

const getAllOrders = async (stateStore: StateStore) => {
  const all = await stateStore.chain.get('order/all');
  if (all) {
    const orders: AllOrders = codec.decode(allOrdersSchema, all);
    return orders;
  }
  return {
    orders: [],
  };
};

export class SellerOrderAsset extends BaseAsset {
  public validate({ asset }: ValidateAssetContext<RegisterOrderType>): void {
    if (asset.orderId.length <= 0) {
      throw new Error('Order Id is empty');
    } else if (asset.productId.length <= 0) {
      throw new Error('Product Id is empty');
    } else if (asset.productName.length <= 0) {
      throw new Error('Product Name is empty');
    } else if (asset.minQuantityToSell <= 0) {
      throw new Error('Min quantity to sell does not have a valid value');
    } else if (asset.quantity <= 0) {
      throw new Error('Quantity does not have a valid value');
    } else if (asset.price <= 0) {
      throw new Error('Price does not have a valid value');
    }
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async apply({
    asset,
    transaction,
    stateStore,
  }: ApplyAssetContext<RegisterOrderType>): Promise<void> {
    const sender = await stateStore.account.get<RegisterOrderAccountType>(
      transaction.senderAddress,
    );

    const newFiles = asset.files
      ? asset.files.map(file => ({
          filename: file.filename,
          fileType: file.fileType,
          fileCategory: file.fileCategory,
          hash: file.hash,
          date: Math.floor(Date.now() / 1000),
          author: sender.address,
        }))
      : [];

    const order = {
      id: asset.orderId,
      productId: asset.productId,
      productName: asset.productName,
      productDescription: asset.productDescription,
      minQuantityToSell: asset.minQuantityToSell,
      quantity: asset.quantity,
      price: asset.price,
      files: newFiles,
      transport: [],
      date: Math.floor(Date.now() / 1000),
      author: sender.address,
    };

    await stateStore.chain.set(asset.orderId, codec.encode(orderSchema, order));

    const allOrders: AllOrders = await getAllOrders(stateStore);
    allOrders.orders.push(asset.orderId);
    await stateStore.chain.set('order/all', codec.encode(allOrdersSchema, allOrders));

    sender.seller.orders.push(asset.orderId);
    await stateStore.account.set(sender.address, sender);
  }

  public name = 'order';
  public id = 0;
  public schema = registerOrderAssetSchema;
}
