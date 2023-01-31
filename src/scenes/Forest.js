import Phaser from "Phaser";
import generateAnimations from "../config/animations";
import { Toad } from "../gameObjects/Toad";

var cursors;
var player;
var score = 0;
var text;
//var CollectibleLayer;
//var collectibles;

var foxes;

class Forest extends Phaser.Scene {
  //platforms;
  constructor() {
    super("Forest");
  }
  preload() {
    this.load.audio("forest"); //forest audio
    this.load.image("background"); //background
    this.load.image("tiles"); //terrain
    this.load.image("collectible"); //icons
    this.load.image("heartFull", "../assets/img/heartEmpty.png");
    this.load.tilemapTiledJSON("map"); //map.json
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
  }

  create() {
    this.scene.run("hearts");
    var music = this.sound.add("forest", { loop: true, volume: 0.1 });
    //music.play();

    //cursors
    this.inputs = this.inputs.keyboard.createCursorKeys();
    cursors = this.inputs.keyboard.createCursorKeys();

    //platforms and ground
    //this.add.image(960, 240, 'background');
    //const map = this.make.tilemap({key: 'map'});
    //const tileset = map.addTilesetImage('terrain', 'tiles');
    //const ground = map.createLayer('ground', tileset);
    //const platforms = map.createLayer('platform', tileset);
    //const invisible = map.createLayer('invisible',tileset).setVisible(false);
    //platforms.setCollisionByExclusion(-1);
    //invisible.setCollisionByExclusion(-1);
    //ground.setCollisionByExclusion(-1);

    //collectibles
    //collectibles = this.physics.add.staticGroup();
    //CollectibleLayer = map.getObjectLayer('CollectibleLayer')['objects];
    // CollectibleLayer.forEach((object) => {
    //   let obj = collectibles.create(object.x, object.y, "collectible");
    //   obj.setScale(object.width / 16, object.height / 16);
    //   obj.setOrigin(0);
    //   obj.body.width = object.width;
    //   obj.body.height = object.height;
    // });

    //TOAD
    player = new Toad(this, 100, 400).collideWith().overlapWith().hitEnemy();

    //score
    text = this.add.text(0, 0, `Wood Collected: ${score}`, {
      fontSize: "20px",
      fill: "#000000",
    });
    text.setScrollFactor(0);
  }
  // function collect(player, collectible) {
  //   collectible.destroy(collectible.x, collectible.y);

  //   score++;
  //   text.setText(`Wood Collected: ${score}`);
  //   return false;
  // }
  // function hitFox(player, foxes){
  //player.setTint(0xff0000);
  //}

  //this.physics.add.overlap(plyer, collectibles, collect, null, this);

  update() {
    player.update(this.inputs);
  }
}

export default Forest;
