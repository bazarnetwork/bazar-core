import { BasePlugin, PluginInfo } from 'lisk-sdk';
import type { BaseChannel, EventsDefinition, ActionsDefinition, SchemaWithDefault } from 'lisk-sdk';
import * as cors from 'cors';
import * as express from 'express';
import * as multer from 'multer';
import { Server } from 'http';
//import sendTransaction from './controller/transaction/sendTransaction';
import postFileController from './controller/files/postFileController';
import path = require('path');

 /* eslint-disable class-methods-use-this */
 /* eslint-disable  @typescript-eslint/no-empty-function */
 export class BazarrestapiPlugin extends BasePlugin {
    private _app: express.Express | undefined = undefined;
    private _server: Server | undefined = undefined;
    private _channel: BaseChannel | undefined = undefined;

	public static get alias(): string {
		return 'bazarrestapi';
	}

	// eslint-disable-next-line @typescript-eslint/class-literal-property-style
	public static get info(): PluginInfo {
		return {
			author: 'Diego Cortes',
			version: '0.1.0',
			name: 'bazarrestapi',
		};
	}

	// eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
	public get defaults(): SchemaWithDefault {
		return {
			$id: '/plugins/plugin-bazarrestapi/config',
			type: 'object',
			properties: {},
			required: [],
			default: {},
		}
	}

	public get events(): EventsDefinition {
		return [
			// 'block:created',
			// 'block:missed'
		];
	}

	public get actions(): ActionsDefinition {
		return {
		// 	hello: async () => { hello: 'world' },
		};
	}

	public async load(channel: BaseChannel): Promise<void> {
        this._app = express();
        this._channel = channel;
        const storage = multer.memoryStorage();
        const upload = multer({ storage: storage});


        this._app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT']}));
        this._app.use(express.json())
        
        this._app.post('/files/new', upload.single('file'), postFileController());

		this._server = this._app.listen(8088, '0.0.0.0');
	}

	public async unload(): Promise<void> {}
}

