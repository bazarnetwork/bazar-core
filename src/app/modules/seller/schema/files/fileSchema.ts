export const fileSchema = {
    $id: 'bazar/files',
    title: 'fileSchama transaction for Files Asset',
    type: 'object',
    properties: {
        id: {
            fieldNumber: 1,
            dataType: 'string',
            maxLength: 500,
        },
        filename: {
            fieldNumber: 2,
            dataType: 'string',
            maxLength: 200,
        },
        fileType: {
            fieldNumber: 3,
            dataType: 'string',
            maxLength: 50,
        },
        fileCategory: {
            fieldNumber: 4,
            dataType: 'string',
            maxLength: 50,
        },
        hash: {
            fieldNumber: 5,
            dataType: 'string',
            maxLength: 500,
        },
        date: {
            fieldNumber: 6,
            dataType: 'uint32'
        },
        author: {
            fieldNumber: 7,
            dataType: 'bytes'
        },
    }
};