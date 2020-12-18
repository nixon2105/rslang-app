import 'isomorphic-fetch';
import { getTokenExpiresMs } from './common.utils.helper';

describe('get date and time when token will expired', () => {
  it('should set correct data', async () => {
    const res = getTokenExpiresMs();
    expect(res).toBeDefined();
    const testedTime = new Date(res).toUTCString();
    const correctTime = new Date(Date.now() + 4 * 60 * 60 * 1000).toUTCString();
    expect(testedTime).toEqual(correctTime);
  });
});
