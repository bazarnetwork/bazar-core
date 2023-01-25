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
        productName: {
            fieldNumber: 2,
            dataType: 'string',
            maxLength: 100,
        },
        sellerOrderId: {
            fieldNumber: 3,
            dataType: 'string',
            maxLength: 50,
        },
        quantity: {
            fieldNumber: 4,
            dataType: 'uint64',
        },
        price: {
            fieldNumber: 5,
            dataType: 'uint64',
        },        
        date: {
            fieldNumber: 6,
            dataType: 'uint32'
        },
        author: {
            fieldNumber: 7,
            dataType: 'bytes'
        },
    },
};