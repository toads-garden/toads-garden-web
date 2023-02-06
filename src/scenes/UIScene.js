import Phaser from "Phaser";
import SettingsMenu from "./SettingsMenu.js";

// var SettingsMenu;

export default class UIScene extends Phaser.Scene {
  constructor() {
    super("ui");
  }

  create() {
    this.settingsMenu = new SettingsMenu(this);

    const { width } = this.scale;
    const settingsButton = this.add.image(width - 10, 10, "small-button");
    const settingsButtonDimensions = this.add
      .image(
        settingsButton.x - settingsButton.width * 0.5,
        settingsButton.y - settingsButton.width * 0.5,
        "settingsButton"
      )
      .setScale(0.7);

    settingsButton
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
        settingsButton.setTint(0xdedede);
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
        settingsButton.setTint(0xffffff);
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        settingsButton.setTint(0x8afbff);
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
        settingsButton.setTint(0xffffff);

        if (this.settingsMenu.isOpen) {
          this.settingsMenu.hide();
        } else {
          this.settingsMenu.show();
        }
      });
  }
}
