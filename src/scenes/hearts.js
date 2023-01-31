import Phaser from "Phaser";

export default class Hearts extends Phaser.Scene {
  constructor() {
    super({ key: "hearts" });
  }
  create() {
    const hearts = this.add.group({
      key: "heartFull",
      quantity: 3,
      setXY: { x: 570, y: 10, stepX: 30 },
    });
  }
}
