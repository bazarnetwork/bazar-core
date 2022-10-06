export const fileRecordAssetSchema = {
    $id: 'bazar/seller/filesAsset',
    title: 'filesAsset transaction asset for Seller module',
    type: 'object',
    required: ['orderId', 'filename', 'fileType', 'fileCategory', 'hash'],
    properties: {
        orderId: {
            fieldNumber: 1,
            dataType: 'string',
            maxLength: 500
        },
        filename: {
            fieldNumber: 2,
            dataType: 'string',
            maxLength: 50
        },
        fileType: {
            fieldNumber: 3,
            dataType: 'string',
            maxLength: 5
        },
        fileCategory: {
            fieldNumber: 4,
            dataType: 'string',
            maxLength: 50
        }, 
        hash: {
            fieldNumber: 5,
            dataType: 'string',
        },
    },
};