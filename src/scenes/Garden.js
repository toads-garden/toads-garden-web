
import Phaser from "Phaser";
import { Toad } from "../gameObjects/Toad.js";
import generateAnimations from "../config/animations";


var player;
var cursors;
var cameras;
var CollectibleLayer;
var collectibles;
var score = 0;
var text;


class Garden extends Phaser.Scene {
  player;
  cameras;
  platforms;
  constructor() {
    super("Garden");
  }
  preload() {
    this.load.audio("garden", "../assets/audio/garden.mp3");
    this.load.image("background", "../assets/img/garden.png");
    this.load.image("tiles", "../assets/img/terrain.png");
    this.load.image("collectible", "../assets/img/icons.png");
    this.load.tilemapTiledJSON("map", "../assets/json/map.json");
    this.load.spritesheet("toad", "assets/img/toad.png", {
      frameWidth: 48,
      frameHeight: 43,
    });
    this.load.on("complete", () => {
      generateAnimations(this);
    });
    this.load.atlas(
      "bunny",
      "./assets/img/bunny.png",
      "./assets/json/bunny_atlas.json"
    );
  }
  create() {
    var music = this.sound.add("garden");
    //music.play();
    this.add.image(960, 240, "background");
    const map = this.make.tilemap({ key: "map" });
    // const backTileSet = map.addTilesetImage("garden", "background");
    const tileset = map.addTilesetImage("terrain", "tiles");
    // const back = map.createLayer("background", backTileSet);
    const ground = map.createLayer("ground", tileset);
    const platforms = map.createLayer("platform", tileset);
    CollectibleLayer = map.getObjectLayer("CollectibleLayer")["objects"];

    platforms.setCollisionByExclusion(-1);


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

    ground.setCollisionByExclusion(-1);
    player = this.physics.add.sprite(100, 400, "toad");
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, ground);
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
    this.physics.add.collider(player, tileset);
    this.physics.add.collider(player, map);
    cursors = this.input.keyboard.createCursorKeys();

    const bunnies = this.physics.add.group();
    function generateBunnies() {
      const xCoordinate = Math.random() * 650;
      bunnies.create(xCoordinate, 2, "bunny");
    }

    // const bunnyGenLoop = this.time.addEvent({
    //   callback: generateBunnies,
    //   delay: 5000,
    //   callbackScope: this,
    //   loop: true,
    // });
    this.physics.add.collider(bunnies, [platforms, ground]);

    //collectibles
    collectibles = this.physics.add.staticGroup();
    CollectibleLayer.forEach((object) => {
      let obj = collectibles.create(object.x, object.y, "collectible");
      obj.setScale(object.width / 16, object.height / 16);
      obj.setOrigin(0);
      obj.body.width = object.width;
      obj.body.height = object.height;
    });
    this.physics.add.overlap(player, collectibles, collect, null, this);

    //score
    text = this.add.text(400, 70, `Score: ${score}`, {
      fontSize: "20px",
      fill: "#ffffff",
    });
    text.setScrollFactor(0);
    function collect(player, collectible) {
      collectible.destroy(collectible.x, collectible.y);
      score++;
      text.setText(`Score: ${score}`);
      return false;
    }

  }

  update() {

    this.player.update(this.inputs);

  }
}

export default Garden;
