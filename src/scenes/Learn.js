import Phaser from "Phaser";
// import { Scene } from "Phaser";
import generateAnimations from "../config/animations";

var player;
var wood;
var plant;
var cursors;
var pipe;
var singlePlat;

class Learn extends Phaser.Scene {
  constructor(data) {
    super("Learn");
  }
  preload() {
    this.load.audio("garden", "../assets/audio/garden.mp3");
    this.load.image("background", "../assets/img/garden.png");
    this.load.image("tiles", "../assets/img/terrain.png");
    this.load.image("plant", "../assets/img/icons.png");
    this.load.image("play-btn", "../assets/img/playButton.png");
    this.load.tilemapTiledJSON("learnmap", "../assets/json/learnmap.json");
    this.load.image("plantTiles", "../assets/img/mushroom.png");
    this.load.image("wood", "../assets/img/wood.png");
    this.load.image("pipe", "../assets/img/pipe.png");
    this.load.image("singlePlatform", "../assets/img/singlePlatform.png");
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

    this.load.on("complete", () => {
      generateAnimations(this);
    });
  }
  create(data) {
    const x = innerWidth / 2;
    const y = innerHeight / 2;
    this.add.image(960, 240, "background");
    this.physics.world.setBounds(0, 0, 650, 480);
    pipe = this.add.image(575, 420, "pipe");
    const learnmap = this.make.tilemap({ key: "learnmap" });
    const tileset = learnmap.addTilesetImage("terrain", "tiles");
    const ground = learnmap.createLayer("learn-terrain", tileset);
    // platforms.setCollisionByExclusion(-1);

    ground.setCollisionByExclusion(-1);
    singlePlat = this.physics.add.staticGroup();
    singlePlat.create(100, 350, "singlePlatform").setScale(2).refreshBody();
    singlePlat.create(300, 300, "singlePlatform").setScale(2).refreshBody();
    singlePlat.create(550, 250, "singlePlatform").setScale(2).refreshBody();
    singlePlat.create(575, 384, "singlePlatform").setScale(2).setVisible(false);
    plant = this.physics.add.staticGroup();
    plant.create(100, 200, "plant").setScale(1.5);
    wood = this.physics.add.staticGroup();
    wood.create(300, 400, "wood").setScale(1.5);

    player = this.physics.add.sprite(100, 400, "toad");
    player.setCollideWorldBounds("true");
    player.setBounce(0.2);
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

    cursors = this.input.keyboard.createCursorKeys();

    function collect(player, obj) {
      obj.destroy(obj.x, obj.y);
      return false;
    }

    this.physics.add.collider(player, ground);
    this.physics.add.collider(player, singlePlat);
    this.physics.add.overlap(player, plant, collect, null, this);
    this.physics.add.overlap(player, wood, collect, null, this);

    this.story = this.add
      .text(325, 155 / 1.2, "", {
        fill: "#29465B",
        align: "center",
      })
      .setOrigin(0.5);

    this.typewriteText(
      "                \nToad uses the left, right, and up \nbuttons to move around.\n                 \nJumping into items collects them for the town.\nToad can jump onto platforms to help get around.\n                \nThe pipes at the end of the stage transport  \nyou to the next world once you've \ncollected 15 items. \n                \nThere aren't any enemies here but \nwatch out on your journey!"
    );

    // // Let's go button
    // let gameButton = this.add.image(325, y + 45, "playButton").setScale(0.3);

    // gameButton.setInteractive();

    // gameButton.on("pointerover", () => {
    //   gameButton = this.add
    //     .image(x + 200, y * 1.85, "letsGo-red")
    //     .setScale(x * 0.0018);
    // });
    // gameButton.on("pointerout", () => {
    //   gameButton = this.add
    //     .image(x + 200, y * 1.85, "letsGo-white")
    //     .setScale(x * 0.0018);
    // });

    // gameButton.on("pointerup", () => {
    //   this.scene.start("Garden", {
    //     music: data.music,
    //   });
    // });
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

    if (cursors.up.isDown && player.body.onFloor()) {
      player.setVelocityY(-250);
    }

    var xDifference = Math.abs(Math.floor(player.body.x) - 548);
    var yDifference = Math.abs(Math.floor(player.body.y) - 336);
    var threshhold = 5;
    if (xDifference <= threshhold && yDifference <= threshhold) {
      this.scene.start("Underwater");
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

export default Learn;
