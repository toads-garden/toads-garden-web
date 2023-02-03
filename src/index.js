import Phaser from "Phaser";
import Forest from "./scenes/Forest";
import Garden from "./scenes/Garden";
import Hearts from "./scenes/hearts";
import Intro from "./scenes/Intro";
import Learn from "./scenes/Learn";
import Underwater from "./scenes/Underwater";

const config = {
  type: Phaser.AUTO,

  scale: {
    parent: "toad",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 650,
    height: 480,
  },
  //backgroundColor: "#BCEDF6",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: true,
    },
  },
  scene: [Intro, Learn, Garden, Hearts, Forest, Underwater],
};

new Phaser.Game(config);
