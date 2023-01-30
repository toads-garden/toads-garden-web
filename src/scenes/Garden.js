import Phaser from "Phaser";
import generateAnimations from "../config/animations";
import Bunny from "../gameObjects/Bunny";
import { Toad } from "../gameObjects/Toad.js";

var cursors;
var player;
var CollectibleLayer;
var collectibles;
var score = 0;
var text;

class Garden extends Phaser.Scene {
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
      frameHeight: 44,
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
    collectibles = this.physics.add.staticGroup();
    // this.physics.world.setBounds(0, 0, 1920, 480, 64, true, true, true, true);

    player = new Toad(this, 100, 400)
      .collideWith([ground, platforms])
      .overlapWith(collectibles, collect);

    CollectibleLayer = map.getObjectLayer("CollectibleLayer")["objects"];

    platforms.setCollisionByExclusion(-1);

    ground.setCollisionByExclusion(-1);
    // this.physics.world.setBounds(0, 0, 1920, 480);
    this.inputs = this.input.keyboard.createCursorKeys();
    ground.setCollisionByExclusion(-1);

    cursors = this.input.keyboard.createCursorKeys();
    //bunny
    this.bunnies = this.physics.add.group({
      classType: Bunny,
    });
    const bunniesLayer = map.getObjectLayer("EnemyLayer");
    bunniesLayer.objects.forEach((bunnyObj) => {
      this.bunnies.get(
        bunnyObj.x + bunnyObj.width * 0.5,
        bunnyObj.y - bunnyObj.height * 0.5,
        "bunny"
      );
    });
    this.physics.add.collider(this.bunnies, [platforms, ground]);
    // const bunny = this.add.sprite(200, 415, "bunny", "bunny-sheet_0");

    // this.anims.create({
    //   key: "bunnyIdle",
    //   frames: this.anims.generateFrameNames("bunny", {
    //     start: 0,
    //     end: 5,
    //     prefix: "bunny-sheet_",
    //   }),
    //   repeat: -1,
    //   frameRate: 10,
    // });

    // this.anims.create({
    //   key: "bunnyRun",
    //   frames: this.anims.generateFrameNames("bunny", {
    //     start: 6,
    //     end: 11,
    //     prefix: "bunny-sheet_",
    //   }),
    //   repeat: -1,
    //   frameRate: 10,
    // });

    // bunny.anims.play("bunnyIdle");

    //collectibles
    // collectibles = this.physics.add.staticGroup();
    CollectibleLayer.forEach((object) => {
      let obj = collectibles.create(object.x, object.y, "collectible");
      obj.setScale(object.width / 16, object.height / 16);
      obj.setOrigin(0);
      obj.body.width = object.width;
      obj.body.height = object.height;
    });
    // this.physics.add.overlap(this.player, collectibles, collect, null, this);

    //score
    text = this.add.text(0, 0, `Herbs Collected: ${score}`, {
      fontSize: "20px",
      fill: "#000000",
    });
    text.setScrollFactor(0);

    function collect(player, collectible) {
      collectible.destroy(collectible.x, collectible.y);
      score++;
      text.setText(`Herbs Collected: ${score}`);
      return false;
    }
    this.physics.add.overlap(player, collectibles, collect, null, this);
  }

  update() {
    player.update(this.inputs);
  }
}

export default Garden;
