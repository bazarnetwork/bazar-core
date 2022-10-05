export interface RegisterOrderType {
    productId: string;
    productName: string
    productDescription: string;
    minQuantityToSell: number,
    quantity: number;
    price: number;
    files: {
        filename: string;
        fileType: string;
        fileCategory: string;
        hash: string;
    }[];
};