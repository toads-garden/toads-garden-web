import Phaser from "phaser";

class Garden extends Phaser.Scene {
  constructor() {
    super("Garden");
  }
  preload() {
    this.load.image("background", "../assets/img/map.png");
    this.load.image("tiles", "../assets/img/terrain.png");
    this.load.tilemapTiledJSON("map", "../assets/json/map.json");
  }
  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("terrain", "tiles");
    const ground = map.createStaticLayer("ground", tileset);
    const platforms = map.createStaticLayer("platform", tileset);
    ground.setCollisionByExclusion(-1, true);
    platforms.setCollisionByExclusion(-1, true);
  }
  update() {}
}

export default Garden;
