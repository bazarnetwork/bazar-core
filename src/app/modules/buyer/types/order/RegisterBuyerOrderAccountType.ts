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
    }
};