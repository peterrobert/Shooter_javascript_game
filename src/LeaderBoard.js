class LeaderBoard {



    constructor(_name, _score) {
        this.name = _name;
        this.score = _score;

    }

    generateApi() {
        const data = {
            name: 'killer_shoot'
        };
        fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    scoreIncrement() {

        this.score += 10
        return this.score
    }




}

export default {
    LeaderBoard
}