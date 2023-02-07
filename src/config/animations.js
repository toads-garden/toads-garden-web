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
  scene.anims.create({
    key: "bunnyRunLeft",
    frames: scene.anims.generateFrameNames("bunny", {
      start: 6,
      end: 10,
      prefix: "bunny-sheet_",
    }),
    repeat: -1,
    frameRate: 10,
  });
  scene.anims.create({
    key: "bunnyRunRight",
    frames: scene.anims.generateFrameNames("bunny", {
      start: 6,
      end: 10,
      prefix: "bunny-sheet_",
    }),
    repeat: -1,
    frameRate: 10,
  });
  scene.anims.create({
    key: "foxIdle",
    frames: scene.anims.generateFrameNames("fox", {
      start: 14,
      end: 27,
      prefix: "fox_sprite_sheet_",
    }),
    repeat: -1,
    frameRate: 10,
  });
  scene.anims.create({
    key: "foxRunRight",
    frames: scene.anims.generateFrameNames("fox", {
      start: 28,
      end: 35,
      prefix: "fox_sprite_sheet_",
    }),
    repeat: -1,
    frameRate: 10,
  });
  scene.anims.create({
    key: "foxRunLeft",
    frames: scene.anims.generateFrameNames("fox", {
      start: 28,
      end: 35,
      prefix: "fox_sprite_sheet_",
    }),
    repeat: -1,
    frameRate: 10,
  });
  scene.anims.create({
    key: "octIdle",
    frames: scene.anims.generateFrameNames("octupus", {
      start: 21,
      end: 26,
      prefix: "octopus_sprite_sheet_",
    }),
    repeat: -1,
    frameRate: 10,
  });
  scene.anims.create({
    key: "octSwimUp",
    frames: scene.anims.generateFrameNames("octopus", {
      start: 0,
      end: 3,
      prefix: "octopus_sprite_sheet_",
    }),
    repeat: -1,
    frameRate: 10,
  });
  scene.anims.create({
    key: "octSwimDown",
    frames: scene.anims.generateFrameNames("octopus", {
      start: 0,
      end: 3,
      prefix: "octopus_sprite_sheet_",
    }),
    repeat: -1,
    frameRate: 10,
  });
  scene.anims.create({
    key: "crabIdle",
    frames: scene.anims.generateFrameNames("crab", {
      start: 4,
      end: 8,
      prefix: "crab_sprite_sheet_",
    }),
    repeat: -1,
    frameRate: 10,
  });
  scene.anims.create({
    key: "crabWalkRight",
    frames: scene.anims.generateFrameNames("crab", {
      start: 9,
      end: 13,
      prefix: "crab_sprite_sheet_",
    }),
    repeat: -1,
    frameRate: 10,
  });
  scene.anims.create({
    key: "crabWalkLeft",
    frames: scene.anims.generateFrameNames("crab", {
      start: 9,
      end: 13,
      prefix: "crab_sprite_sheet_",
    }),
    repeat: -1,
    frameRate: 10,
  });
};
