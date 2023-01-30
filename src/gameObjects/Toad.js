// import { Sprite } from "Phaser";
// var cursors;
export class Toad extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "toad");

    // let cursors;
    // this.play("turn");
    // this.scene.add.existing(this);
    // this.scene.physics.add.existing(this);
    this.scene = scene;
    this.sprite = this.scene.physics.add.sprite(x, y, "toad");

    this.sprite.setCollideWorldBounds(true);
    this.sprite.setBounce(0.2);

    // this.init();
    this.create();
  }
  // init() {
  //   this.cursors;
  // }
  collideWith(gameObject) {
    this.collider = this.scene.physics.add.collider(this.sprite, gameObject);

    return this;
  }

  create() {
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
  }

  update(input) {
    if (input.left.isDown) {
      this.sprite.setVelocityX(-200).setFlipX(true);
      // this.sprite.anims.play("left", true);
      // this.sprite.body.onFloor() &&
      //   !this.sprite.isDed &&
      //   this.sprite.play("run", true);

      // this.scene.cameras.main.stopFollow(this.sprite);
    } else if (input.right.isDown) {
      this.sprite.setVelocityX(200).setFlipX(false);
      // this.sprite.anims.play("right", true);
      // this.sprite.body.onFloor() &&
      //   !this.sprite.isDed &&
      //   this.sprite.play("run", true);

      // this.reFollowPlayer();
    } else {
      this.sprite.setVelocityX(0);
      // this.sprite.play("turn", true);
      // this.sprite.body.onFloor() &&
      //   !this.sprite.isDed &&
      //   this.sprite.play("idle", true);
    }

    if (input.up.isDown && this.sprite.body.onFloor()) {
      this.sprite.setVelocityY(-350);
      // this.sprite.play("jump", true);
    }
  }
}
