export const orderSchema = {
    $id: 'bazar/orders',
    title: 'registerOrderAsset transaction asset',
    type: 'object',
    properties: {
        id: {
            fieldNumber: 1,
            dataType: 'string',
            maxLength: 50,
        },
        productId: {
            fieldNumber: 2,
            dataType: 'string',
            maxLength: 50,
        },
        productName: {
            fieldNumber: 3,
            dataType: 'string',
            maxLength: 100,
        },
        productDescription: {
            fieldNumber: 4,
            dataType: 'string',
            maxLength: 500,
        },
        price: {
            fieldNumber: 5,
            dataType: 'uint64',
        },
        date: {
            fieldNumber: 7,
            dataType: 'uint32'
        },
        author: {
            fieldNumber: 8,
            dataType: 'bytes'
        },
    },
};