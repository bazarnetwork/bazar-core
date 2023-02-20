export const allFileSchema = {
    $id: 'bazar/seller/files',
    type: 'object',
    required: ['files'],
    properties: {
        files: {
            fieldNumber: 1,
            type: 'array',
            items: {
                dataType: 'string',
            },
        },
    },
};