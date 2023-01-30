// import { Sprite } from "Phaser";
// var cursors;
export class Toad extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "toad");
    const useDeadZone = false;
    // let cursors;
    // this.play("turn");
    // this.scene.add.existing(this);
    // this.scene.physics.add.existing(this);
    this.scene = scene;
    this.sprite = this.scene.physics.add.sprite(x, y, "toad");

    this.sprite.setCollideWorldBounds(true);
    this.sprite.setBounce(0.2);

    scene.cameras.main.setBounds(0, 0, 1920, 480).startFollow(this.sprite);

    if (useDeadZone) {
      scene.cameras.main.setDeadzone(
        scene.game.config.width / 4,
        scene.game.config.height
      );
    }
    return this;
  }
  collideWith(gameObject) {
    this.collider = this.scene.physics.add.collider(this.sprite, gameObject);
    return this;
  }
  overlapWith(gameObject, func) {
    this.collider = this.scene.physics.add.overlap(
      this.sprite,
      gameObject,
      func
    );
    return this;
  }
  reFollowPlayer() {
    this.scene.physics.world.bounds.setPosition(
      this.scene.cameras.main.worldView.x,
      0
    );

    if (
      this.sprite.body.position.x + this.sprite.body.width / 2 >
        this.scene.cameras.main.midPoint.x &&
      !this.scene.cameras.main._follow
    ) {
      this.scene.cameras.main.startFollow(this.sprite);
    }
  }

  create() {}

  update(input) {
    if (input.left.isDown) {
      this.sprite.setVelocityX(-200).setFlipX(true);
      this.sprite.play("left", true);
      this.reFollowPlayer();
      // this.scene.cameras.main.stopFollow(this.sprite);
    } else if (input.right.isDown) {
      this.sprite.setVelocityX(200).setFlipX(false);
      this.sprite.play("right", true);
      this.reFollowPlayer();
    } else {
      this.sprite.setVelocityX(0);
      this.sprite.play("turn", true);
    }

    if (input.up.isDown && this.sprite.body.onFloor()) {
      this.sprite.setVelocityY(-250);
      this.sprite.play("turn", true);
    }
  }
}
