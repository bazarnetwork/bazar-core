import { AccountSchema } from "lisk-sdk";

export const sellerPropsSchema: AccountSchema = {
    type: 'object',
    properties: {
        orders: {
            fieldNumber: 1,
            type: 'array',
            items: {
                dataType: 'string',
            },
        },
        files: {
            fieldNumber: 2,
            type: 'array',
            items: {
                dataType: 'string',
            },
        },
        transport: {
            fieldNumber: 3,
            type: 'array',
            items: {
                dataType: 'string',
            },
        }
    },
    default: {
        orders: [],
        files: [],
        transport: [],
    }
};