import 'phaser';

import { SceneMainMenu } from "./SceneMainMenu";
import { SceneMain } from "./SceneMain";
import { SceneGameOver } from "./SceneGameOver";

var config = {
    type: Phaser.WEBGL,
    width: 480,
    height: 640,
    backgroundColor: "black",
    physics: {
      default: "arcade",
      arcade: {
        gravity: { x: 0, y: 0 }
      }
    },
    scene: [
      SceneMainMenu,
      SceneMain,
      SceneGameOver
    ],
    pixelArt: true,
    roundPixels: true
  };
  
  var game = new Phaser.Game(config);