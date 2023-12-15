export interface AllOrders {
  orders: string[];
}

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
  transport: {
    origin: string;
    destiny: string;
    location: string;
    date: number;
    status: string;
  }[];
  date: number;
  author: Buffer;
}

export interface RegisterOrderAccountType {
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
  seller: {
    orders: string[];
    files: string[];
    transport: string[];
  };
}

export interface RegisterOrderType {
  orderId: string;
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
  transport: {
    origin: string;
    destiny: string;
    location: string;
    date: number;
    status: string;
  }[];
}
