export const transportStatusAssetSchema = {
    $id: 'bazar/seller/transportStatusAsset',
    title: 'transportStatusAsset transaction asset for seller module',
    type: 'object',
    required: ['orderId', 'origin', 'destiny', 'location', 'status'],
    properties: {
        orderId: {
            fieldNumber: 1,
            dataType: 'string',
            maxLength: 500
        },
        origin: {
            fieldNumber: 2,
            dataType: 'string',
            maxLength: 100
        },
        destiny: {
            fieldNumber: 3,
            dataType: 'string',
            maxLength: 100
        },
        location: {
            fieldNumber: 4,
            dataType: 'string',
            maxLength: 100
        },
        date: {
            fieldNumber: 5,
            dataType: 'uint32'
        },
        status: {
            fieldNumber: 6,
            dataType: 'string',
            maxLength: 50,
        },
    },
};