import Phaser from "Phaser";
import generateAnimations from "../config/animations";

var player;
var cursors;
var pipe;
var townMusic;
var townMushroom;
var bunny;
var fox;
var octopus;
var crab;

class Town extends Phaser.Scene {
  constructor(data) {
    super("Town");
  }

  preload() {
    this.load.audio("town", "../assets/audio/town.mp3");
    this.load.audio("collect", "../assets/audio/collect.mp3");
    this.load.image("audioOn", "../assets/img/audioOn.png");
    this.load.image("audioOff", "../assets/img/audioOff.png");
    this.load.tilemapTiledJSON("townBeta", "../assets/json/townBeta.json");
    this.load.image("townTiles", "../assets/img/townTiles.png");
    this.load.image("townBeta", "../assets/img/townBeta.png");
    // this.load.image("pipe", "../assets/img/pipe.png");
    this.load.spritesheet(
      "townMushroomSprite",
      "assets/img/townMushroomSprite.png",
      {
        frameWidth: 48,
        frameHeight: 49,
      }
    );
    this.load.atlas(
      "townMushroom",
      "./assets/img/townMushroomSprite.png",
      "./assets/json/townMushroom.json"
    );
    this.load.atlas("toad", "./assets/img/toad.png", "./assets/json/toad.json");
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
    this.add.image(325, 240, "townBeta");

    //music
    let click = 0;
    var collectSound = this.sound.add("collect", { loop: false, volume: 0.5 });
    var townMusic = this.sound.add("town", { loop: true, volume: 0.1 });
    townMusic.play();
    let audioOn = this.add
      .image(620, 30, "audioOn")
      .setScale(0.5)
      .setScrollFactor(0);
    audioOn.setInteractive();
    audioOn.on("pointerup", () => {
      if (click % 2 || click === 0) {
        collectSound.play({ volume: 0 });
        townMusic.stop();
        audioOn = this.add.image(620, 30, "audioOff").setScale(0.5);
        click++;
      } else {
        townMusic.play();
        audioOn = this.add.image(620, 30, "audioOn").setScale(0.5);
        click++;
      }
      return click;
    });

    this.physics.world.setBounds(0, 0, 650, 480);
    // pipe = this.add.image(575, 420, "pipe");
    const townMap = this.make.tilemap({ key: "townBeta" });
    const tileset = townMap.addTilesetImage("townTiles", "townTiles");
    const ocean = townMap.createLayer("Ocean", tileset);
    const land = townMap.createLayer("Land", tileset);
    const paths = townMap.createLayer("Paths", tileset);
    const garden = townMap.createLayer("Gardens", tileset);
    const trees = townMap.createLayer("Trees", tileset);
    const trees1 = townMap.createLayer("Trees1", tileset);
    const trees2 = townMap.createLayer("Trees2", tileset);
    const bridges = townMap.createLayer("Bridges", tileset);
    const houses = townMap.createLayer("Houses", tileset);

    player = this.physics.add.sprite(300, 300, "townMushroom");
    player.setCollideWorldBounds("true");
    // player.setBounce(0.2);
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("townMushroom_", {
        start: 1,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("townMushroom_", {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("townMushroom_", {
        start: 3,
        end: 5,
      }),
      frameRate: 20,
      repeat: -1,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("townMushroom_", {
        start: 6,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("townMushroom_", {
        start: 9,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });

    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, land);
    // this.physics.add.collider(player, singlePlat);
    // this.physics.add.overlap(player, plant, collect, null, this);
    // this.physics.add.overlap(player, wood, collect, null, this);
  }

  update() {
    if (cursors.left.isDown) {
      player.setVelocityX(-160).setFlipX(true);

      player.anims.play("townMushroomLeft", true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160).setFlipX(false);

      player.anims.play("townMushroomRight", true);
    } else {
      player.setVelocityX(0);

      player.anims.play("townMushroomRight");
    }

    if (cursors.up.isDown && player.body.onFloor()) {
      player.setVelocityY(-250);
    }

    //   var xDifference = Math.abs(Math.floor(player.body.x) - 548);
    //   var yDifference = Math.abs(Math.floor(player.body.y) - 336);
    //   var threshhold = 5;
    //   if (xDifference <= threshhold && yDifference <= threshhold) {
    //     this.scene.start("Garden");
    //     this.sound.removeByKey("intro");
    //   }
    // }

    // typewriteText(text) {
    //   const length = text.length;
    //   let i = 0;
    //   this.time.addEvent({
    //     callback: () => {
    //       this.story.text += text[i];
    //       i++;
    //     },
    //     repeat: length - 1,
    //     delay: 40,
    //   });
  }
}

export default Town;
