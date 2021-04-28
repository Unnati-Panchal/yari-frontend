import * as fromAdmin from '~store/admin/admin.reducer';

describe('Auth Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = { type: 'NOOP' } as any;
      const result = fromAdmin.reducer(undefined, action);

      expect(result).toBe(fromAdmin.adminInitialState);
    });
  });

});
