import { BasePlugin, PluginInfo } from 'lisk-sdk';
import type { BaseChannel, EventsDefinition, ActionsDefinition, SchemaWithDefault } from 'lisk-sdk';
import * as cors from 'cors';
import * as express from 'express';
import { Server } from 'http';
import postFileController from './controller/files/postFileController';
import sendTransaction from './controller/transaction/sendTransaction';

 /* eslint-disable class-methods-use-this */
 /* eslint-disable  @typescript-eslint/no-empty-function */
 export class OrderPlugin extends BasePlugin {
	// private _channel!: BaseChannel;
    private _app: express.Express | undefined = undefined;
    private _server: Server | undefined = undefined;
    private _channel: BaseChannel | undefined = undefined;

	public static get alias(): string {
		return 'order';
	}

	// eslint-disable-next-line @typescript-eslint/class-literal-property-style
	public static get info(): PluginInfo {
		return {
			author: 'Diego Cortes',
			version: '0.1.0',
			name: 'order',
		};
	}

	// eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
	public get defaults(): SchemaWithDefault {
		return {
			$id: '/plugins/plugin-order/config',
			type: 'object',
			properties: {},
			required: [],
			default: {},
		}
	}

	public get events(): EventsDefinition {
		return [];
	}

	public get actions(): ActionsDefinition {
		return {};
	}

	public async load(channel: BaseChannel): Promise<void> {
        this._app = express();
        this._channel = channel;

        this._app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT']}));
        this._app.use(express.json())
        
        this._app.get('/files/new', postFileController());
        this._app.get('/transaction/new', sendTransaction(this._channel, this.codec));

		this._server = this._app.listen(8088, '0.0.0.0');
	}

	public async unload(): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            if (this._server) {
              this._server.close((err: unknown) => {
                if (err) {
                  reject(err);
                  return;
                }
                resolve();
              });
            }
          });
    }
}
