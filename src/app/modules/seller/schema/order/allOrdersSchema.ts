export const allOrdersSchema = {
    $id: 'bazar/seller/orders',
    type: 'object',
    required: ['orders'],
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