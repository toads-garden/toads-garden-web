import Phaser from "phaser";
import generateAnimations from "../config/animations";

var witch;
var player;
var cursors;
var pipe;
var cameras;

class Transition1 extends Phaser.Scene {
  constructor() {
    super("Transition1");
  }
  preload() {
    this.load.image("garden-forest", "../assets/img/garden-forest.png");
    this.load.image("pipe", "../assets/img/pipe.png");
    this.load.tilemapTiledJSON("beachmap", "../assets/json/beach-scene.json");
    this.load.image("water", "../assets/img/water.png");
    this.load.spritesheet("toad", "assets/img/toad.png", {
      frameWidth: 48,
      frameHeight: 44,
    });
    this.load.atlas(
      "bunny",
      "./assets/img/bunny.png",
      "./assets/json/bunny_atlas.json"
    );
    this.load.atlas(
      "fox",
      "./assets/img/fox.png",
      "./assets/json/fox_atlas.json"
    );
    this.load.atlas(
      "octopus",
      "./assets/img/oct.png",
      "./assets/json/oct_atlas.json"
    );
    this.load.atlas(
      "crab",
      "./assets/img/crab.png",
      "./assets/json/crab_atlas.json"
    );
    this.load.atlas(
      "witch",
      "./assets/img/witch.png",
      "./assets/json/witch_atlas.json"
    );
    this.load.on("complete", () => {
      generateAnimations(this);
    });
  }
  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.add.image(325, 240, "garden-forest");
    pipe = this.add.image(575, 450, "pipe");
    const beachmap = this.make.tilemap({ key: "beachmap" });
    const tileset = beachmap.addTilesetImage("water", "water");
    const terrain = beachmap.createLayer("beach-floor", tileset);
    terrain.setCollisionByExclusion(-1);
    terrain.setVisible(false);

    //add witch
    witch = this.physics.add
      .sprite(400, 200, "witch")
      .setFlipX(true)
      .setScale(2.5);
    witch.setCollideWorldBounds("true");
    witch.play("witchIdle");
    //toad
    player = this.physics.add.sprite(300, 400, "toad");
    player.setCollideWorldBounds("true");
    player.setBounce(0.2);
    player.setSize(40, 40);
    player.setOffset(4, 4);
    this.physics.add.collider(player, terrain);

    cursors = this.input.keyboard.createCursorKeys();
    //text
    this.story = this.add
      .text(325, 200 / 1, "", {
        fill: "#29465B",
        align: "center",
      })
      .setOrigin(0.5);

    this.typewriteText(
      "                \nCongrats on completing Level 1!\n                 \nI'll make medicine with the herbs!\n                \nGood luck on the next world, go through the pipe! \n"
    );
  }
  update() {
    //toad movement
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

    if (cursors.up.isDown && player.body.onFloor()) {
      player.setVelocityY(-250);
    }
    //pipe to next scene location
    var xDifference = Math.abs(Math.floor(player.body.x) - 548);
    var yDifference = Math.abs(Math.floor(player.body.y) - 336);
    var threshhold = 5;
    var xThreshhold = 30;
    if (xDifference <= xThreshhold && yDifference <= threshhold) {
      this.scene.start("Forest");
      // this.sound.removeByKey("intro");
    }
  }
  typewriteText(text) {
    const length = text.length;
    let i = 0;
    this.time.addEvent({
      callback: () => {
        this.story.text += text[i];
        i++;
      },
      repeat: length - 1,
      delay: 40,
    });
  }
}

export default Transition1;
