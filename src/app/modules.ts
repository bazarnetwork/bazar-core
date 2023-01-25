/* eslint-disable @typescript-eslint/no-empty-function */
import { Application } from 'lisk-sdk';
import { BuyerModule } from "./modules/buyer/buyer_module";
import { SellerModule } from "./modules/seller/seller_module";

// @ts-expect-error Unused variable error happens here until at least one module is registered
export const registerModules = (app: Application): void => {
    app.registerModule(SellerModule);
    app.registerModule(BuyerModule);
};
