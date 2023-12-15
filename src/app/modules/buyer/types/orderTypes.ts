export interface BuyerOrderType {
  id: string;
  productName: string;
  sellerOrderId: string;
  quantity: number;
  price: number;
  date: number;
  author: Buffer;
}

export interface RegisterBuyerOrderAccountType {
  address: Buffer;
  keys: {
    mandatoryKeys: Buffer[];
    numberOfSignatures: string;
    optionalKeys: Buffer[];
  };
  sequence: {
    nonce: string;
  };
  token: {
    balance: string;
  };
  buyer: {
    orders: string[];
  };
}

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
}
