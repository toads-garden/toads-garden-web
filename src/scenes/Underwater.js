import Phaser from "Phaser";
import generateAnimations from "../config/animations";
import { Toad } from "../gameObjects/Toad";

var cursors;
var player;
var score = 0;
var text;
var bubbleLayer;
var collectibleBubble;
var EnemyLayerOct;
var octupuses;
var gameOver = false;

class Underwater extends Phaser.Scene {
  //platforms;
  constructor() {
    super("Underwater");
  }
  preload() {
    //this.load.audio('underwater'); //underwater audio
    this.load.image(""); //background
    this.load.image(""); //terrain
    this.load.image("bubbles"); //icons
    this.load.tilemapTiledJSON(""); //map.json
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

    //cursors
    this.inputs = this.inputs.keyboard.createCursorKeys();
    cursors = this.inputs.keyboard.createCursorKeys();

    //platforms and ground
    // this.add.image(960, 240, 'underwater');
    const waterMap = this.make.tilemap({ key: "waterMap" });
    // const waterTile = waterMap.addTilesetImage('');
    //const waterGround = waterMap.createLayer('');
    //const waterInvis = waterMap.createLayer('waterInvis', waterTile).setVisible(false);
    //waterInvis.setCollisionByExclusion(-1);
    //waterGround.setCollisionByExclusion(-1);

    //collectibles
    collectibleBubble = this.physics.add.staticGroup();
    bubbleLayer = waterMap.getObjectLayer("bubbleLayer")["objects"];
    bubbleLayer.forest((object) => {
      let obj = collectibleBubble.create(object.x, object.y, "bubbles");
      obj.setScale(object.width, object.height);
      obj.setOrigin(0);
      obj.body.width = object.width;
      obj.body.height = object.height;
    });

    //octopuses
    EnemyLayerOct = waterMap.getObjectLayer("EnemyLayerOct")["objects"];
    octupuses = this.physics.add.group({ key: "octopus" });
    EnemyLayerOct.forEach((object) => {
      let octObj = octupuses.create(object.x, object.y, "octopus");
      octObj.setScale(object.width / 16, object.height / 16);
      octObj.setOrigin(0);
      octObj.body.width = object.width;
      octObj.body.height = object.height;
      octObj.direction = "UP";
    });
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

    function hitOct(player, octupuses) {
      gameIsOver();
    }

    function gameIsOver() {
      gameOver = true;
      player.die();
      score = 0;
    }

    //TOAD
    player = new Toad(this, 100, 400)
      .collideWith()
      .overlapWith(collectibleBubble, collect)
      .hitEnemy(octupuses, hitOct);
  }
  update() {
    player.update(this.inputs);
    for (const oct of octupuses.children.entries) {
      if (oct.body.blocked.up) {
        oct.direction = "DOWN";
        oct.play("octSwimUp", true);
      }
      if (oct.body.blocked.down) {
        oct.direction = "UP";
        oct.play("octSwimDown", true);
      }
      if (oct.direction === "UP") {
        oct.setVelocityY(100);
      } else {
        oct.setVelocityY(-100);
      }
    }
  }
}

export default Underwater;
