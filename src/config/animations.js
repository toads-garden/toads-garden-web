export default (scene) => {
  scene.anims.create({
    key: "right",
    frames: scene.anims.generateFrameNames("toad", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: "left",
    frames: scene.anims.generateFrameNames("toad", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });
  scene.anims.create({
    key: "turn",
    frames: [{ key: "toad", frame: 0 }],
    frameRate: 20,
  });
};
