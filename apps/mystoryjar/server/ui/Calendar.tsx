import { cs } from "@backtickjs/core";
import { useState } from "@backtickjs/react";
import { Modal, Pressable, View } from "@backtickjs/react-native";
import { Button } from "./Button.js";
import { icons } from "./icons.js";
import { RoundButton } from "./RoundButton.js";
import { Text } from "./Text.js";
import { useColors } from "./theme.js";

// A day, "2026-10-12", and back, in the phone's own time zone.
export const dayOf = cs`(date: Date) =>
  date.getFullYear() +
  "-" +
  String(date.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(date.getDate()).padStart(2, "0")`;

export const dateOf = cs`(day: string) => {
  const [year, month, date] = day.split("-").map(Number);
  return new Date(year!, month! - 1, date!);
}`;

export type CalendarProps = {
  day: string;
  onDay: (day: string) => void;
  onDone: () => void;
};

// The website's calendar, in a card over the page: a month at a time, today
// and earlier, a tap picking a day.
export const Calendar = cs`(props: CalendarProps) => {
  const colors = $useColors();
  const today = $dayOf(new Date());
  const [month, setMonth] = $useState(() => {
    const date = $dateOf(props.day);
    return new Date(date.getFullYear(), date.getMonth(), 1);
  });
  const first = month.getDay();
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells = [
    ...Array.from({ length: first }, () => null),
    ...Array.from({ length: days }, (_, index) =>
      $dayOf(new Date(month.getFullYear(), month.getMonth(), index + 1)),
    ),
  ];
  const next = new Date(month.getFullYear(), month.getMonth() + 1, 1);
  return (
    <$Modal
      transparent
      animationType="fade"
      visible
      onRequestClose={props.onDone}
    >
      <$Pressable
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 16,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
        onPress={props.onDone}
      >
        <$Pressable
          style={{
            alignSelf: "center",
            width: "100%",
            maxWidth: 340,
            padding: 12,
            gap: 8,
            borderRadius: 20,
            backgroundColor: colors.surface,
            boxShadow: colors.largeShadow,
          }}
        >
          <$View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <$RoundButton
              flat
              icon={${icons["arrow-left"]}}
              accessibilityLabel="Previous"
              onPress={() =>
                setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))
              }
            />
            <$Text bold size={16}>
              {month.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </$Text>
            <$RoundButton
              flat
              icon={${icons["arrow-right"]}}
              accessibilityLabel="Next"
              disabled={$dayOf(next) > today}
              onPress={() => setMonth(next)}
            />
          </$View>
          <$View style={{ flexDirection: "row" }}>
            {["S", "M", "T", "W", "T", "F", "S"].map((name, index) => (
              <$View
                key={index}
                style={{ width: "14.285%", alignItems: "center" }}
              >
                <$Text size={12} color="tertiaryText">
                  {name}
                </$Text>
              </$View>
            ))}
          </$View>
          <$View style={{ flexDirection: "row", flexWrap: "wrap", rowGap: 4 }}>
            {cells.map((day, index) => (
              <$View
                key={index}
                style={{ width: "14.285%", alignItems: "center" }}
              >
                {day !== null && (
                  <$Pressable
                    accessibilityRole="button"
                    accessibilityLabel={day}
                    accessibilityState={{
                      selected: day === props.day,
                      disabled: day > today,
                    }}
                    disabled={day > today}
                    onPress={() => props.onDay(day)}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor:
                        day === props.day
                          ? colors.primaryButton
                          : "transparent",
                    }}
                  >
                    <$Text
                      color={
                        day === props.day
                          ? "primaryButtonText"
                          : day > today
                            ? "disabledText"
                            : "regularButtonText"
                      }
                    >
                      {Number(day.slice(8))}
                    </$Text>
                  </$Pressable>
                )}
              </$View>
            ))}
          </$View>
          <$View
            style={{ flexDirection: "row", justifyContent: "flex-end", gap: 8 }}
          >
            <$Button
              label="Today"
              flat
              disabled={props.day === today}
              onPress={() => {
                props.onDay(today);
                const now = new Date();
                setMonth(new Date(now.getFullYear(), now.getMonth(), 1));
              }}
            />
            <$Button label="Done" primary flat onPress={props.onDone} />
          </$View>
        </$Pressable>
      </$Pressable>
    </$Modal>
  );
}`;
