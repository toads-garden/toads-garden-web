import Phaser from "Phaser";
import generateAnimations from "../config/animations";

var cursors;
var player;
var score = 0;
var text;
var bubbles;
var EnemyLayerOct;
var octupuses;
var gameOver = false;
var cameras;
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
    //const waterInvis = waterMap.createLayer('waterInvis', waterTile).setVisible(false);
    //waterInvis.setCollisionByExclusion(-1);
    waterGround.setCollisionByExclusion(-1);

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
    // EnemyLayerOct = waterMap.getObjectLayer("EnemyLayerOct")["objects"];
    // octupuses = this.physics.add.group({ key: "octopus" });
    // EnemyLayerOct.forEach((object) => {
    //   let octObj = octupuses.create(object.x, object.y, "octopus");
    //   octObj.setScale(object.width / 16, object.height / 16);
    //   octObj.setOrigin(0);
    //   octObj.body.width = object.width;
    //   octObj.body.height = object.height;
    //   octObj.direction = "UP";
    // });
    // this.physics.add.collider(octupuses, waterGround);with the ground
    // this.physics.add.collider(octupuses, waterInvis);with the invisible

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

    // function hitOct(player, octupuses) {
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
    cursors = this.input.keyboard.createCursorKeys();
    // player = new Toad(this, 100, 400)
    //   .collideWith(waterGround)
    //   .overlapWith(collectibleBubble, collect)
    //   .hitEnemy(octupuses); //hitOct);
  }
  update() {
    // player.update(this.inputs);
    if (cursors.left.isDown) {
      player.setVelocityX(-100).setFlipX(true);

      player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(100).setFlipX(false);

      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);

      player.anims.play("turn");
    }

    if (cursors.up.isDown) {
      player.setVelocityY(-75);
    }
    // for (const oct of octupuses.children.entries) {
    //   if (oct.body.blocked.up) {
    //     oct.direction = "DOWN";
    //     oct.play("octSwimUp", true);
    //   }
    //   if (oct.body.blocked.down) {
    //     oct.direction = "UP";
    //     oct.play("octSwimDown", true);
    //   }
    //   if (oct.direction === "UP") {
    //     oct.setVelocityY(100);
    //   } else {
    //     oct.setVelocityY(-100);
    //   }
    // }
  }
}

export default Underwater;
