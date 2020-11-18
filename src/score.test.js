import 'regenerator-runtime';
const { getScores, sendScores } = require('./score');

describe('Game Score API interfase', () => {
  test('Saves the name and score of user', async () => {
    const name = 'usermock';
    const score = 300;
    expect.assertions(1);
    return sendScores(name, score).then(data => {
      expect(data.result).toEqual('Leaderboard score created correctly.');
    });
  });

  test('GetScore Gets an array', async () => {
    const res = await getScores();
    expect(Array.isArray(res)).toBe(true);
  });

  test('Gets the names of the users', async () => getScores().then(data => {
    expect(data[0].user).toEqual('usermock');
  }));

  test('Gets score and checks if correct amount', async () => {

    scores;
    const scores = await getScores();
    expect(scores[0].score).toEqual(300);
  })

})