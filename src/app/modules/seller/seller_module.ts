/* eslint-disable class-methods-use-this */

import {
    AfterBlockApplyContext,
    AfterGenesisBlockApplyContext,
    BaseModule,
    BeforeBlockApplyContext,
    codec,
    TransactionApplyContext
} from 'lisk-sdk';
import { AllOrders } from '../../../utils/types/asset/order/allOrders';
import { OrderType } from '../../../utils/types/module/order/orderType';
import { RegisterOrderAccountType } from '../../../utils/types/module/order/registerOrderAccountType';
import { OrderAsset } from "./assets/order_asset";
import { allOrdersSchema } from './schema/allOrdersSchema';
import { orderSchema } from './schema/orderSchema';
import { registerOrderAssetSchema } from './schema/registerOrderAsset';
import { sellerPropsSchema } from './schema/schemaModule';

export class SellerModule extends BaseModule {
    public actions = {
        getOrder: async (params: Record<string, unknown>) => {
            const encodedOrder = await this._dataAccess.getChainState(params.id as string);
            if (!encodedOrder) {
                return {"ooops": "error"};
            } 
            const decodedOrder = codec.decode<OrderType>(orderSchema, encodedOrder);
            return codec.toJSON(orderSchema, decodedOrder);
        },
        getLatestOrder: async (params: Record<string, unknown>) => {
            const { account: address} = params as { account: string };
            if (address) {
                const account:
                    | RegisterOrderAccountType
                    | undefined = await this._dataAccess.getAccountByAddress(Buffer.from(address, 'hex'));
                return account.seller.orders;
            }
            const allOrderBuffer: Buffer | undefined = await this._dataAccess.getChainState('order/all')
            if (allOrderBuffer) {
                const allOrders: AllOrders = codec.decode(allOrdersSchema, allOrderBuffer);
                return allOrders.orders;
            }
            return [];
        }
    };
    public reducers = {};
    public name = 'seller';
    public transactionAssets = [new OrderAsset()];
    public events = ['newOrder'];
    public id = 7007;
    public accountSchema = sellerPropsSchema;

    // public constructor(genesisConfig: GenesisConfig) {
    //     super(genesisConfig);
    // }

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
        // Get any data from stateStore using transaction info, below is an example
        // const sender = await _input.stateStore.account.getOrDefault<TokenAccount>(_input.transaction.senderAddress);
        if (_input.transaction.moduleID === this.id && _input.transaction.assetID === 0) {
            const orderAsset = codec.decode(registerOrderAssetSchema, _input.transaction.asset);

            this._channel.publish('seller:newOrder', {
                sender: _input.transaction.senderAddress.toString('hex'),
                productName: orderAsset.productName
            });
        }
    }

    public async afterGenesisBlockApply(_input: AfterGenesisBlockApplyContext) {
        // Get any data from genesis block, for example get all genesis accounts
        // const genesisAccounts = genesisBlock.header.asset.accounts;
    }
}
