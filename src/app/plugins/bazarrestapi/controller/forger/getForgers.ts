import { BaseChannel } from 'lisk-framework';
import { Request, Response, RequestHandler } from 'express';

export default (channel: BaseChannel): RequestHandler => async (
  _req: Request,
  res: Response,
) => {
  try {
    const result = await channel.invoke('app:getForgers');
    res.status(200).json({ data: result, errorMessage: null, errorCode: null });
  } catch (err: unknown) {
    res.status(400).json({
      data: null,
      errorMessage: (err as string).toString(),
      errorCode: 'E3102',
    });
  }
};
