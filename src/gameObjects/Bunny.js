// import Phaser from "Phaser";
// export default class Bunny extends Phaser.GameObjects.Sprite {
//   constructor(scene, x, y) {
//     super(scene, x, y, "bunny");
//     this.scene = scene;
//     this.anims.play("bunnyIdle");
//   }
//   collideWith(gameObject) {
//     this.scene.physics.add.collider(this.bunnies, gameObject);

//     return this;
//   }
// }

//other option
// class Bunny {
//   constructor(scene) {
//     this.scene = scene;
//     let map = this.scene.map;
//     this.scene.physics.world.enable(this);
//     console.log(map);
//     this.bunnies = this.scene.physics.add.group();
//     this.collider = this.scene.physics.add.collider(
//       this.scene.player,
//       this.bunnies,
//       null,
//       null,
//       this
//     );
//     this.body.setCollideWorldBounds(true);

//     const bunnyObjects = map.getObjectLayer("EnemyLayer").objects;

//     for (const bunny of bunnyObjects) {
//       this.bunnies
//         .create(bunny.x, bunny.y - bunny.height, "bunny")
//         .setScale(1.5)
//         .setOrigin(0)
//         .setDepth(-1);
//     }

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
// }

// export default Bunny;
