import Phaser from "Phaser";
export default class Bunny extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "bunny");
    this.scene = scene;
    this.anims.play("bunnyIdle");
  }
  collideWith(gameObject) {
    this.scene.physics.add.collider(this.bunnies, gameObject);

    return this;
  }
}

//other option
// class Bunny {
//   constructor(scene) {
//     this.scene = scene;
//     this.bunnies = this.scene.physics.add.group();
//     this.collider = this.scene.physics.add.collider(
//       this.scene.player,
//       this.bunnies,
//       null,
//       null,
//       this
//     );

//     // const bunnyObjects = this.scene.map.getObjectLayer("EnemyLayer").objects;

//     // for (const bunny of bunnyObjects) {
//     //   this.bunnies
//     //     .create(bunny.x, bunny.y - bunny.height, "bunny")
//     //     .setScale(1.5)
//     //     .setOrigin(0)
//     //     .setDepth(-1);
//     // }

//     for (const bunny of this.bunnies.children.entries) {
//       bunny.direction = "RIGHT";
//       bunny.isDed = false;
//     }
//   }

//   collideWith(gameObject) {
//     this.scene.physics.add.collider(this.bunnies, gameObject);

//     return this;
//   }

//   update() {
//     for (const bunny of this.bunnies.children.entries) {
//       if (bunny.body.blocked.right) {
//         bunny.direction = "LEFT";
//       }

//       if (bunny.body.blocked.left) {
//         bunny.direction = "RIGHT";
//       }

//       if (bunny.direction === "RIGHT") {
//         bunny.setVelocityX(100);
//       } else {
//         bunny.setVelocityX(-100);
//       }

//       !bunny.isDed && bunny.play("bunnyRun", true);
//     }
//   }

//   // gameOver() {
//   //     // PHEW
//   //     if (this.scene.player.sprite.body.touching.down) {
//   //         this.die();

//   //         return;
//   //     }

//   //     this.scene.player.die();
//   //     this.scene.input.keyboard.shutdown();

//   //     this.scene.physics.world.removeCollider(this.scene.player.collider);
//   //     this.scene.physics.world.removeCollider(this.collider);

//   //     setTimeout(() => {
//   //         this.scene.scene.start('GameOver');
//   //     }, 1500);
//   // }

//   // die() {
//   //     for (const goomba of this.goombas.children.entries) {
//   //         if (goomba.body.touching.up) {
//   //             goomba.isDed = true;
//   //             goomba.play('goombaDie', true);
//   //             goomba.on('animationcomplete', () => goomba.destroy());

//   //             increaseScore(.5);

//   //             this.scene.player.sprite.setVelocity(0, -350);
//   //             this.scene.player.sprite.play('jump');
//   //         };
//   //     }
//   // }
// }

// export default Bunny;
