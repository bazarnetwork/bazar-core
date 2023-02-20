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
    }
};