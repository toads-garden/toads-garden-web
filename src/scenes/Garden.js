import Phaser from "Phaser";
import { Toad } from "../gameObjects/Toad.js";
import generateAnimations from "../config/animations";

class Garden extends Phaser.Scene {
  player;
  cameras;
  platforms;
  constructor() {
    super("Garden");
  }
  preload() {
    this.load.image("background", "../assets/img/map.png");
    this.load.image("tiles", "../assets/img/terrain.png");
    this.load.tilemapTiledJSON("map", "../assets/json/map.json");
    this.load.spritesheet("toad", "assets/img/toad.png", {
      frameWidth: 48,
      frameHeight: 43,
    });
    this.load.on("complete", () => {
      generateAnimations(this);
    });
  }
  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("terrain", "tiles");

    const ground = map.createLayer("ground", tileset);
    const platforms = map.createLayer("platform", tileset);

    platforms.setCollisionByExclusion(-1);
    ground.setCollisionByExclusion(-1);
    this.physics.world.setBounds(0, 0, 1920, 480, true, true, true, false);

    this.player = new Toad(this, 100, 400).collideWith(ground);
    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(this.player, ground);

    this.cameras.main.setBounds(0, 0, 1920, 480);
    this.cameras.main.startFollow(this.player);
    this.inputs = this.input.keyboard.createCursorKeys();

    // scene.cameras.main
    //   .setBounds(0, 0, scene.map.widthInPixels, scene.map.heightInPixels)
    //   .startFollow(this.sprite);
  }
  update() {
    this.player.update(this.inputs);
  }
}

export default Garden;
