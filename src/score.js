class ScoreSave {
  constructor(_name, _score) {
    this.name = _name;
    this.score = _score;
  }

  save() {
    let _data = {
      user: this.name,
      score: this.score,
    };

    fetch(
      "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/tHxVDyAAsZqSgm0dnTap/scores",
      {
        method: "POST",
        body: JSON.stringify(_data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }
    )
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

 leaderBoard () {
    new Promise((resolve, reject) => {
        this.save();
        
      })
 }

}

export { ScoreSave };
