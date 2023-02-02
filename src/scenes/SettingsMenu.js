import Phaser from "Phaser";

export class SettingsMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'settings' });
  }
  create() {
    this.add.text(250, 40, 'Settings', {
      fontSize: '56px', color: '#ffffff'
    });
    this.add.text(200, 220, 'Sound Effects',
      { fontSize: '28px', color: '#ffffff' });
    const soundFxButton = this.add.image(550, 235,
      'button').setInteractive();
    const soundFxText = this.add.text(0, 0, 'On', { fontSize:
      '28px', color: '#000000' });
    Phaser.Display.Align.In.Center(soundFxText, soundFxButton);
    this.add.text(200, 350, 'Music',
      { fontSize: '28px', color: '#ffffff'});
    const musicButton = this.add.image(550, 365, 'button')
      .setInteractive();
    const musicText = this.add.text(0, 0, 'On', { fontSize:
      '28px', color: '#000000' });
    Phaser.Display.Align.In.Center(musicText, musicButton);
  }
}
