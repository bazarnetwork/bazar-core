export const registerBuyerOrderAssetSchema = {
    $id: 'bazar/buyer/registerBuyerOrderAsset',
    title: 'registerBuyerOrder transaction asset for Buyer module',
    type: 'object',
    required: ['productName', 'quantity', 'price', 'sellerOrderId'],
    properties: {
        productName: {
            fieldNumber: 1,
            dataType: 'string',
            maxLength: 100,
        },
        quantity: {
            fieldNumber: 2,
            dataType: 'uint64',
        },
        price: {
            fieldNumber: 3,
            dataType: 'uint64',
        },
        sellerOrderId: {
            fieldNumber: 4,
            dataType: 'string',
        }
    },
};