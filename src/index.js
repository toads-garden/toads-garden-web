import Phaser from "Phaser";
import Intro from "./scenes/Intro";
import Learn from "./scenes/Learn";
import Garden from "./scenes/Garden";
import Forest from "./scenes/Forest";
import Underwater from "./scenes/Underwater";
import Outro from "./scenes/Outro";
import Town from "./scenes/Town";

const config = {
  type: Phaser.AUTO,

  scale: {
    parent: "toad",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 650,
    height: 480,
  },

  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: true,
    },
  },
  scene: [Town, Intro, Learn, Garden, Forest, Underwater, Outro],
};

new Phaser.Game(config);
