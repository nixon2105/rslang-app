/* eslint-disable no-undef */
import 'isomorphic-fetch';
import UserWordsApi from './services.main.endpoints.user_words';
import UsersApi from './services.main.endpoints.users';
import { MAIN_API_URL, GET_RANDOM, ERRORS_DESCRIPTION } from '../../common/services.common.constants';
import ApiService from '../../common/services.common.api_service';

const userWords = new UserWordsApi();
const user = new UsersApi();

describe('get user words if user words was not updated early', () => {
  const userDefault = {
    email: 'jest_userwords_one@mail.com',
    password: '12345678Aa@',
    id: '5ee7eca6439c470017c4e705',
  };
  it('should return empty array', async () => {
    const auth = await user.authenticateUser({
      email: userDefault.email,
      password: userDefault.password,
    });
    userWords._apiService = new ApiService(MAIN_API_URL);
    const res = await userWords.getAllUserWords({ userId: userDefault.id, token: auth.token });
    expect(res).toBeDefined();
    expect(res).toStrictEqual([]);
  });
});

describe('get user words', () => {
  const userDefault = {
    email: 'jest_userwords_two@mail.com',
    password: '12345678Aa@',
    id: '5ee7f098439c470017c4e707',
  };
  it('should return correct array', async () => {
    const auth = await user.authenticateUser({
      email: userDefault.email,
      password: userDefault.password,
    });
    userWords._apiService = new ApiService(MAIN_API_URL);
    const res = await userWords.getAllUserWords({ userId: userDefault.id, token: auth.token });
    expect(res).toBeDefined();
    expect(res).toMatchObject([
      {
        id: '5ee88bec12daba0017bdc949',
        difficulty: 'weak',
        wordId: '5e9f5ee35eb9e72bc21af4b4',
      },
      {
        id: '5ee88c4c12daba0017bdc94a',
        difficulty: 'difficult',
        optional: {
          score: '100',
        },
        wordId: '5e9f5ee35eb9e72bc21b00a8',
      },
    ]);
  });
});
// If this test is crashed, you need to delete user words with this userId and wordId
describe('create user word', () => {
  const userDefault = {
    email: 'jest_userwords_three@mail.com',
    password: '12345678Aa@',
  };
  const wordId = '5e9f5ee35eb9e72bc21af4b4';
  it('should return correct object', async () => {
    const auth = await user.authenticateUser({
      email: userDefault.email,
      password: userDefault.password,
    });
    userWords._apiService = new ApiService(MAIN_API_URL);
    const res = await userWords.createUserWord(
      {
        wordId,
        difficulty: 'weak',
      },
      {
        userId: auth.userId,
        token: auth.token,
      },
    );
    expect(res).toBeDefined();
    expect(res).toMatchObject({
      difficulty: 'weak',
      optional: null,
      wordId: '5e9f5ee35eb9e72bc21af4b4',
      id: expect.any(String),
    });
    await userWords.deleteUserWord({ wordId }, { userId: auth.userId, token: auth.token });
  });
});

describe('get user word', () => {
  const userDefault = {
    email: 'jest_userwords_four@mail.com',
    password: '12345678Aa@',
    id: '5ee8b98912daba0017bdc98e',
  };
  it('should return correct object', async () => {
    const auth = await user.authenticateUser({
      email: userDefault.email,
      password: userDefault.password,
    });
    userWords._apiService = new ApiService(MAIN_API_URL);
    const res = await userWords.getUserWord(
      {
        userId: userDefault.id,
        wordId: '5e9f5ee35eb9e72bc21af4b4',
        difficulty: 'weak',
      },
      { userId: auth.userId, token: auth.token },
    );
    expect(res).toBeDefined();
    expect(res).toMatchObject({
      id: '5ee8ba5c12daba0017bdc993',
      difficulty: 'easy',
      wordId: '5e9f5ee35eb9e72bc21af4b4',
      optional: {
        score: '100',
      },
    });
  });
});

describe('update user word', () => {
  const userDefault = {
    email: 'jest_userwords_five@mail.com',
    password: '12345678Aa@',
    id: '5ee8bb8712daba0017bdc996',
  };
  const randomVal = GET_RANDOM(1, 10).toString();
  it('should return correct object', async () => {
    const auth = await user.authenticateUser({
      email: userDefault.email,
      password: userDefault.password,
    });
    userWords._apiService = new ApiService(MAIN_API_URL);
    const res = await userWords.updateUserWord(
      {
        wordId: '5e9f5ee35eb9e72bc21af4b4',
        difficulty: randomVal,
      },
      { userId: auth.userId, token: auth.token },
    );
    expect(res).toBeDefined();
    expect(res).toMatchObject({
      difficulty: randomVal,
      optional: null,
      wordId: '5e9f5ee35eb9e72bc21af4b4',
      id: expect.any(String),
    });
  });
});

describe('delete user word', () => {
  const userDefault = {
    email: 'jest_userwords_six@mail.com',
    password: '12345678Aa@',
    id: '5ee8bfaa12daba0017bdc9ae',
  };
  const wordId = '5e9f5ee35eb9e72bc21af4b4';
  it('should return true', async () => {
    const auth = await user.authenticateUser({
      email: userDefault.email,
      password: userDefault.password,
    });
    userWords._apiService = new ApiService(MAIN_API_URL);
    userWords.getUserWord({ wordId }, { userId: auth.userId, token: auth.token }).catch(() => {
      userWords.createUserWord({ wordId, difficulty: 'easy' }, { userId: auth.userId, token: auth.token });
    });

    const res = await userWords.deleteUserWord({ wordId }, { userId: auth.userId, token: auth.token });
    expect(res).toBeDefined();
    expect(res).toMatchObject({
      isDeleted: true,
    });
  });
});
