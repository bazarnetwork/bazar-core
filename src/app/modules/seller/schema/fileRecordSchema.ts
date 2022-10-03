export const fileRecordSchema = {
    $id: 'bazar/seller/fileRecord',
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
};