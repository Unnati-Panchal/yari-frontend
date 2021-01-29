import * as fromThirdParty from '~store/third-party/third-party.reducer';

describe('thirdParty Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = { type: 'NOOP' } as any;
      const result = fromThirdParty.reducer(undefined, action);

      expect(result).toBe(fromThirdParty.thirdPartyInitialState);
    });
  });

});
