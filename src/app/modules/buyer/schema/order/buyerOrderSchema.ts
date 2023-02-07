export const buyerOrderSchema = {
    $id: 'bazar/buyer/orders',
    title: 'register buyer order asset transaction asset',
    type: 'object',
    properties: {
        id: {
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
            maxLength: 50,
        },
        accountBuyer: {
            fieldNumber: 13,
            dataType: 'string',
            maxLength: 50,
        },
        productId: {
            fieldNumber: 14,
            dataType: 'string',
            maxLength: 50,
        },
        date: {
            fieldNumber: 15,
            dataType: 'uint32'
        },
        author: {
            fieldNumber: 16,
            dataType: 'bytes'
        },
    },
};