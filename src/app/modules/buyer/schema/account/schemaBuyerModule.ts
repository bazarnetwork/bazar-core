import { AccountSchema } from "lisk-sdk";

export const buyerPropsSchema: AccountSchema = {
    type: 'object',
    properties: {
        orders: {
            fieldNumber: 1,
            type: 'array',
            items: {
                dataType: 'string',
            },
        },
    },
    default: {
        orders: [],
    }
}