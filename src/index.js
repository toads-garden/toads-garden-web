import Phaser from "phaser";
import Garden from "./scenes/Garden";

const config = {
  width: 640,
  height: 480,
  parent: "toad",
  backgroundColor: "#BCEDF6",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
    },
  },
  scene: [Garden],
};

new Phaser.Game(config);
