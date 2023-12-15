/* eslint-disable class-methods-use-this */

import {
  AfterBlockApplyContext,
  AfterGenesisBlockApplyContext,
  BaseModule,
  BeforeBlockApplyContext,
  codec,
  TransactionApplyContext,
} from 'lisk-sdk';
import { FilesAsset } from './assets/filesAsset';
import { SellerOrderAsset } from './assets/sellerOrderAsset';
import { TransportStatusAsset } from './assets/transportStatusAsset';
import { sellerPropsSchema } from './schema/account/schemaModule';
import { allOrdersSchema } from './schema/order/allOrdersSchema';
import { orderSchema } from './schema/order/orderSchema';
import { registerOrderAssetSchema } from './schema/order/registerOrderAsset';
import {
  AllOrders,
  OrderType,
  RegisterOrderAccountType,
  RegisterOrderType,
} from './types/orderTypes';

export class SellerModule extends BaseModule {
  // Lifecycle hooks
  public async beforeBlockApply(_input: BeforeBlockApplyContext) {
    // Get any data from stateStore using block info, below is an example getting a generator
    // const generatorAddress = getAddressFromPublicKey(_input.block.header.generatorPublicKey);
    // const generator = await _input.stateStore.account.get<TokenAccount>(generatorAddress);
  }

  public async afterBlockApply(_input: AfterBlockApplyContext) {
    // Get any data from stateStore using block info, below is an example getting a generator
    // const generatorAddress = getAddressFromPublicKey(_input.block.header.generatorPublicKey);
    // const generator = await _input.stateStore.account.get<TokenAccount>(generatorAddress);
  }

  public async beforeTransactionApply(_input: TransactionApplyContext) {
    // Get any data from stateStore using transaction info, below is an example
    // const sender = await _input.stateStore.account.getOrDefault<TokenAccount>(_input.transaction.senderAddress);
  }

  public async afterTransactionApply(_input: TransactionApplyContext) {
    if (_input.transaction.moduleID === this.id && _input.transaction.assetID === 0) {
      const orderAsset = codec.decode<RegisterOrderType>(
        registerOrderAssetSchema,
        _input.transaction.asset,
      );

      const pub = this._channel.publish('seller:newOrder', {
        sender: _input.transaction.senderAddress.toString('hex'),
        productName: orderAsset.productName,
      });
      return Promise.resolve(pub);
    }
    return Promise.reject();
  }

  public async afterGenesisBlockApply(_input: AfterGenesisBlockApplyContext) {
    // Get any data from genesis block, for example get all genesis accounts
    // const genesisAccounts = genesisBlock.header.asset.accounts;
  }

  public actions = {
    getOrder: async (params: Record<string, unknown>) => {
      const encodedOrder = await this._dataAccess.getChainState(params.id as string);
      if (!encodedOrder) {
        return { Info: 'Incorrect body payload.' };
      }
      const decodedOrder = codec.decode<OrderType>(orderSchema, encodedOrder);
      return codec.toJSON(orderSchema, decodedOrder);
    },
    getLatestOrder: async (params: Record<string, unknown>) => {
      const { account: address } = params as { account: string };
      if (address) {
        const account: RegisterOrderAccountType | undefined =
          await this._dataAccess.getAccountByAddress(Buffer.from(address, 'hex'));
        return account.seller.orders;
      }
      const allOrderBuffer: Buffer | undefined = await this._dataAccess.getChainState('order/all');
      if (allOrderBuffer) {
        const allOrders: AllOrders = codec.decode(allOrdersSchema, allOrderBuffer);
        return allOrders.orders;
      }
      return [];
    },
  };

  // public constructor(genesisConfig: GenesisConfig) {
  //     super(genesisConfig);
  // }

  public reducers = {};
  public name = 'seller';
  public transactionAssets = [new SellerOrderAsset(), new FilesAsset(), new TransportStatusAsset()];
  public events = ['newOrder'];
  public id = 7007;
  public accountSchema = sellerPropsSchema;
}
