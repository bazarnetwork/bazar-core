/* eslint-disable @typescript-eslint/no-empty-function */
import { Application } from 'lisk-sdk';
import { BuyerModule } from './modules/buyer/buyerModule';
import { SellerModule } from './modules/seller/sellerModule';

export const registerModules = (app: Application): void => {
  app.registerModule(SellerModule);
  app.registerModule(BuyerModule);
};
