import * as fromProducts from '~store/products/products.reducer';

describe('Products Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = { type: 'NOOP' } as any;
      const result = fromProducts.reducer(undefined, action);

      expect(result).toBe(fromProducts.productsInitialState);
    });
  });

});
