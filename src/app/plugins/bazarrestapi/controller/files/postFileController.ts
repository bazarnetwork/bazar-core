import { create } from 'ipfs-http-client'
import { Request, Response } from 'express';

export default () => async (req: Request, res: Response) => {
    try {        
        const ipfs = await create();
        const { cid } = await ipfs.add( {path: req.file.originalname, content: req.file.buffer });
        res.status(200).json({ data: { hash: cid.toString(), filename: req.file.originalname}, errorMessage: null, errorCode : null});        
    } catch (err: unknown) {
        res.status(400).json ( {
            data: null,
            errorMessage: (err as string).toString(),
            errorCode : "E3100"
        });
    }
};
 