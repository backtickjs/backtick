import {
  Image,
  type ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useInk } from "./screens";

// A launch screen, as an installed web app gets.
export function SplashView({
  paper,
  name,
  icon,
}: {
  paper: string;
  name?: string;
  icon?: ImageSourcePropType;
}) {
  const ink = useInk();
  return (
    <View style={[styles.splash, { backgroundColor: paper }]}>
      {icon === undefined ? null : <Image source={icon} style={styles.icon} />}
      {name === undefined ? null : (
        <Text style={[styles.name, { color: ink }]}>{name}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  icon: { width: 96, height: 96, borderRadius: 22 },
  name: { fontSize: 20, fontWeight: "600" },
});
