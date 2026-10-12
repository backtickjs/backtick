import { cs } from "@backtickjs/core";
import { useEffect, useRef, useState } from "@backtickjs/react";
import { useFrame } from "@backtickjs/react-three-fiber/native";
import type {
  Group,
  Mesh,
  MeshLambertMaterial,
  PointLight,
} from "@backtickjs/three";
import type { Level } from "./levels.js";

/** What the controls hold down: -1, 0 or 1 to move and turn. */
export type Input = { move: number; turn: number; fire: boolean };

export type Stats = {
  health: number;
  ammo: number;
  kills: number;
  /** Counts that only go up, so the screen can flash on each. */
  shots: number;
  wounds: number;
};

type Imp = {
  x: number;
  z: number;
  hp: number;
  awake: boolean;
  cooldown: number;
  hurt: number;
  dying: number;
};

// What Hermes, React Native's engine, reports of its heap. On the web, Chrome
// reports its own, without its collections.
type Hermes = { getInstrumentedStats?: () => Record<string, number> };

export type WorldProps = {
  level: Level;
  start: Stats;
  input: { current: Input };
  onChange: (stats: Stats) => void;
};

// A client component, drawn inside R3F's `<Canvas>`: the level in 3D, and the
// game loop, which runs on the phone at every frame.
export const World = cs`(props: WorldProps) => {
  const { level, input, onChange } = props;
  const [game] = $useState(() => ({
    player: { ...level.start, angle: level.facing },
    stats: { ...props.start },
    reload: 0,
    flash: 0,
    imps: level.imps.map(
      ({ x, z }): Imp => ({
        x,
        z,
        hp: 2,
        awake: false,
        cooldown: 0,
        hurt: 0,
        dying: 0,
      }),
    ),
    pickups: [
      ...level.medkits.map(({ x, z }) => ({
        kind: "medkit",
        x,
        z,
        taken: false,
      })),
      ...level.shells.map(({ x, z }) => ({
        kind: "shells",
        x,
        z,
        taken: false,
      })),
    ],
  }));
  const imps = $useRef<(Group | null)[]>([]);
  const bodies = $useRef<(Mesh | null)[]>([]);
  const pickups = $useRef<(Group | null)[]>([]);
  const lamp = $useRef<PointLight>(null);

  const [walls] = $useState(
    () => new Set(level.walls.map(({ x, z }) => x + "," + z)),
  );
  const isWall = (x: number, z: number) =>
    walls.has(Math.round(x) + "," + Math.round(z));
  const blocked = (x: number, z: number, radius: number) =>
    isWall(x - radius, z - radius) ||
    isWall(x + radius, z - radius) ||
    isWall(x - radius, z + radius) ||
    isWall(x + radius, z + radius);
  const canSee = (ax: number, az: number, bx: number, bz: number) => {
    const steps = Math.ceil(Math.hypot(bx - ax, bz - az) / 0.1);
    for (let i = 1; i < steps; i++) {
      if (isWall(ax + ((bx - ax) * i) / steps, az + ((bz - az) * i) / steps)) {
        return false;
      }
    }
    return true;
  };

  $useEffect(() => {
    onChange({ ...game.stats });
  }, []);

  // Runtime stats, logged every 5 seconds: how fast frames draw, what the
  // GPU is asked to draw, and how the JS heap grows and collects.
  const meter = $useRef({
    mounted: performance.now(),
    drawn: false,
    frames: 0,
    elapsed: 0,
    worst: 0,
    heap: 0,
    collections: 0,
  });
  $useFrame(({ gl }, delta) => {
    const m = meter.current;
    const info = gl.info;
    const hermes = (globalThis as { HermesInternal?: Hermes }).HermesInternal;
    const stats = hermes?.getInstrumentedStats?.();
    const chrome = (performance as { memory?: { usedJSHeapSize: number } })
      .memory;
    const heap = stats?.js_allocatedBytes ?? chrome?.usedJSHeapSize ?? 0;
    const collections = stats?.js_numGCs ?? 0;
    const mb = (bytes: number) => (bytes / 1024 / 1024).toFixed(1) + " MB";
    // This frame's callbacks run before it draws, so the second is the
    // first after a drawn frame.
    if (!m.drawn && m.frames === 1) {
      m.drawn = true;
      console.log(
        "[render] first GL frame " +
          (performance.now() - m.mounted).toFixed(1) +
          " ms after mount: " +
          (info.programs?.length ?? 0) +
          " shader programs, " +
          info.memory.geometries +
          " geometries, " +
          info.render.calls +
          " draw calls",
      );
      Object.assign(m, { frames: 0, elapsed: 0, worst: 0, heap, collections });
    }
    m.frames++;
    m.elapsed += delta;
    m.worst = Math.max(m.worst, delta);
    if (m.elapsed < 5) return;
    console.log(
      "[runtime] " +
        (m.frames / m.elapsed).toFixed(0) +
        " fps, worst frame " +
        (m.worst * 1000).toFixed(1) +
        " ms, " +
        info.render.calls +
        " draw calls, " +
        info.render.triangles +
        " triangles, " +
        (stats || chrome
          ? "heap " +
            mb(heap) +
            " (" +
            (heap >= m.heap ? "+" : "") +
            mb(heap - m.heap) +
            ")"
          : "heap unknown") +
        (stats ? ", " + (collections - m.collections) + " GCs" : ""),
    );
    Object.assign(m, { frames: 0, elapsed: 0, worst: 0, heap, collections });
  });

  $useFrame(({ camera, clock }, delta) => {
    const { player, stats } = game;
    if (stats.health <= 0) return;
    const dt = Math.min(delta, 0.1);
    let changed = false;

    player.angle -= input.current.turn * 2.4 * dt;
    const fx = -Math.sin(player.angle);
    const fz = -Math.cos(player.angle);
    const step = input.current.move * 3.2 * dt;
    if (!blocked(player.x + fx * step, player.z, 0.25)) player.x += fx * step;
    if (!blocked(player.x, player.z + fz * step, 0.25)) player.z += fz * step;
    camera.position.set(player.x, 1, player.z);
    camera.rotation.set(0, player.angle, 0);

    game.reload = Math.max(0, game.reload - dt);
    game.flash = Math.max(0, game.flash - dt);
    if (input.current.fire && game.reload === 0 && stats.ammo > 0) {
      stats.ammo--;
      stats.shots++;
      game.reload = 0.5;
      game.flash = 0.06;
      changed = true;
      // The nearest imp in the line of fire, the spread widening with range.
      let target: Imp | undefined;
      let nearest = Infinity;
      for (const imp of game.imps) {
        const dx = imp.x - player.x;
        const dz = imp.z - player.z;
        const along = dx * fx + dz * fz;
        const across = Math.abs(dx * fz - dz * fx);
        if (
          imp.hp > 0 &&
          along > 0 &&
          along < nearest &&
          across < 0.3 + along * 0.05 &&
          canSee(player.x, player.z, imp.x, imp.z)
        ) {
          target = imp;
          nearest = along;
        }
      }
      if (target) {
        target.hp--;
        target.hurt = 0.12;
        target.awake = true;
        if (target.hp === 0) stats.kills++;
      }
    }
    if (lamp.current) {
      lamp.current.position.set(player.x, 1.2, player.z);
      lamp.current.intensity = game.flash > 0 ? 14 : 5;
    }

    game.imps.forEach((imp, i) => {
      const group = imps.current[i];
      const body = bodies.current[i];
      if (!group || !body) return;
      if (imp.hp <= 0) {
        imp.dying += dt;
        group.scale.y = 1 - 0.85 * Math.min(imp.dying * 4, 1);
        (body.material as MeshLambertMaterial).color.set("#5a1408");
        return;
      }
      const dx = player.x - imp.x;
      const dz = player.z - imp.z;
      const distance = Math.hypot(dx, dz);
      imp.cooldown = Math.max(0, imp.cooldown - dt);
      imp.hurt = Math.max(0, imp.hurt - dt);
      if (distance < 9 && canSee(imp.x, imp.z, player.x, player.z)) {
        imp.awake = true;
      }
      if (imp.awake && distance > 0.9) {
        const speed = (1.4 * dt) / distance;
        if (!blocked(imp.x + dx * speed, imp.z, 0.3)) imp.x += dx * speed;
        if (!blocked(imp.x, imp.z + dz * speed, 0.3)) imp.z += dz * speed;
      } else if (imp.awake && imp.cooldown === 0) {
        stats.health = Math.max(0, stats.health - 10);
        stats.wounds++;
        imp.cooldown = 0.9;
        changed = true;
      }
      const bob = imp.awake ? Math.abs(Math.sin(clock.elapsedTime * 9 + i)) : 0;
      group.position.set(imp.x, bob * 0.06, imp.z);
      group.rotation.y = Math.atan2(dx, dz);
      (body.material as MeshLambertMaterial).color.set(
        imp.hurt > 0 ? "#ffffff" : "#9c3018",
      );
    });

    game.pickups.forEach((pickup, i) => {
      const group = pickups.current[i];
      if (!group || pickup.taken) return;
      group.rotation.y += dt * 2;
      if (Math.hypot(player.x - pickup.x, player.z - pickup.z) > 0.6) return;
      if (pickup.kind === "medkit" && stats.health < 100) {
        stats.health = Math.min(100, stats.health + 25);
      } else if (pickup.kind === "shells") {
        stats.ammo += 8;
      } else {
        return;
      }
      pickup.taken = true;
      group.visible = false;
      changed = true;
    });

    if (changed) onChange({ ...stats });
  });

  const centerX = (level.width - 1) / 2;
  const centerZ = (level.depth - 1) / 2;
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 2, 13]} />
      <ambientLight intensity={0.35} />
      <pointLight ref={lamp} distance={11} decay={1.2} />

      <mesh position={[centerX, 0, centerZ]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[level.width, level.depth]} />
        <meshLambertMaterial color="#3b3328" />
      </mesh>
      <mesh position={[centerX, 2, centerZ]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[level.width, level.depth]} />
        <meshLambertMaterial color="#1c1c22" />
      </mesh>

      {level.walls.map(({ x, z }) => (
        <mesh key={x + "," + z} position={[x, 1, z]}>
          <boxGeometry args={[1, 2, 1]} />
          <meshLambertMaterial color={(x + z) % 2 ? "#6d6656" : "#5f584a"} />
        </mesh>
      ))}

      {level.imps.map((_, i) => (
        <group
          key={i}
          ref={(group) => {
            imps.current[i] = group;
          }}
        >
          <mesh
            position={[0, 0.5, 0]}
            ref={(mesh) => {
              bodies.current[i] = mesh;
            }}
          >
            <boxGeometry args={[0.55, 0.8, 0.35]} />
            <meshLambertMaterial color="#9c3018" />
          </mesh>
          <mesh position={[0, 1.08, 0]}>
            <sphereGeometry args={[0.22, 12, 8]} />
            <meshLambertMaterial color="#7a2412" />
          </mesh>
          <mesh position={[-0.12, 1.3, 0]} rotation={[0, 0, 0.5]}>
            <coneGeometry args={[0.05, 0.18, 6]} />
            <meshLambertMaterial color="#d8c8a0" />
          </mesh>
          <mesh position={[0.12, 1.3, 0]} rotation={[0, 0, -0.5]}>
            <coneGeometry args={[0.05, 0.18, 6]} />
            <meshLambertMaterial color="#d8c8a0" />
          </mesh>
          <mesh position={[-0.08, 1.12, 0.19]}>
            <sphereGeometry args={[0.04, 8, 6]} />
            <meshBasicMaterial color="#ffd23f" />
          </mesh>
          <mesh position={[0.08, 1.12, 0.19]}>
            <sphereGeometry args={[0.04, 8, 6]} />
            <meshBasicMaterial color="#ffd23f" />
          </mesh>
        </group>
      ))}

      {game.pickups.map((pickup, i) => (
        <group
          key={pickup.kind + i}
          position={[pickup.x, 0.25, pickup.z]}
          ref={(group) => {
            pickups.current[i] = group;
          }}
        >
          {pickup.kind === "medkit" ? (
            <>
              <mesh>
                <boxGeometry args={[0.4, 0.3, 0.4]} />
                <meshLambertMaterial color="#e8e8e8" />
              </mesh>
              <mesh position={[0, 0.16, 0]}>
                <boxGeometry args={[0.28, 0.02, 0.08]} />
                <meshBasicMaterial color="#d01010" />
              </mesh>
              <mesh position={[0, 0.16, 0]}>
                <boxGeometry args={[0.08, 0.02, 0.28]} />
                <meshBasicMaterial color="#d01010" />
              </mesh>
            </>
          ) : (
            <mesh>
              <boxGeometry args={[0.4, 0.25, 0.25]} />
              <meshLambertMaterial color="#c89b2a" />
            </mesh>
          )}
        </group>
      ))}
    </>
  );
}`;
