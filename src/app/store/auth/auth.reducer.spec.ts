import * as fromAuth from '~store/auth/auth.reducer';

describe('Auth Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = { type: 'NOOP' } as any;
      const result = fromAuth.reducer(undefined, action);

      expect(result).toBe(fromAuth.authInitialState);
    });
  });

});
