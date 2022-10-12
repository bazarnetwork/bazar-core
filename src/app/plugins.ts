/* eslint-disable @typescript-eslint/no-empty-function */
import { DashboardPlugin } from "@liskhq/lisk-framework-dashboard-plugin";
import { FaucetPlugin } from "@liskhq/lisk-framework-faucet-plugin";
import { Application } from 'lisk-sdk';
import { OperationPlugin } from "./plugins/operation/operation_plugin";
import { OrderPlugin } from "./plugins/order/order_plugin";

export const registerPlugins = (app: Application): void => {
    app.registerPlugin(DashboardPlugin);
    app.registerPlugin(FaucetPlugin);
    app.registerPlugin(OrderPlugin);
    app.registerPlugin(OperationPlugin);
};
