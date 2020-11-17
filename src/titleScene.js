class TitleScene extends Phaser.Scene {

	constructor() {
		
	}

	preload() {
		this.load.image('background', 'assets/images/space-stars.jpg');
	}

	create() {

       game.add.tileSprite(0, 0, 800, 600, "background");


	  this.add.text(100,100, 'Welcome to my game!');
	}

}

export default TitleScene;