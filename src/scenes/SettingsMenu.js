import Phaser from "Phaser";

export default class SettingsMenu extends Phaser.Scene {
  // private scene: PHaser.Scene
  // private container!: Phaser.GameObjects.Container
  // private checkmark!: Phaser.GameObjects.Image
  // private _opened = false

  get isOpen() {
    return this._opened;
  }

  // var container = Phaser.GameObjects.Container;
  // var checkmark = Phaser.GameObjects.Image;
  // var scene = Phaser.Scene;

  constructor() {
    super({ key: "settings" });
  }

  create() {
    this.scene = scene;

    const { width } = this.scene.scale();

    this.container = this.scene.add.container(width + 300, 50);

    const panel = this.scene.add
      .nineslice(0, 0, 200, 50, TEXTURES.UI_PANEL, 24)
      .setOrigin(1, 0);

    const toggleButton = this.scene.add.image(-panel.width + 10, 10);

    this.checkmark = this.scene.add.image(
      toggleButton.x + toggleButton.width * 0.5,
      toggleButton.y,
      toggleButton.height * 0.5,
      "checkbox"
    );

    const text = scene.add.text(
      toggleButton.x + toggleButton.width + 10,
      toggleButton.y + 3,
      "Sound",
      { color: "#000000", fontSize: 20 }
    );

    this.container.add(panel);
    this.container.add(toggleButton);
    this.container.add(this.checkmark);

    toggleButton
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
        toggleButton.setTint(0xe0e0e0);
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
        toggleButton.setTint(0xffffff);
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        toggleButton.setTint(0xffffff);
        this.toggleSound();
      });
  }

  show() {
    if (this._opened) {
      return;
    }
    const { width } = this.scene.scale;
    this.scene.tweens.add({
      targets: this.container,
      x: width - 10,
      duration: 300,
      ease: Phaser.Math.Easing.Sine.InOut,
    });
    this._opened = true;
  }

  hide() {
    if (!this._opened) {
      return;
    }
    const { width } = this.scene.scale;
    this.scene.tweens.add({
      targets: this.container,
      x: width + 300,
      duration: 300,
      ease: Phaser.Math.Easing.Sine.InOut,
    });
    this._opened = false;

    function toggleSound() {
      let isMute = this.checkmark.visible;
      isMute = !isMute;
      this.scene.sound.mute = isMute;
      this.checkmark.visible = !isMute;
    }
  }
}

// export default class SettingsMenu extends Phaser.Scene {
//   constructor() {
//     super({ key: "settingsMenu" });
//   }
//   preload() {
//     this.load.image("grey-box", "../assets/img/grey_box.png");
//     this.load.image("gear", "../assets/img/gear.png");
//     this.load.image("checkmark", "../assets/img/checkmark.png");
//   }

//   create() {
//     this.add.text(510, 0, "Settings", {
//       fontSize: "20px",
//       color: "#000000",
//     });
//     this.add.text(450, 20, "Sound Effects", {
//       fontSize: "20px",
//       color: "#000000",
//     });
//     this.add.text(545, 40, "Music", {
//       fontSize: "20px",
//       color: "#000000",
//     });
//     const buttons = this.add.group({
//       key: "settings",
//       quantity: 1,
//       setXY: { x: 570, y: 10, stepY: 30 },
//     });
//     const soundFxButton = this.add
//       .image(600, 10, "../assets/img/checkmark.png")
//       .setInteractive();
//     // const soundFxText = this.add.text(0, 0, "On", {
//     //   fontSize: "28px",
//     //   color: "#000000",
//     // });
//     Phaser.Display.Align.In.Center(soundFxButton);
//     // const musicButton = this.add.image(630, 30, "button").setInteractive();
//     // const musicText = this.add.text(0, 0, "On", {
//     //   fontSize: "28px",
//     //   color: "#000000",
//     // });
//     // Phaser.Display.Align.In.Center(musicText, musicButton);
//   }
// }
