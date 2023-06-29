/* eslint-disable @typescript-eslint/no-empty-function */
import { Application } from 'lisk-sdk';
import { BuyerModule } from './modules/buyer/buyer_module';
import { SellerModule } from './modules/seller/seller_module';

export const registerModules = (app: Application): void => {
  app.registerModule(SellerModule);
  app.registerModule(BuyerModule);
};
