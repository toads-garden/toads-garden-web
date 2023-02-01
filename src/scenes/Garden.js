import Phaser from "Phaser";
import generateAnimations from "../config/animations";
import { Toad } from "../gameObjects/Toad.js";

var cursors;
var player;
var CollectibleLayer;
var collectibles;
var score = 0;
var text;
var bunnies;
// var scene;
var gameOver = false;

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
    this.load.image("play-btn", "../assets/img/playButton.png");
    this.load.image("heartFull", "../assets/img/heartFull.png");
    this.load.image("heartEmpty", "../assets/img/heartEmpty.png");
    this.load.tilemapTiledJSON("map", "../assets/json/map.json");
    this.load.image("plantTiles", "../assets/img/mushroom.png");
    this.load.spritesheet("toad", "../assets/img/toad.png", {
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
    // this.scene.run("hearts");
    var music = this.sound.add("garden", { loop: true, volume: 0.1 });
    // music.play();

    this.add.image(960, 240, "background");
    const map = this.make.tilemap({ key: "map" });
    // const backTileSet = map.addTilesetImage("garden", "background");
    const tileset = map.addTilesetImage("terrain", "tiles");
    const plantTileset = map.addTilesetImage("plants", "plantTiles");
    // const back = map.createLayer("background", backTileSet);
    const ground = map.createLayer("ground", tileset);
    const platforms = map.createLayer("platform", tileset);
    const invisible = map.createLayer("invisible", tileset).setVisible(false);
    const plants = map.createLayer("mushroom", plantTileset);
    collectibles = this.physics.add.staticGroup();

    CollectibleLayer = map.getObjectLayer("CollectibleLayer")["objects"];

    platforms.setCollisionByExclusion(-1);
    invisible.setCollisionByExclusion(-1);
    ground.setCollisionByExclusion(-1);
    this.inputs = this.input.keyboard.createCursorKeys();
    ground.setCollisionByExclusion(-1);

    cursors = this.input.keyboard.createCursorKeys();
    //bunny
    bunnies = this.physics.add.group({
      key: "bunny",
    });
    function createBunnies() {
      bunnies.create(
        900 + Math.random() * 300,
        100 + Math.random() * 200,
        "bunny"
      );
    }
    for (let i = 0; i < 10; i++) {
      createBunnies();
    }
    for (const bunny of bunnies.children.entries) {
      bunny.direction = "RIGHT";
    }
    this.physics.add.collider(bunnies, [platforms, ground, invisible]);

    player = new Toad(this, 100, 400)
      .collideWith([ground, platforms])
      .overlapWith(collectibles, collect)
      .hitEnemy(bunnies, hitBunny);

    // this.physics.add.collider(bunnies, [platforms, ground, invisible]);

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
    function hitBunny(player, bunnies) {
      gameIsOver();
    }
    function gameIsOver() {
      gameOver = true;
      // this.physics.pause();
      player.die();
      // this.input.on("pointerDown", () => this.scene.start("garden"));
      // var playbtn = this.physics.add.staticGroup(240, 300, "play-btn");

      // playbtn.setPerspective(600);

      // playbtn.addListener("click");
      // playbtn.on("click", (event) => {
      //   this.scene.restart();
      // });
      // this.tweens.add({
      //   targets: playbtn,
      //   y: 300,
      //   duration: 3000,
      //   ease: "Power3",
      // });
      // this.scene.cameras.main.on("camerafadeoutcomplete", (camera, effect) =>
      //   this.scene.restart()
      // );
      // this.scene.cameras.main.on(
      //   "camerashakecomplete",
      //   (camera, effect) => camera.fade(500)
      // );
      // this.scene.cameras.main.on("camerafadeoutcomplete", (camera, effect) =>
      //   scene.restart()
      // );
      // this.scene.cameras.main.on(
      //   Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      //   () => {
      //     this.scene.restart();
      //   }
      // );
    }

    this.physics.add.overlap(player, collectibles, collect, null, this);
  }
  // restart() {
  //   this.scene.create;
  // }
  update() {
    player.update(this.inputs);
    for (const bunny of bunnies.children.entries) {
      if (bunny.body.blocked.right) {
        bunny.direction = "LEFT";
      }

      if (bunny.body.blocked.left) {
        bunny.direction = "RIGHT";
      }

      if (bunny.direction === "RIGHT") {
        bunny.setVelocityX(100);
      } else {
        bunny.setVelocityX(-100);
      }
    }
  }
}

export default Garden;
