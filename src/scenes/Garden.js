import Phaser from "phaser";
var player;
var cursors;

class Garden extends Phaser.Scene {
  constructor() {
    super("Garden");
  }
  preload() {
    this.load.image("background", "../assets/img/tilemap.png");
    this.load.image("tiles", "../assets/img/terrain.png");
    this.load.tilemapTiledJSON("map", "../assets/json/map.json");
    this.load.spritesheet("toad", "assets/img/toad.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
  }
  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("terrain", "tiles");
    const platforms = map.createLayer("Tile Layer 1", tileset);
    platforms.setCollisionByExclusion(-1);
    player = this.physics.add.sprite(100, 400, "toad");
    player.setBounce(0.2);
    // player.setCollideWorldBounds(true);
    this.physics.add.collider(player, platforms);
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("toad", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("toad", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "turn",
      frames: [{ key: "toad", frame: 0 }],
      frameRate: 20,
    });
    // scene.cameras.main
    //   .setBounds(0, 0, scene.map.widthInPixels, scene.map.heightInPixels)
    //   .startFollow(this.sprite);
    // this.physics.add.collider(player, tileset);
    // this.physics.add.collider(player, map);
    cursors = this.input.keyboard.createCursorKeys();
  }
  update() {
    if (cursors.left.isDown) {
      player.setVelocityX(-160).setFlipX(true);

      player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160).setFlipX(false);

      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);
      player.anims.play("turn");
    }

    if (cursors.up.isDown) {
      player.setVelocityY(-200);
    }
  }
}

export default Garden;
