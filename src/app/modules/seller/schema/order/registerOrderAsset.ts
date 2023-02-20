export const registerOrderAssetSchema = {
    $id: 'bazar/seller/registerOrderAsset',
    title: 'registerOrderAsset transaction asset for Seller module',
    type: 'object',
    required: ['orderId', 'productId', 'productName', 'productDescription', 'quantity', 'price'],
    properties: {
        productId: {
            fieldNumber: 1,
            dataType: 'string',
            maxLength: 50,
        },
        productName: {
            fieldNumber: 2,
            dataType: 'string',
            maxLength: 100,
        },
        productDescription: {
            fieldNumber: 3,
            dataType: 'string',
            maxLength: 500,
        },
        minQuantityToSell: {
            fieldNumber: 4,
            dataType: 'uint64',
        },
        quantity: {
            fieldNumber: 5,
            dataType: 'uint64',
        },
        price: {
            fieldNumber: 6,
            dataType: 'uint64',
        },
        orderId: {
            fieldNumber: 7,
            dataType: 'string',
            maxLength: 50,
        },
        files: {
            fieldNumber: 8,
            type: 'array',
            items: {
                type: 'object',
                required: ['filename', 'fileType', 'fileCategory', 'hash'],
                properties: {
                    filename: {
                        fieldNumber: 1,
                        dataType: 'string',
                        maxLength: 50
                    },
                    fileType: {
                        fieldNumber: 2,
                        dataType: 'string',
                        maxLength: 5
                    },
                    fileCategory: {
                        fieldNumber: 3,
                        dataType: 'string',
                        maxLength: 50
                    }, 
                    hash: {
                        fieldNumber: 4,
                        dataType: 'string',
                    },
                },

            },
        },
    },
};