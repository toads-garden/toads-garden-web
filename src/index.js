import Phaser from "phaser";
import Garden from "./scenes/Garden";

const config = {
  width: 650,
  height: 480,
  parent: "toad",
  backgroundColor: "#BCEDF6",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: [Garden],
};

new Phaser.Game(config);
