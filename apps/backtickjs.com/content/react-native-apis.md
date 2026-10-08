```tsx file=react-native-apis/server/Store.tsx

```

`@backtickjs/react-native` and `@backtickjs/react` export every component, API
and hook of React Native and React, with the same names and types. In a
script, splice them with `$`.

## Components, APIs and hooks

- **Components are tags:** `<$View>`, `<$Pressable>`, `<$ScrollView>`.
- **Members are tags too:** `<$Animated.View>` reads `View` off `Animated`.
- **APIs are values:** `$Platform.OS`, `$Linking.openURL(…)`,
  `$StyleSheet.create(…)`.
- **Hooks are called in client components,** as in any React component:
  `$useState`, `$useEffect`, `$useRef`, `$useWindowDimensions`.

The phone runs them with the React Native your app ships, so a screen uses the
same version as the rest of your app.

## Hooks belong to client components

A hook keeps state for one instance of a component, so it's called in a client
component, `` cs`(props) => …` ``, never on your server, and never in a block
or an expression read outside a component. [Server
components](/docs/server-components#state-belongs-on-the-phone) shows the
error for one called on your server.

## The platform is the phone's

`$Platform.OS` and `$useWindowDimensions()` run on the phone, so they describe
the device the screen is drawn on. A server component can't know them; ask in
a client component, as `StoreCard` does.
