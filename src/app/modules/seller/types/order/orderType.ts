export interface OrderType {
    id: string;
    productId: string;
    productName: string;
    productDescription: string;
    minQuantityToSell: number;
    quantity: number;
    price: number;
    files: {
        filename: string;
        fileType: string;
        fileCategory: string;
        hash: string;
    }[];
    date: number;
    author: Buffer;
};