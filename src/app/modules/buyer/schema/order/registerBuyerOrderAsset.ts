export const registerBuyerOrderAssetSchema = {
    $id: 'bazar/buyer/registerBuyerOrderAsset',
    title: 'registerBuyerOrder transaction asset for Buyer module',
    type: 'object',
    required: ['buyerOrderId', 'sellerOrderId', 'status', 'token', 'exchangeRate', 'valueXKg', 'quantity', 'totalPayToken', 'totalPayInUSD', 'transacctionPayment', 'accountSeller', 'accountBuyer', 'productId'],
    properties: {
        buyerOrderId: {
            fieldNumber: 1,
            dataType: 'string',
            maxLength: 50,
        },
        sellerOrderId: {
            fieldNumber: 2,
            dataType: 'string',
            maxLength: 100,
        },
        status: {
            fieldNumber: 3,
            dataType: 'string',
            maxLength: 50,
        },
        token: {
            fieldNumber: 4,
            dataType: 'string',
            maxLength: 50,
        },
        exchangeRate: {
            fieldNumber: 5,
            dataType: 'string',
            maxLength: 50,
        },
        valueXKg: {
            fieldNumber: 6,
            dataType: 'string',
            maxLength: 50,
        },
        quantity: {
            fieldNumber: 7,
            dataType: 'uint64',
        },
        serviceFee: {
            fieldNumber: 8,
            dataType: 'string',
        },
        totalPayToken: {
            fieldNumber: 9,
            dataType: 'string',
        },
        totalPayInUSD: {
            fieldNumber: 10,
            dataType: 'string',
        },
        transacctionPayment: {
            fieldNumber: 11,
            dataType: 'string',
        },
        accountSeller: {
            fieldNumber: 12,
            dataType: 'string',
        },
        accountBuyer: {
            fieldNumber: 13,
            dataType: 'string',
        },
        productId: {
            fieldNumber: 14,
            dataType: 'string',
        }
    },
};