/* eslint-disable class-methods-use-this */

import {
  AfterBlockApplyContext,
  AfterGenesisBlockApplyContext,
  BaseModule,
  BeforeBlockApplyContext,
  codec,
  TransactionApplyContext,
} from 'lisk-sdk';
import { allOrdersSchema } from '../seller/schema/order/allOrdersSchema';
import { AllOrders } from '../seller/types/order/allOrders';
import { BuyerOrderAsset } from './assets/buyerOrderAsset';
import { buyerPropsSchema } from './schema/account/schemaBuyerModule';
import { buyerOrderSchema } from './schema/order/buyerOrderSchema';
import { registerBuyerOrderAssetSchema } from './schema/order/registerBuyerOrderAsset';
import { BuyerOrderType } from './types/order/BuyerOrderType';
import { RegisterOrderType } from './types/order/registerBuyerOrderType'
import { RegisterBuyerOrderAccountType } from './types/order/RegisterBuyerOrderAccountType';

export class BuyerModule extends BaseModule {
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
      const orderAsset = codec.decode<RegisterOrderType>(registerBuyerOrderAssetSchema, _input.transaction.asset);

      const pub = this._channel.publish('buyer:newPurchaseOrder', {
        sender: _input.transaction.senderAddress.toString('hex'),
        status: orderAsset.productId,
        quantity: orderAsset.quantity,
        price: orderAsset.totalPayInUSD,
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
      const decodedOrder = codec.decode<BuyerOrderType>(buyerOrderSchema, encodedOrder);
      return codec.toJSON(buyerOrderSchema, decodedOrder);
    },
    getLatestOrder: async (params: Record<string, unknown>) => {
      const { account: address } = params as { account: string };
      if (address) {
        const account:
          | RegisterBuyerOrderAccountType
          | undefined = await this._dataAccess.getAccountByAddress(Buffer.from(address, 'hex'));
        return account.buyer.orders;
      }
      const allOrderBuffer: Buffer | undefined = await this._dataAccess.getChainState(
        'purchasing_history/all',
      );
      if (allOrderBuffer) {
        const allOrders: AllOrders = codec.decode(allOrdersSchema, allOrderBuffer);
        return allOrders.orders;
      }
      return [];
    },
  };
  public reducers = {};
  public name = 'buyer';
  public transactionAssets = [new BuyerOrderAsset()];
  public events = ['newPurchaseOrder'];
  public id = 7008;
  public accountSchema = buyerPropsSchema;

  // public constructor(genesisConfig: GenesisConfig) {
  //     super(genesisConfig);
  // }

}
