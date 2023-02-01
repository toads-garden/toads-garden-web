// import { Sprite } from "Phaser";
// var cursors;
export class Toad extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, hp = null, heartCount = null) {
    super(scene, x, y, "toad");
    const useDeadZone = false;
    this.scene = scene;
    this.sprite = this.scene.physics.add.sprite(x, y, "toad");
    this.sprite.isDed = false;
    // this.gameOver = false;

    this.sprite.setCollideWorldBounds(true);
    this.sprite.setBounce(0.2);

    scene.cameras.main.setBounds(0, 0, 1920, 480).startFollow(this.sprite);

    if (useDeadZone) {
      scene.cameras.main.setDeadzone(
        scene.game.config.width / 4,
        scene.game.config.height
      );
    }
    // this.init();
    // this.create();
    return this;
  }
  // init() {
  //   this.max_hp = 3;
  //   this.real_bar;
  // }
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

  hitEnemy(gameObject, func) {
    this.collider = this.scene.physics.add.collider(
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
    if (this.gameOver) {
      return;
    }
    if (input.left.isDown) {
      this.sprite.setVelocityX(-200).setFlipX(true);
      this.sprite.play("left", true);
      this.reFollowPlayer();
      this.sprite.setTint(0xffffff);
      // this.scene.cameras.main.stopFollow(this.sprite);
    } else if (input.right.isDown) {
      this.sprite.setVelocityX(200).setFlipX(false);
      this.sprite.play("right", true);
      this.reFollowPlayer();
      this.sprite.setTint(0xffffff);
    } else {
      this.sprite.setVelocityX(0);
      this.sprite.play("turn", true);
    }

    if (input.up.isDown && this.sprite.body.onFloor()) {
      this.sprite.setVelocityY(-250);
      this.sprite.play("turn", true);
      this.sprite.setTint(0xffffff);
    }
  }
  // gameOver() {
  //   this.sprite.die();
  //   // this.scene.cameras.main.on("camerafadeoutcomplete", (camera, effect) =>
  //   //   this.scene.restart()
  //   // );
  //   // this.scene.cameras.main.on(
  //   //   "camerashakecomplete",
  //   //   (camera, effect) => camera.fade(500)
  //   // );
  //   // this.scene.cameras.main.on("camerafadeoutcomplete", (camera, effect) =>
  //   //   scene.restart()
  //   // );
  //   // this.scene.cameras.main.on(
  //   //   Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
  //   //   () => {
  //   //     this.scene.restart();
  //   //   }
  //   // );
  // }
  die() {
    this.sprite.setTint(0xff0000);
    this.sprite.isDed = true;
    this.sprite.setVelocity(0, -500);
    this.scene.cameras.main.fade(500);
    this.sprite.setCollideWorldBounds("false");

    function restart() {
      this.scene.scene.restart();
    }
    this.scene.time.delayedCall(300, restart, [], this);
    // this.scene.scene.stop();
    // this.scene.scene.start();
    // this.input.on("up", () => this.scene.start("garden"));
    // this.scene.restart;
    // this.scene.cameras.main.on(
    //   "camerafadeoutcomplete",
    //   (camera, effect) => this.scene.events.start
    // );
    // var playbtn = this.add.dom(390, 600).createFromCache("play-btn");

    // playbtn.setPerspective(600);

    // playbtn.addListener("click");
    // playbtn.on("click", (event) => {
    //   this.scene.restart();
    // });
    // this.tweens.add({
    //   targets: playbtn,
    //   y: 300,
    //   duration: 3000,
    //   ease: "Power3",
    // });
  }
}
