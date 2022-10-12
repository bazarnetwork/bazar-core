import { create } from 'ipfs-http-client'
import { Request, Response } from 'express';

export default () => async (req: Request, res: Response) => {
    try {        
        const ipfs = create();
        const { cid } = await ipfs.add( { path: "say.txt", content: "Hola Cafeto 2"});

        res.status(200).json({ data: { hash: cid.toString()}, meta: req.params });
    } catch (err: unknown) {
        res.status(404).json ( {
            data: (err as string).toString(),
            meta: req.params
        });
    }
};
 