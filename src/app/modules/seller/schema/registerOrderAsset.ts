export const registerOrderAssetSchema = {
    $id: 'bazar/seller/registerOrderAsset',
    title: 'registerOrderAsset transaction asset for Seller module',
    type: 'object',
    required: ['productId', 'productName', 'productDescription', 'price'],
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
        price: {
            fieldNumber: 4,
            dataType: 'uint64',
        },
    },
};