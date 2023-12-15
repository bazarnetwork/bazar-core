export interface RegisterOrderType {
  buyerOrderId: string;
  sellerOrderId: string;
  status: string;
  token: string;
  exchangeRate: string;
  valueXKg: string;
  quantity: number;
  serviceFee: string;
  totalPayToken: string;
  totalPayInUSD: string;
  transactionPayment: string;
  accountSeller: string;
  accountBuyer: string;
  productId: string;
};
