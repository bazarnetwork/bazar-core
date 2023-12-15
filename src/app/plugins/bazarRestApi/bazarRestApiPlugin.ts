import consola from 'consola';
import { apiClient, BasePlugin, PluginInfo } from 'lisk-sdk';
import type { BaseChannel, EventsDefinition, ActionsDefinition, SchemaWithDefault } from 'lisk-sdk';
import * as cors from 'cors';
import * as express from 'express';
import * as multer from 'multer';
import { Server } from 'http';
import getAccountById from './controller/account/getAccountById';
import getForgers from './controller/forger/getForgers';
import getConnectedPeers from './controller/peer/getConnectedPeers';
import getLastBlock from './controller/block/getLastBlock';
import getBlockById from './controller/block/getBlockById';
import postFileController from './controller/files/postFileController';

/* eslint-disable class-methods-use-this */
/* eslint-disable  @typescript-eslint/no-empty-function */
export class BazarRestApiPlugin extends BasePlugin {
  public static get alias(): string {
    return 'bazarrestapi';
  }
  public static get info(): PluginInfo {
    return {
      author: 'Diego Cortes',
      version: '0.1.0',
      name: 'bazarrestapi',
    };
  }
  public get defaults(): SchemaWithDefault {
    return {
      $id: '/plugins/plugin-bazarrestapi/config',
      type: 'object',
      properties: {},
      required: [],
      default: {},
    };
  }

  public get events(): EventsDefinition {
    return [
      // 'block:created',
      // 'block:missed'
    ];
  }

  public get actions(): ActionsDefinition {
    return {};
  }

  public async load(channel: BaseChannel): Promise<void> {
    this._app = express();
    this._channel = channel;

    const client = await this.getClient();
    const storage = multer.memoryStorage();
    const upload = multer({ storage });

    this._app.use(cors({ origin: '*', methods: ['GET', 'POST'] }));

    this._app.use(express.json());

    this._app.get(`${this.ENDPOINT_PATH}/account/:address`, getAccountById(this._channel, client));
    this._app.get(`${this.ENDPOINT_PATH}/forgers`, getForgers(this._channel));
    this._app.get(`${this.ENDPOINT_PATH}/peers/connected`, getConnectedPeers(this._channel));
    this._app.get(`${this.ENDPOINT_PATH}/blocks`, getLastBlock(this._channel, client));
    this._app.get(`${this.ENDPOINT_PATH}/blocks/:id`, getBlockById(this._channel, client));
    this._app.post(`${this.ENDPOINT_PATH}/files/new`, upload.single('file'), postFileController());

    this._server = this._app.listen(8088, '0.0.0.0');
    consola.log(`Max connections: ${this._server.getMaxListeners()}`);
  }

  public async unload(): Promise<void> {}

  private async getClient() {
    if (!this._client) {
      this._client = await apiClient.createIPCClient('~/.lisk/bazar-core');
    }
    return this._client;
  }
  private _app: express.Express | undefined = undefined;
  private _server: Server | undefined = undefined;
  private _channel: BaseChannel | undefined = undefined;
  private _client: apiClient.APIClient | undefined = undefined;

  protected ENDPOINT_PATH: string = '/api/v1';
}
