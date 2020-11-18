import 'regenerator-runtime';

const { ScoreSave } = require('./score');


test('It creates an instance of the scoreSave class', () => {
  const obj = new ScoreSave('peter', 200);

  expect(obj.name).toBe('peter');
  expect(obj.score).toBe(200);
});
