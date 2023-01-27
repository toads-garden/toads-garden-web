import Phaser from "phaser";

class Garden extends Phaser.Scene {
  constructor() {
    super("Garden");
  }
  preload() {
    this.load.image("background", "../assets/img/tilemap.png");
    this.load.image("tiles", "../assets/img/terrain.png");
    this.load.tilemapTiledJSON("map", "../assets/json/map.json");
  }
  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("terrain", "tiles");
    const platforms = map.createStaticLayer("Tile Layer 1", tileset);
    platforms.setCollisionByExclusion(-1, true);
  }
  update() {}
}

export default Garden;
