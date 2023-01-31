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
  scene.anims.create({
    key: "bunnyIdle",
    frames: scene.anims.generateFrameNames("bunny", {
      start: 0,
      end: 5,
      prefix: "bunny-sheet_",
    }),
    repeat: -1,
    frameRate: 10,
  });
  // scene.anims.create({
  //   key: "bunnyRun",
  //   frames: scene.anims.generateFrameNames("bunny", {
  //     start: 6,
  //     end: 11,
  //     prefix: "bunny-sheet_",
  //   }),
  //   repeat: -1,
  //   frameRate:10,
};
