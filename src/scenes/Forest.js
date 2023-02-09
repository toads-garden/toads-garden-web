import Phaser from "phaser";
import generateAnimations from "../config/animations";
import { Toad } from "../gameObjects/Toad";

var cursors;
var player;
var score = 0;
var text;
var woodLayer;
var collectibleWood;
var EnemyLayerFox;
var foxes;
var gameOver = false;
var forestMusic;
var collectSound;

class Forest extends Phaser.Scene {
  constructor() {
    super("Forest");
  }
  preload() {
    this.load.audio("forest", "../assets/audio/forest.mp3"); //forest audio
    this.load.audio("collect", "../assets/audio/collect.mp3"); //collect audio
    this.load.image("forest", "../assets/img/forest.png"); //background
    this.load.image("audioOn", "../assets/img/audioOn.png"); //audio button
    this.load.image("audioOff", "../assets/img/audioOff.png"); //audioOff button
    this.load.image("forestTiles", "../assets/img/forest-terrain.png"); //terrain
    this.load.image("wood", "../assets/img/wood.png"); //icons
    this.load.tilemapTiledJSON("forestMap", "../assets/json/forest.json"); //map.json
    this.load.image("pipe", "../assets/img/pipe.png");
    this.load.spritesheet("toad", "assets/img/toad.png", {
      frameWidth: 48,
      frameHeight: 44,
    });

    this.load.on("complete", () => {
      generateAnimations(this);
    });

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
  }

  create() {
    //cursors
    this.inputs = this.input.keyboard.createCursorKeys();
    cursors = this.input.keyboard.createCursorKeys();

    //platforms and ground
    this.add.image(960, 240, "forest");
    let pipe = this.add.image(1850, 410, "pipe");
    const forestMap = this.make.tilemap({ key: "forestMap" });
    const newtile = forestMap.addTilesetImage("forest-terrain", "forestTiles");
    const forestGround = forestMap.createLayer("forest-terrain", newtile);
    const forestPipe = forestMap
      .createLayer("forestPipe", newtile)
      .setVisible(false);
    const grass = forestMap.createLayer("grass", newtile);
    const forestInvis = forestMap
      .createLayer("forestInvis", newtile)
      .setVisible(false);

    //collisions
    forestInvis.setCollisionByExclusion(-1);
    forestGround.setCollisionByExclusion(-1);
    forestPipe.setCollisionByExclusion(-1);

    //collectibles
    collectibleWood = this.physics.add.staticGroup();
    woodLayer = forestMap.getObjectLayer("woodLayer")["objects"];
    woodLayer.forEach((object) => {
      let obj = collectibleWood.create(object.x, object.y, "wood");
      obj.setScale(object.width / 20, object.height / 20);
      obj.setOrigin(0);
      obj.body.width = object.width;
      obj.body.height = object.height;
      obj.setSize(50, 44, true);
      obj.setOffset(16, 20);
    });

    //foxes
    EnemyLayerFox = forestMap.getObjectLayer("EnemyLayerFox")["objects"];
    foxes = this.physics.add.group({ key: "fox" });
    EnemyLayerFox.forEach((object) => {
      let foxObj = foxes.create(object.x, object.y, "fox");
      foxObj.setScale(object.width / 12, object.height / 12);
      foxObj.setOrigin(0);
      foxObj.setSize(32, 18, true);
      foxObj.setOffset(0, 14);
      foxObj.body.width = object.width;
      foxObj.direction = "RIGHT";
      foxObj.body.height = object.height;
    });

    this.physics.add.collider(foxes, forestGround);
    this.physics.add.collider(foxes, forestInvis);

    //score and collect items
    text = this.add
      .text(20, 23, `Wood Collected: ${score} / 15`, {
        fontSize: "20px",
        fill: "#ffffff",
      })
      .setScrollFactor(0);

    function collect(player, collectibleWood) {
      collectibleWood.destroy(collectibleWood.x, collectibleWood.y);
      collectSound.play();
      score++;
      text.setText(`Wood Collected: ${score} / 15`);
      return false;
    }
    //hit enemy
    function hitFox(player, foxes) {
      forestMusic.stop();
      gameIsOver();
    }
    function gameIsOver() {
      gameOver = true;
      player.die();
      score = 0;
    }
    //TOAD
    player = new Toad(this, 100, 400)
      .collideWith([forestGround, forestPipe])
      .overlapWith(collectibleWood, collect)
      .hitEnemy(foxes, hitFox);

    //music
    let click = 0;
    var collectSound = this.sound.add("collect", { loop: false, volume: 0.5 });
    var forestMusic = this.sound.add("forest", { loop: true, volume: 0.1 });
    forestMusic.play();
    let audioOn = this.add
      .image(620, 30, "audioOn")
      .setScale(0.5)
      .setScrollFactor(0);
    audioOn.setInteractive();
    audioOn.on("pointerup", () => {
      if (click % 2 || click === 0) {
        collectSound.play({ volume: 0 });
        forestMusic.stop();
        audioOn = this.add
          .image(620, 30, "audioOff")
          .setScale(0.5)
          .setScrollFactor(0);
        click++;
      } else {
        collectSound.play({ volume: 0.5 });
        forestMusic.play();
        audioOn = this.add
          .image(620, 30, "audioOn")
          .setScale(0.5)
          .setScrollFactor(0);
        click++;
      }
      return click;
    });
  }

  update() {
    player.update(this.inputs);
    //fox movement
    for (const fox of foxes.children.entries) {
      if (fox.body.blocked.left) {
        fox.direction = "RIGHT";
        fox.play("foxRunLeft", true);
      }
      if (fox.body.blocked.right) {
        fox.direction = "LEFT";
        fox.play("foxRunRight", true);
      }
      if (fox.direction === "RIGHT") {
        fox.setVelocityX(100).setFlipX(false);
      } else {
        fox.setVelocityX(-100).setFlipX(true);
      }
    }
    //pipe to next scene location
    var xDifference = Math.abs(Math.floor(player.sprite.x) - 1853);
    var yDifference = Math.abs(Math.floor(player.sprite.y) - 346);
    var threshhold = 5;
    if (xDifference <= threshhold && yDifference <= threshhold && score >= 15) {
      this.scene.start("Underwater");
      this.sound.removeByKey("forest");
    }
  }
}

export default Forest;
