import type { useNavigationContainerRef } from "expo-router";

type Root = ReturnType<typeof useNavigationContainerRef>;
type State = {
  key: string;
  routes: { key: string; name: string; state?: State }[];
};

let root: Root;

export function setRoot(ref: Root): void {
  root = ref;
}

// One thing open at a time: the stack becomes the home and the link's route,
// new each time, so what's open closes with its navigator and the next is its
// own.
export function openOverHome(route: { name: string; params: object }): void {
  let state = root.getRootState() as unknown as State;
  while (state.routes[0]!.name === "__root") {
    state = state.routes[0]!.state!;
  }
  root.dispatch({
    type: "RESET",
    target: state.key,
    payload: {
      ...state,
      index: 1,
      routes: [
        state.routes[0],
        { ...route, key: `${route.name}:${Date.now()}` },
      ],
    },
  });
}
