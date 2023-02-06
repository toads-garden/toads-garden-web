import Phaser from "Phaser";
// import { LoaderOptionsPlugin } from "webpack";
import simpleTown from "../assets/json/simpleTown.json";
import townTiles from "../assets/img/townTiles.png";
import generateAnimations from "../config/animations";
import { Toad } from "../gameObjects/Toad";

var cursors;
var score = 0;
var player;
var gameOver = false;
// var simpleTown;
// var townTiles;

class Town extends Phaser.Scene {
  constructor() {
    super("Town");
  }
  preload() {
    this.load.image("simpleTown", "../assets/img/simpleTown.png");
    this.load.image("Land", "../assets/img/townTiles.png");
    // this.load.tilemapTiledJSON("townMap", "../assets/json/simpleTown.json");
    this.load.spritesheet("toad", "assets/img/toad.png", {
      frameWidth: 48,
      frameHeight: 44,
    });

    this.load.on("complete", () => {
      generateAnimations(this);
    });
  }

  create() {
    this.inputs = this.input.keyboard.createCursorKeys();
    cursors = this.input.keyboard.createCursorKeys();

    this.add.image(40, "simpleTown");
    const townMap = this.make.tilemap({ key: "townMap" });
    const Land = townMap.addTilesetImage("Land", "townTiles");
    const townGround = townMap.createLayer("townTiles", "townTiles");

    townGround.setCollisionByExclusion(-1);
    Land.setCollisionByExclusion(-1);

    player = new Toad(this, 100, 400).collideWith();
  }

  update() {
    player.update(this.inputs);
    // var xDifference = Math.abs(Math.floor(player.sprite.x) - 1853);
    // var yDifference = Math.abs(Math.floor(player.sprite.y) - 346);
    // var threshhold = 5;
    // if (xDifference <= threshhold && yDifference <= threshhold && score >= 3) {
    //   this.scene.start("Garden");
    //   score = 0;
    // }
  }
}
console.log("town", simpleTown);
export default Town;
