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
        minQuantityToSell: {
            fieldNumber: 5,
            dataType: 'uint64',
        },
        quantity: {
            fieldNumber: 6,
            dataType: 'uint64',
        },
        price: {
            fieldNumber: 7,
            dataType: 'uint64',
        },
        files: {
            fieldNumber: 8,
            type: 'array',            
            items: {
                type: 'object',
                properties: {
                    filename: {
                        fieldNumber: 1,
                        dataType: 'string',
                    },
                    fileType: {
                        fieldNumber: 2,
                        dataType: 'string',
                    },                    
                    fileCategory:  {
                        fieldNumber: 3,
                        dataType: 'string',
                    },
                    hash: {
                        fieldNumber: 4,
                        dataType: 'string',
                    },
                    date: {
                        fieldNumber: 5,
                        dataType: 'uint32',
                    },
                    author: {
                        fieldNumber: 6,
                        dataType: 'bytes',
                    },
                },
            },
        },
        transport: {
            fieldNumber: 9,
            type: 'array',            
            items: {
                type: 'object',
                properties: {
                    origin: {
                        fieldNumber: 1,
                        dataType: 'string',
                    },
                    destiny: {
                        fieldNumber: 2,
                        dataType: 'string',
                    },                    
                    location:  {
                        fieldNumber: 3,
                        dataType: 'string',
                    },
                    date: {
                        fieldNumber: 4,
                        dataType: 'uint32',
                    },
                    status: {
                        fieldNumber: 5,
                        dataType: 'string',
                    },
                    author: {
                        fieldNumber: 6,
                        dataType: 'bytes',
                    },
                },
            },
        },
        date: {
            fieldNumber: 10,
            dataType: 'uint32'
        },
        author: {
            fieldNumber: 11,
            dataType: 'bytes'
        },
    },
};