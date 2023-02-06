import Phaser from "Phaser";
import generateAnimations from "../config/animations";

var cursors;
var player;
var score = 0;
var text;
var bubbles;
var EnemyLayerCrab;
var EnemyLayerOct;
var octopuses;
var crabs;
var gameOver = false;
var cameras;
var pipe;

class Underwater extends Phaser.Scene {
  //platforms;
  constructor() {
    super({
      key: "Underwater",
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 50 },
        },
      },
    });
  }
  preload() {
    //this.load.audio('underwater'); //underwater audio
    this.load.image("waterbg", "../assets/img/waterbg.png"); //background
    this.load.image("water", "../assets/img/water.png"); //terrain
    this.load.image("bubbles", "../assets/img/bubble_1.png"); //icons
    this.load.tilemapTiledJSON("waterMap", "../assets/json/watermap.json"); //map.json
    this.load.image("pipe", "../assets/img/pipe.png");
    this.load.spritesheet("toad", "assets/img/toad.png", {
      frameWidth: 48,
      frameHeight: 44,
    });

    this.load.on("complete", () => {
      generateAnimations(this);
    });

    this.load.atlas(
      "octopus",
      "./assets/img/oct.png",
      "./assets/json/oct_atlas.json"
    ); //octupus
    this.load.atlas(
      "crab",
      "./assets/img/crab.png",
      "./assets/json/crab_atlas.json"
    );
  }
  create() {
    //var music = this.sound.add('underwater', {loop: true, volume:0.1});
    //music.play();
    this.cameras.main.setBounds(0, 0, 1920, 480);
    this.physics.world.setBounds(0, 0, 1920, 480);
    //cursors
    this.inputs = this.input.keyboard.createCursorKeys();
    cursors = this.input.keyboard.createCursorKeys();
    //platforms and ground
    this.add.image(960, 240, "waterbg");
    const waterMap = this.make.tilemap({ key: "waterMap" });
    const waterTile = waterMap.addTilesetImage("water", "water");
    const waterGround = waterMap
      .createLayer("water-ground", waterTile)
      .setVisible(false);
    const invisEnemyBlock = waterMap
      .createLayer("invisEnemyBlock", waterTile)
      .setVisible(false);
    invisEnemyBlock.setCollisionByExclusion(-1);
    waterGround.setCollisionByExclusion(-1);
    let pipe = this.add.image(1850, 420, "pipe");
    //collectibles
    bubbles = this.physics.add.group({
      key: "bubbles",
    });
    function createBubbles() {
      bubbles.create(
        100 + Math.random() * 1920,
        100 + Math.random() * 300,
        "bubbles"
      );
    }
    for (let i = 0; i < 15; i++) {
      createBubbles();
    }
    bubbles.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.9, 1));
    });
    this.physics.add.collider(bubbles, waterGround);

    //octopuses
    EnemyLayerOct = waterMap.getObjectLayer("EnemyLayerOct")["objects"];
    octopuses = this.physics.add.group({ key: "octopus" });
    EnemyLayerOct.forEach((object) => {
      let octObj = octopuses.create(object.x, object.y, "octopus");
      octObj.setScale(object.width / 16, object.height / 16);
      octObj.setOrigin(0);
      octObj.body.width = object.width;

      octObj.direction = "DOWN";

      octObj.body.height = object.height;
    });
    this.physics.add.collider(octopuses, waterGround);
    this.physics.add.collider(octopuses, invisEnemyBlock);

    //crabs
    EnemyLayerCrab = waterMap.getObjectLayer("EnemyLayerCrab")["objects"];
    crabs = this.physics.add.group({ key: "crab" });
    EnemyLayerCrab.forEach((object) => {
      let crabObj = crabs.create(object.x, object.y, "crab");
      crabObj.setScale(object.width / 16, object.height / 16);
      crabObj.setOrigin(0);
      crabObj.body.width = object.width;
      crabObj.direction = "RIGHT";
      crabObj.body.height = object.height;
    });
    this.physics.add.collider(crabs, waterGround);
    this.physics.add.collider(crabs, invisEnemyBlock);

    //score
    text = this.add.text(0, 0, `Bubbles Collected: ${score}`, {
      fontSize: "20px",
      fill: "#ffffff",
    });
    text.setScrollFactor(0);

    function collect(player, collectibleBubble) {
      collectibleBubble.destroy(collectibleBubble.x, collectibleBubble.y);
      score++;
      text.setText(`Bubbles Collected: ${score}`);
      return false;
    }

    // function hitOct(player, octopuses) {
    //   gameIsOver();
    // }

    // function gameIsOver() {
    //   gameOver = true;
    //   player.die();
    //   score = 0;
    // }

    //TOAD
    player = this.physics.add.sprite(100, 400, "toad");
    player.setCollideWorldBounds("true");
    player.setBounce(0.2);
    this.cameras.main.startFollow(player, true, 0.08, 0.08);
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
    this.physics.add.collider(player, waterGround);
    this.physics.add.collider(player, bubbles, collect, null, this);
    cursors = this.input.keyboard.createCursorKeys();
    // player = new Toad(this, 100, 400)
    //   .collideWith(waterGround)
    //   .overlapWith(collectibleBubble, collect)
    //   .hitEnemy(octopuses); //hitOct);
  }
  update() {
    // player.update(this.inputs);
    for (const oct of octopuses.children.entries) {
      if (oct.body.blocked.up) {
        oct.direction = "DOWN";
        oct.play("octSwimDown", true);
      }
      if (oct.body.blocked.down) {
        oct.direction = "UP";
        oct.play("octSwimUp", true);
      }
      if (oct.direction === "DOWN") {
        oct.setVelocityY(100);
      } else {
        oct.setVelocityY(-100);
      }
    }
    for (const crab of crabs.children.entries) {
      if (crab.body.blocked.left) {
        crab.direction = "RIGHT";
        crab.play("crabWalkLeft", true);
      }
      if (crab.body.blocked.right) {
        crab.direction = "LEFT";
        crab.play("crabWalkRight", true);
      }
      if (crab.direction === "RIGHT") {
        crab.setVelocityX(100).setFlipX(false);
      } else {
        crab.setVelocityX(-100).setFlipX(true);
      }
    }
    if (cursors.left.isDown) {
      player.setVelocityX(-500).setFlipX(true);

      player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(500).setFlipX(false);

      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);

      player.anims.play("turn");
    }

    if (cursors.up.isDown) {
      player.setVelocityY(-75);
    }
    if (cursors.down.isDown) {
      player.setVelocityY(75);
    }

    var xDifference = Math.abs(Math.floor(player.body.x) - 1853);
    var yDifference = Math.abs(Math.floor(player.body.y) - 362);
    var threshhold = 5;
    if (xDifference <= threshhold && yDifference <= threshhold && score >= 3) {
      this.scene.start("Underwater");
    }
  }
}

export default Underwater;
