export const allFileSchema = {
    $id: 'bazar/seller/files',
    type: 'object',
    required: ['files'],
    properties: {
        orders: {
            fieldNumber: 1,
            type: 'array',
            items: {
                dataType: 'string',
            },
        },
    },
};