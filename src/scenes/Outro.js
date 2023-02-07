import Phaser from "Phaser";
import generateAnimations from "../config/animations";

var player;
var wood;
var plant;
var cursors;
var collectSound;
var witch;
var beachMusic;
var bunny;
var fox;
var octopus;
var crab;

class Outro extends Phaser.Scene {
  constructor(data) {
    super("Outro");
  }

  preload() {
    this.load.audio("beach", "../assets/audio/beach.mp3");
    this.load.audio("collect", "../assets/audio/collect.mp3");
    this.load.image("audioOnBlack", "../assets/img/audioOnBlack.png");
    this.load.image("audioOffBlack", "../assets/img/audioOffBlack.png");
    this.load.image("beach", "../assets/img/beach.png");
    this.load.image("tiles", "../assets/img/terrain.png");
    this.load.image("plant", "../assets/img/icons.png");
    this.load.image("play-btn", "../assets/img/playButton.png");
    this.load.image("wood", "../assets/img/wood.png");
    this.load.tilemapTiledJSON("beachmap", "../assets/json/beach-scene.json"); //map.json
    this.load.image("water", "../assets/img/water.png");
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

  create(data) {
    this.add.image(325, 240, "beach");

    // music;
    let click = 0;
    var beachMusic = this.sound.add("beach", { loop: true, volume: 0.1 });
    var collectSound = this.sound.add("collect", { loop: false, volume: 0.5 });
    beachMusic.play();
    let audioOn = this.add
      .image(620, 30, "audioOnBlack")
      .setScale(0.5)
      .setScrollFactor(0);
    audioOn.setInteractive();
    audioOn.on("pointerup", () => {
      if (click % 2 || click === 0) {
        collectSound.play({ volume: 0 });
        beachMusic.stop();
        audioOn = this.add.image(620, 30, "audioOffBlack").setScale(0.5);
        click++;
      } else {
        beachMusic.play();
        audioOn = this.add.image(620, 30, "audioOnBlack").setScale(0.5);
        click++;
      }
      return click;
    });

    this.physics.world.setBounds(0, 0, 650, 480);
    const beachmap = this.make.tilemap({ key: "beachmap" });
    const tileset = beachmap.addTilesetImage("water", "water");
    const terrain = beachmap.createLayer("beach-floor", tileset);
    terrain.setCollisionByExclusion(-1);
    terrain.setVisible(false);
    player = this.physics.add.sprite(100, 400, "toad");
    player.setCollideWorldBounds("true");
    player.setBounce(0.2);
    witch = this.physics.add
      .sprite(250, 400, "witch")
      .setFlipX(true)
      .setScale(2);
    witch.setCollideWorldBounds("true");
    witch.play("witchIdle");
    bunny = this.physics.add.sprite(500, 400, "bunny");
    bunny.play("bunnyIdle");
    bunny.setCollideWorldBounds("true");
    fox = this.physics.add.sprite(425, 400, "fox").setFlipX(true).setScale(2);
    fox.play("foxIdle");
    fox.setCollideWorldBounds("true");
    octopus = this.physics.add
      .sprite(350, 400, "octopus")
      .setFlipX(true)
      .setScale(2);
    octopus.play("octIdle");
    octopus.setCollideWorldBounds("true");
    crab = this.physics.add.sprite(550, 400, "crab").setScale(2);
    crab.play("crabIdle");
    crab.setCollideWorldBounds("true");
    this.physics.add.collider(player, terrain);
    this.physics.add.collider(witch, terrain);
    this.physics.add.collider(bunny, terrain);
    this.physics.add.collider(fox, terrain);
    this.physics.add.collider(octopus, terrain);
    this.physics.add.collider(crab, terrain);

    cursors = this.input.keyboard.createCursorKeys();

    this.story = this.add
      .text(325, 155 / 1.2, "", {
        fill: "#29465B",
        align: "center",
      })
      .setOrigin(0.5);

    this.typewriteText(
      "                \nToad, you did it!!\n                 \nWith your help our village can build houses,\nprovide free medical care, and have \naccess to clean water!! \n                 \nThe bunnies, foxes, crabs, and octopuses have \ncome together to celebrate this achievement! \n                \nLet's party!!"
    );
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

export default Outro;
