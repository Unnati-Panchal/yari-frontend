import * as fromProfile from '~store/profile/profile.reducer';

describe('Profile Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = { type: 'NOOP' } as any;
      const result = fromProfile.reducer(undefined, action);

      expect(result).toBe(fromProfile.profileInitialState);
    });
  });
});
