import Phaser from "Phaser";
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

class Forest extends Phaser.Scene {
  //platforms;
  constructor() {
    super("Forest");
  }
  preload() {
    //this.load.audio("forest"); //forest audio
    this.load.image("forest", "../assets/img/forest.png"); //background
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
  }

  create() {
    //var music = this.sound.add("forest", { loop: true, volume: 0.1 });
    //music.play();

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
    //const platforms = map.createLayer('platform', tileset);
    //const invisible = map.createLayer('invisible',tileset).setVisible(false);
    //platforms.setCollisionByExclusion(-1);
    forestInvis.setCollisionByExclusion(-1);
    forestGround.setCollisionByExclusion(-1);
    forestPipe.setCollisionByExclusion(-1);
    //collectibles
    collectibleWood = this.physics.add.staticGroup();
    //collectibles = this.physics.add.staticGroup();
    woodLayer = forestMap.getObjectLayer("woodLayer")["objects"];
    woodLayer.forEach((object) => {
      let obj = collectibleWood.create(object.x, object.y, "wood");
      obj.setScale(object.width / 20, object.height / 20);
      obj.setOrigin(0);
      obj.body.width = object.width;
      obj.body.height = object.height;
    });

    //foxes
    EnemyLayerFox = forestMap.getObjectLayer("EnemyLayerFox")["objects"];
    foxes = this.physics.add.group({ key: "fox" });
    EnemyLayerFox.forEach((object) => {
      let foxObj = foxes.create(object.x, object.y, "fox");
      foxObj.setScale(object.width / 16, object.height / 16);
      foxObj.setOrigin(0);
      foxObj.body.width = object.width;
      foxObj.direction = "RIGHT";
      foxObj.body.height = object.height;
    });
    this.physics.add.collider(foxes, forestGround);
    this.physics.add.collider(foxes, forestInvis);

    //score
    text = this.add.text(0, 0, `Wood Collected: ${score}`, {
      fontSize: "20px",
      fill: "#ffffff",
    });
    text.setScrollFactor(0);

    function collect(player, collectibleWood) {
      collectibleWood.destroy(collectibleWood.x, collectibleWood.y);

      score++;
      text.setText(`Wood Collected: ${score}`);
      return false;
    }
    function hitFox(player, foxes) {
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
    //this.physics.add.overlap(player, collectibles, collect, null, this);
  }

  update() {
    player.update(this.inputs);
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
    //346
    //console.log(player.sprite.y);
    var xDifference = Math.abs(Math.floor(player.sprite.x) - 1853);
    var yDifference = Math.abs(Math.floor(player.sprite.y) - 346);
    var threshhold = 5;
    if (xDifference <= threshhold && yDifference <= threshhold && score >= 15) {
      this.scene.start("Underwater");
      score = 0;
    }
  }
}

export default Forest;
