/* eslint-disable @typescript-eslint/no-empty-function */
import { DashboardPlugin } from "@liskhq/lisk-framework-dashboard-plugin";
import { FaucetPlugin } from "@liskhq/lisk-framework-faucet-plugin";
import { Application } from 'lisk-sdk';
import { BazarrestapiPlugin } from "./plugins/bazarrestapi/bazarrestapi_plugin";

export const registerPlugins = (app: Application): void => {
    app.registerPlugin(DashboardPlugin);
    //app.registerPlugin(FaucetPlugin);
    app.registerPlugin(BazarrestapiPlugin);
};
