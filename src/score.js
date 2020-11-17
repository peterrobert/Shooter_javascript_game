class ScoreSave {

    constructor(_name, _score){
        this.name = _name
        this.score = _score
    }


    save(){
        console.log (this.name);
        console.log(this.score);
    }
}

export {ScoreSave}