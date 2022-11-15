import { apiClient } from 'lisk-sdk';
import { BaseChannel } from 'lisk-framework';
import { Request, Response } from 'express';

export default (channel: BaseChannel, client: apiClient.APIClient) => async (req: Request, res: Response) => {
    const { address } = req.params;
    try {
        const result: string | Buffer = await channel.invoke('app:getAccount', {
            address: address
        });
        const accountObject = client.account.decode(result);
        const accountJSON = client.account.toJSON(accountObject);
        res.status(200).json({data: accountJSON, errorMessage: null, errorCode : null});
    } catch (err: unknown) {
        res.status(400).json ( {
            data: null,
            errorMessage: (err as string).toString(),
            errorCode : "E3101"
        });
    }    
};