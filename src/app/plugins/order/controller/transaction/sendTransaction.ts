import { channel } from "diagnostics_channel";
import { Request, Response } from "express";

import { BaseChannel, cryptography, PluginCodec, TransactionJSON, transactions } from "lisk-sdk";

export const getSchema = async (channel: BaseChannel): Promise<Record<string, unknown>> => channel.invoke('app:getSchema');
export const getNodeInfo = async (channel: BaseChannel): Promise<Record<string, unknown>> => channel.invoke('app:getNodeInfo');
export const postTransaction = async (
    channel: BaseChannel, transaction: string): Promise<Record<string, string>> => channel.invoke('app:postTransaction', {transaction});

export interface TransactionType<T> {
    moduleID: number;
    assetID: number;
    fee: string;
    asset: T;
    nonce: string;
    senderPublicKey: string;
}

type TransferTokenProps = {
    amount: bigint;
    recipientAddress: Buffer;
    data: string;
  };

type TransferTokenUI = Omit<TransferTokenProps, 'amount' | 'recipientAddress'> & {
    amount: string;
    recipientAddress: string;
  };
  

function transferToken(
    payload: TransactionType<TransferTokenUI>,
  ): TransactionType<TransferTokenProps> {
    return {
      ...payload,
      asset: {
        ...payload.asset,
        amount: BigInt(payload.asset.amount),
        recipientAddress: Buffer.from(payload.asset.recipientAddress, 'hex'),
      },
    };
  }

function transformAsset(payload: Record<string, unknown>) {
    return transferToken((payload as unknown) as TransactionType<TransferTokenUI>);
}

export default (channel: BaseChannel, codec: PluginCodec) => async (
    request: Request,
    response: Response,) => {        
        try { 
            const payload = request.body as { payload: Record<string, unknown> };
            if (payload.moduleID !== undefined || payload.assetID !== undefined) {
                const passphrase = "";  // TODO
                const publicKey =  cryptography.getPrivateAndPublicKeyFromPassphrase(passphrase);

                const transactionAssets = getSchema.transactionsAssets as {
                    moduleID: payload.moduleID;
                    assetID: payload.assetID;
                    schema: Record<string, unknown>;
                }[];

                const index = transactionAssets.findIndex(t => t.moduleID === payload.moduleID && t.assetID === payload.assetID);
                const schema = transactionAssets[index].schema;

                const { id, ...tx } = transactions.signTransaction(
                    schema,
                    {
                        ...transformAsset(payload),
                        fee: BigInt(payload.fee as string),
                        nonce: BigInt(payload.nonce as string),
                        senderPublicKey: publicKey,
                    },
                    Buffer.from(getNodeInfo.networkIdentifier, 'hex'),
                    passphrase,
                );

                const encodedTransaction = codec.encodeTransaction((tx as unknown) as TransactionJSON);
                const result = await postTransaction(channel, encodedTransaction);

                response.status(200).json( { data: result, meta: request.body as { payload: Record<string, unknown> }});

            } else {
                throw new Error('Transaction has incorrect parameters');
            }
        } catch (err: unknown) {
            request.status(409).json({
                data: (err as string).toString(),
                meta: request.body as { payload: Record<string, unknown>}
            });
        }
    };
   