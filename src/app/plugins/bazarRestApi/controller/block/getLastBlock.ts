import { apiClient } from 'lisk-sdk';
import { BaseChannel } from 'lisk-framework';
import { Request, Response, RequestHandler } from 'express';
import { Block } from './types';

export default (channel: BaseChannel, client: apiClient.APIClient): RequestHandler =>
  async (_req: Request, res: Response) => {
    try {
      const result: string | Buffer = await channel.invoke('app:getLastBlock');
      const blockObject: Block = client.block.decode(result);
      const blockJSON = client.block.toJSON(blockObject);
      res.status(200).json({ data: blockJSON, errorMessage: null, errorCode: null });
    } catch (err: unknown) {
      res.status(400).json({
        data: null,
        errorMessage: (err as string).toString(),
        errorCode: 'E3104',
      });
    }
  };
