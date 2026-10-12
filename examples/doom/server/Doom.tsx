import { cs } from "@backtickjs/core";
import { useEffect, useRef, useState } from "@backtickjs/react";
import { Platform, Pressable, Text, View } from "@backtickjs/react-native";
import { Canvas } from "./fiber.js";
import type { Level } from "./levels.js";
import { World, type Input, type Stats } from "./World.js";

// A button that holds while it's pressed, as a game pad's do.
const HoldButton = cs`(props: {
  label: string;
  size: number;
  onDown: () => void;
  onUp: () => void;
}) => (
  <$Pressable
    onPressIn={props.onDown}
    onPressOut={props.onUp}
    style={({ pressed }) => ({
      width: props.size,
      height: props.size,
      borderRadius: props.size / 2,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: pressed
        ? "rgba(255,255,255,0.4)"
        : "rgba(255,255,255,0.15)",
    })}
  >
    <$Text
      style={{ color: "#fff", fontSize: props.size / 3, fontWeight: "bold" }}
    >
      {props.label}
    </$Text>
  </$Pressable>
)`;

// The shotgun, drawn flat over the scene as Doom drew its sprites.
const Shotgun = cs`(props: { firing: boolean }) => (
  <$View
    pointerEvents="none"
    style={{
      position: "absolute",
      bottom: props.firing ? -12 : 0,
      alignSelf: "center",
      alignItems: "center",
    }}
  >
    {props.firing && (
      <$View
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          marginBottom: -14,
          backgroundColor: "#ffcc33",
          borderWidth: 8,
          borderColor: "#ff7a1a",
        }}
      />
    )}
    <$View style={{ flexDirection: "row", gap: 2 }}>
      <$View style={{ width: 14, height: 70, backgroundColor: "#2c2c30" }} />
      <$View style={{ width: 14, height: 70, backgroundColor: "#3a3a40" }} />
    </$View>
    <$View
      style={{
        width: 64,
        height: 46,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: "#6b4423",
      }}
    />
  </$View>
)`;

// The screen: the 3D world from R3F, and over it the HUD and the controls,
// in React Native views.
export const Doom = cs`(props: { levels: Level[]; start: Stats }) => {
  const [run, setRun] = $useState({ level: 0, attempt: 0 });
  const [stats, setStats] = $useState(props.start);
  const [firing, setFiring] = $useState(false);
  const [hurting, setHurting] = $useState(false);
  const input = $useRef<Input>({ move: 0, turn: 0, fire: false });
  const level = props.levels[run.level]!;
  const dead = stats.health <= 0;
  const cleared = !dead && stats.kills === level.imps.length;
  const last = run.level === props.levels.length - 1;

  $useEffect(() => {
    if (stats.shots === 0) return;
    setFiring(true);
    const timer = setTimeout(() => setFiring(false), 90);
    return () => clearTimeout(timer);
  }, [stats.shots]);
  $useEffect(() => {
    if (stats.wounds === 0) return;
    setHurting(true);
    const timer = setTimeout(() => setHurting(false), 160);
    return () => clearTimeout(timer);
  }, [stats.wounds]);

  const play = (level: number) => {
    input.current = { move: 0, turn: 0, fire: false };
    setStats(props.start);
    setRun(({ attempt }) => ({ level, attempt: attempt + 1 }));
  };
  const hold = (key: "move" | "turn", value: number) => ({
    onDown: () => {
      input.current[key] = value;
    },
    onUp: () => {
      input.current[key] = 0;
    },
  });

  const font = $Platform.OS === "ios" ? "Courier" : "monospace";
  const hud = {
    color: "#d32f1f",
    fontFamily: font,
    fontWeight: "900",
    fontSize: 18,
  } as const;
  const pad = 64;

  return (
    <$View style={{ flex: 1, backgroundColor: "#000" }}>
      <$Canvas
        key={run.attempt}
        style={{ flex: 1 }}
        camera={{ fov: 70, near: 0.05, far: 40 }}
      >
        <$World
          level={level}
          start={props.start}
          input={input}
          onChange={setStats}
        />
      </$Canvas>

      {hurting && (
        <$View
          pointerEvents="none"
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(200,0,0,0.35)",
          }}
        />
      )}
      <$View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          marginLeft: -6,
          marginTop: -6,
        }}
      >
        <$Text style={{ color: "#fff", fontSize: 12, lineHeight: 12 }}>+</$Text>
      </$View>
      <$Shotgun firing={firing} />

      <$View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 16,
          left: 24,
          right: 24,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <$Text style={hud}>{level.name}</$Text>
        <$Text style={hud}>
          HEALTH {stats.health}% AMMO {stats.ammo} KILLS {stats.kills}/
          {level.imps.length}
        </$Text>
      </$View>

      <$View
        style={{
          position: "absolute",
          left: 24,
          bottom: 24,
          width: pad * 3,
          height: pad * 3,
        }}
      >
        <$View style={{ position: "absolute", left: pad, top: 0 }}>
          <$HoldButton label="▲" size={pad} {...hold("move", 1)} />
        </$View>
        <$View style={{ position: "absolute", left: 0, top: pad }}>
          <$HoldButton label="◀" size={pad} {...hold("turn", -1)} />
        </$View>
        <$View style={{ position: "absolute", left: pad * 2, top: pad }}>
          <$HoldButton label="▶" size={pad} {...hold("turn", 1)} />
        </$View>
        <$View style={{ position: "absolute", left: pad, top: pad * 2 }}>
          <$HoldButton label="▼" size={pad} {...hold("move", -1)} />
        </$View>
      </$View>
      <$View style={{ position: "absolute", right: 32, bottom: 40 }}>
        <$HoldButton
          label="FIRE"
          size={110}
          onDown={() => {
            input.current.fire = true;
          }}
          onUp={() => {
            input.current.fire = false;
          }}
        />
      </$View>

      {(dead || cleared) && (
        <$View
          style={{
            position: "absolute",
            inset: 0,
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
        >
          <$Text style={{ ...hud, fontSize: 48 }}>
            {dead ? "YOU DIED" : last ? "YOU WIN" : "LEVEL CLEARED"}
          </$Text>
          <$Pressable
            onPress={() => play(dead ? run.level : last ? 0 : run.level + 1)}
            style={{
              paddingHorizontal: 24,
              paddingVertical: 12,
              backgroundColor: "#d32f1f",
            }}
          >
            <$Text style={{ ...hud, color: "#fff" }}>
              {dead ? "TRY AGAIN" : last ? "PLAY AGAIN" : "NEXT LEVEL"}
            </$Text>
          </$Pressable>
        </$View>
      )}
    </$View>
  );
}`;
