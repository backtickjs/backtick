import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import * as Fiber from "@react-three/fiber";
import ReactThreeTestRenderer from "@react-three/test-renderer";
import { execRoot } from "@backtickjs/core/cjs";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
import { readLevel, readLevels } from "./levels.js";
import { type Input, type Stats, World, type WorldProps } from "./World.js";

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

// What the app provides, as `server/index.tsx` and `client/App.tsx` say, with R3F's
// web build standing in for its native one: the test renderer draws it
// without a GPU.
const require = createRequire(import.meta.url);
const modules = {
  react: require("react/package.json").version,
  "react/jsx-runtime": require("react/package.json").version,
  "react-native": require("react-native/package.json").version,
  "@react-three/fiber/native": require("@react-three/fiber/package.json")
    .version,
};
const moduleMap = {
  react: React,
  "react/jsx-runtime": JSXRuntime,
  "@react-three/fiber/native": Fiber,
};

// `World` as the phone gets it: bundled by the server, run by the app.
const bundle = await bundler.build({ input: World, modules });
const PlayedWorld = await execRoot(
  bundle.generate({ format: "cjs" }).code,
  moduleMap,
);

const start: Stats = { health: 100, ammo: 24, kills: 0, shots: 0, wounds: 0 };

async function play(rows: string[], input: Input) {
  const changes: Stats[] = [];
  const renderer = await ReactThreeTestRenderer.create(
    React.createElement(PlayedWorld, {
      level: readLevel({ name: "Test", rows }),
      start,
      input: { current: input },
      onChange: (stats) => changes.push(stats),
    }),
  );
  return { renderer, stats: () => changes.at(-1)! };
}

it("draws every level square, walled in, with somewhere to start", () => {
  for (const level of readLevels()) {
    const walls = new Set(level.walls.map(({ x, z }) => `${x},${z}`));
    for (let x = 0; x < level.width; x++) {
      assert.ok(walls.has(`${x},0`) && walls.has(`${x},${level.depth - 1}`));
    }
    for (let z = 0; z < level.depth; z++) {
      assert.ok(walls.has(`0,${z}`) && walls.has(`${level.width - 1},${z}`));
    }
    assert.ok(!walls.has(`${level.start.x},${level.start.z}`), level.name);
  }
});

it("kills an imp with two shots before it gets close", async () => {
  const { stats, renderer } = await play(["######", "#P..E#", "######"], {
    move: 0,
    turn: 0,
    fire: true,
  });
  await renderer.advanceFrames(40, 1 / 60);
  assert.deepEqual(stats(), { ...start, ammo: 22, kills: 1, shots: 2 });
});

it("takes wounds from an imp it doesn't shoot", async () => {
  const { stats, renderer } = await play(["######", "#P..E#", "######"], {
    move: 0,
    turn: 0,
    fire: false,
  });
  await renderer.advanceFrames(180, 1 / 60);
  assert.ok(stats().health < 100);
  assert.ok(stats().wounds > 0);
});

it("picks up a medkit only when hurt, and shells always", async () => {
  const { stats, renderer } = await play(["#######", "#PHA..#", "#######"], {
    move: 1,
    turn: 0,
    fire: false,
  });
  await renderer.advanceFrames(60, 1 / 60);
  assert.deepEqual(stats(), { ...start, ammo: 32 });
});
