import { create } from 'ipfs-http-client';
import { Request, Response, RequestHandler } from 'express';

export default (): RequestHandler => async (req: Request, res: Response) => {
  try {
    const ipfs = create();
    const { file } = req;
    if (file) {
      const { cid } = await ipfs.add({ path: file.originalname, content: file.buffer });
      res.status(200).json({
        data: { hash: cid.toString(), filename: file.originalname },
        errorMessage: null,
        errorCode: null,
      });
    } else {
      throw new Error('No File found.');
    }
  } catch (err: unknown) {
    res.status(400).json({
      data: null,
      errorMessage: (err as string).toString(),
      errorCode: 'E3100',
    });
  }
};
