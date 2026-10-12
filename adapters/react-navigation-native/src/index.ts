// `@react-navigation/native`, name for name, in alphabetical order: a value
// where React Navigation both exports and declares it, with the instance type
// of each class it names; a type for everything else it declares.
import type { Client } from "@backtickjs/core";
import type * as Navigation from "@react-navigation/native";
import { navigation } from "./imports.js";

export const BaseNavigationContainer: Client<
  typeof Navigation.BaseNavigationContainer
> = navigation("BaseNavigationContainer");
export const BaseRouter: Client<typeof Navigation.BaseRouter> =
  navigation("BaseRouter");
export const CommonActions: Client<typeof Navigation.CommonActions> =
  navigation("CommonActions");
export const CurrentRenderContext: Client<
  typeof Navigation.CurrentRenderContext
> = navigation("CurrentRenderContext");
export const DarkTheme: Client<typeof Navigation.DarkTheme> =
  navigation("DarkTheme");
export const DefaultTheme: Client<typeof Navigation.DefaultTheme> =
  navigation("DefaultTheme");
export const DrawerActions: Client<typeof Navigation.DrawerActions> =
  navigation("DrawerActions");
export const DrawerRouter: Client<typeof Navigation.DrawerRouter> =
  navigation("DrawerRouter");
export const Link: Client<typeof Navigation.Link> = navigation("Link");
export const LinkingContext: Client<typeof Navigation.LinkingContext> =
  navigation("LinkingContext");
export const LocaleDirContext: Client<typeof Navigation.LocaleDirContext> =
  navigation("LocaleDirContext");
export const NavigationContainer: Client<
  typeof Navigation.NavigationContainer
> = navigation("NavigationContainer");
export const NavigationContainerRefContext: Client<
  typeof Navigation.NavigationContainerRefContext
> = navigation("NavigationContainerRefContext");
export const NavigationContext: Client<typeof Navigation.NavigationContext> =
  navigation("NavigationContext");
export const NavigationHelpersContext: Client<
  typeof Navigation.NavigationHelpersContext
> = navigation("NavigationHelpersContext");
export const NavigationIndependentTree: Client<
  typeof Navigation.NavigationIndependentTree
> = navigation("NavigationIndependentTree");
export const NavigationMetaContext: Client<
  typeof Navigation.NavigationMetaContext
> = navigation("NavigationMetaContext");
export const NavigationProvider: Client<typeof Navigation.NavigationProvider> =
  navigation("NavigationProvider");
export const NavigationRouteContext: Client<
  typeof Navigation.NavigationRouteContext
> = navigation("NavigationRouteContext");
export const PreventRemoveContext: Client<
  typeof Navigation.PreventRemoveContext
> = navigation("PreventRemoveContext");
export const PreventRemoveProvider: Client<
  typeof Navigation.PreventRemoveProvider
> = navigation("PreventRemoveProvider");
export const PrivateValueStore: Client<typeof Navigation.PrivateValueStore> =
  navigation("PrivateValueStore");
export type PrivateValueStore<T extends [any, any, any]> =
  Navigation.PrivateValueStore<T>;
export const ServerContainer: Client<typeof Navigation.ServerContainer> =
  navigation("ServerContainer");
export const StackActions: Client<typeof Navigation.StackActions> =
  navigation("StackActions");
export const StackRouter: Client<typeof Navigation.StackRouter> =
  navigation("StackRouter");
export const TabActions: Client<typeof Navigation.TabActions> =
  navigation("TabActions");
export const TabRouter: Client<typeof Navigation.TabRouter> =
  navigation("TabRouter");
export const ThemeContext: Client<typeof Navigation.ThemeContext> =
  navigation("ThemeContext");
export const ThemeProvider: Client<typeof Navigation.ThemeProvider> =
  navigation("ThemeProvider");
export const UNSTABLE_UnhandledLinkingContext: Client<
  typeof Navigation.UNSTABLE_UnhandledLinkingContext
> = navigation("UNSTABLE_UnhandledLinkingContext");
export const createComponentForStaticNavigation: Client<
  typeof Navigation.createComponentForStaticNavigation
> = navigation("createComponentForStaticNavigation");
export const createNavigationContainerRef: Client<
  typeof Navigation.createNavigationContainerRef
> = navigation("createNavigationContainerRef");
export const createNavigatorFactory: Client<
  typeof Navigation.createNavigatorFactory
> = navigation("createNavigatorFactory");
export const createPathConfigForStaticNavigation: Client<
  typeof Navigation.createPathConfigForStaticNavigation
> = navigation("createPathConfigForStaticNavigation");
export const createScreenFactory: Client<
  typeof Navigation.createScreenFactory
> = navigation("createScreenFactory");
export const createStandardNavigationFactories: Client<
  typeof Navigation.createStandardNavigationFactories
> = navigation("createStandardNavigationFactories");
export const createStaticNavigation: Client<
  typeof Navigation.createStaticNavigation
> = navigation("createStaticNavigation");
export const findFocusedRoute: Client<typeof Navigation.findFocusedRoute> =
  navigation("findFocusedRoute");
export const getActionFromState: Client<typeof Navigation.getActionFromState> =
  navigation("getActionFromState");
export const getFocusedRouteNameFromRoute: Client<
  typeof Navigation.getFocusedRouteNameFromRoute
> = navigation("getFocusedRouteNameFromRoute");
export const getPathFromState: Client<typeof Navigation.getPathFromState> =
  navigation("getPathFromState");
export const getStateFromPath: Client<typeof Navigation.getStateFromPath> =
  navigation("getStateFromPath");
export const useFocusEffect: Client<typeof Navigation.useFocusEffect> =
  navigation("useFocusEffect");
export const useIsFocused: Client<typeof Navigation.useIsFocused> =
  navigation("useIsFocused");
export const useLinkBuilder: Client<typeof Navigation.useLinkBuilder> =
  navigation("useLinkBuilder");
export const useLinkProps: Client<typeof Navigation.useLinkProps> =
  navigation("useLinkProps");
export const useLinkTo: Client<typeof Navigation.useLinkTo> =
  navigation("useLinkTo");
export const useLocale: Client<typeof Navigation.useLocale> =
  navigation("useLocale");
export const useNavigation: Client<typeof Navigation.useNavigation> =
  navigation("useNavigation");
export const useNavigationBuilder: Client<
  typeof Navigation.useNavigationBuilder
> = navigation("useNavigationBuilder");
export const useNavigationContainerRef: Client<
  typeof Navigation.useNavigationContainerRef
> = navigation("useNavigationContainerRef");
export const useNavigationIndependentTree: Client<
  typeof Navigation.useNavigationIndependentTree
> = navigation("useNavigationIndependentTree");
export const useNavigationState: Client<typeof Navigation.useNavigationState> =
  navigation("useNavigationState");
export const usePreventRemove: Client<typeof Navigation.usePreventRemove> =
  navigation("usePreventRemove");
export const usePreventRemoveContext: Client<
  typeof Navigation.usePreventRemoveContext
> = navigation("usePreventRemoveContext");
export const useRoute: Client<typeof Navigation.useRoute> =
  navigation("useRoute");
export const useRoutePath: Client<typeof Navigation.useRoutePath> =
  navigation("useRoutePath");
export const useScrollToTop: Client<typeof Navigation.useScrollToTop> =
  navigation("useScrollToTop");
export const useStateForPath: Client<typeof Navigation.useStateForPath> =
  navigation("useStateForPath");
export const useTheme: Client<typeof Navigation.useTheme> =
  navigation("useTheme");
export const validatePathConfig: Client<typeof Navigation.validatePathConfig> =
  navigation("validatePathConfig");

export type {
  ActionCreators,
  CommonNavigationAction,
  CompositeNavigationProp,
  CompositeScreenProps,
  DefaultNavigatorOptions,
  DefaultRouterOptions,
  Descriptor,
  DocumentTitleOptions,
  DrawerActionHelpers,
  DrawerActionType,
  DrawerNavigationState,
  DrawerRouterOptions,
  DrawerStatus,
  EventArg,
  EventConsumer,
  EventEmitter,
  EventListenerCallback,
  EventMapBase,
  EventMapCore,
  InitialState,
  LinkProps,
  LinkingOptions,
  LocaleDirection,
  NavigationAction,
  NavigationContainerEventMap,
  NavigationContainerProps,
  NavigationContainerRef,
  NavigationContainerRefWithCurrent,
  NavigationHelpers,
  NavigationListBase,
  NavigationProp,
  NavigationRoute,
  NavigationState,
  NavigatorScreenParams,
  NavigatorTypeBag,
  NavigatorTypeBagBase,
  ParamListBase,
  ParamListRoute,
  PartialRoute,
  PartialState,
  PathConfig,
  PathConfigMap,
  RootNavigator,
  Route,
  RouteConfig,
  RouteConfigComponent,
  RouteConfigProps,
  RouteGroupConfig,
  RouteProp,
  Router,
  RouterConfigOptions,
  RouterFactory,
  ScreenLayoutArgs,
  ScreenListeners,
  ServerContainerRef,
  StackActionHelpers,
  StackActionType,
  StackNavigationState,
  StackRouterOptions,
  StandardNavigationCreateNavigator,
  StandardNavigationTypeBagBase,
  StaticConfig,
  StaticConfigGroup,
  StaticConfigScreens,
  StaticNavigation,
  StaticParamList,
  StaticScreenFactory,
  StaticScreenProps,
  TabActionHelpers,
  TabActionType,
  TabNavigationState,
  TabRouterOptions,
  Theme,
  TypeBag,
  TypedNavigator,
} from "@react-navigation/native";
