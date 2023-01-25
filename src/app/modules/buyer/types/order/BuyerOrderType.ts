export interface BuyerOrderType {
    id: string;
    productName: string;
    sellerOrderId: string;
    quantity: number;
    price: number;    
    date: number;
    author: Buffer;
};