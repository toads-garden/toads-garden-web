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
    //this.load.audio("forest"); //forest audio
    this.load.image("forest", "../assets/img/forest.png"); //background
    this.load.image("forestTiles", "../assets/img/forest-terrain.png"); //terrain
    //this.load.image("collectible"); //icons
    this.load.image("heartFull", "../assets/img/heartEmpty.png");
    this.load.tilemapTiledJSON("forestMap", "../assets/json/forest.json"); //map.json
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
    //var music = this.sound.add("forest", { loop: true, volume: 0.1 });
    //music.play();

    //cursors
    // this.inputs = this.inputs.keyboard.createCursorKeys();
    // cursors = this.inputs.keyboard.createCursorKeys();

    //platforms and ground
    this.add.image(960, 240, "forest");
    const forestMap = this.make.tilemap({ key: "forestMap" });
    const newtile = forestMap.addTilesetImage("forest-terrain", "forestTiles");
    const forestGround = forestMap.createLayer("forest-terrain", newtile);
    //const platforms = map.createLayer('platform', tileset);
    //const invisible = map.createLayer('invisible',tileset).setVisible(false);
    //platforms.setCollisionByExclusion(-1);
    //invisible.setCollisionByExclusion(-1);
    forestGround.setCollisionByExclusion(-1);

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
    player = new Toad(this, 100, 400)
      .collideWith([forestGround])
      .overlapWith()
      .hitEnemy();

    this.inputs = this.input.keyboard.createCursorKeys();

    cursors = this.input.keyboard.createCursorKeys();
    //score
    text = this.add.text(0, 0, `Wood Collected: ${score}`, {
      fontSize: "20px",
      fill: "#ffffff",
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
