/* eslint-disable no-use-before-define, no-unused-expressions, no-console, class-methods-use-this, import/prefer-default-export, import/no-cycle, max-len */
import { theValues } from './code';

class ScoreSave {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }

  save() {
    const data = {
      user: this.name,
      score: this.score,
    };

    fetch(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/tHxVDyAAsZqSgm0dnTap/scores',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      },
    )
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  leaderBoard() {
    fetch(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/tHxVDyAAsZqSgm0dnTap/scores',
      {
        method: 'GET',
        body: JSON.stringify(),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      },
    )
      .then((response) => response.json())
      .then((json) => theValues(json));
  }
}

export { ScoreSave };
