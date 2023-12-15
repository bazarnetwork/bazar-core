import { SellerOrderAsset } from '../../../../../src/app/modules/seller/assets/sellerOrderAsset';

describe('OrderAsset', () => {
  let transactionAsset: SellerOrderAsset;

  beforeEach(() => {
    transactionAsset = new SellerOrderAsset();
  });

  describe('constructor', () => {
    it('should have valid id', () => {
      expect(transactionAsset.id).toBe(0);
    });

    it('should have valid name', () => {
      expect(transactionAsset.name).toBe('order');
    });

    it('should have valid schema', () => {
      expect(transactionAsset.schema).toMatchSnapshot();
    });
  });

  describe('validate', () => {
    describe('schema validation', () => {
      it.todo('should throw errors for invalid schema');
      it.todo('should be ok for valid schema');
    });
  });

  describe('apply', () => {
    describe('valid cases', () => {
      it.todo('should update the state store');
    });

    describe('invalid cases', () => {
      it.todo('should throw error');
    });
  });
});