import { PurchaseAsset } from '../../../../../src/app/modules/buyer/assets/purchase_asset';

describe('PurchaseAsset', () => {
  let transactionAsset: PurchaseAsset;

  beforeEach(() => {
    transactionAsset = new PurchaseAsset();
  });

  describe('constructor', () => {
    it('should have valid id', () => {
      expect(transactionAsset.id).toBe(1);
    });

    it('should have valid name', () => {
      expect(transactionAsset.name).toBe('purchase');
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
