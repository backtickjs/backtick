// `react-native`, name for name, in alphabetical order: a value where
// React Native both exports and declares it, a type for everything else it
// declares.
import type { Client } from "@backtickjs/core";
import type * as ReactNative from "react-native";
import { reactNative } from "./imports.js";

export const AccessibilityInfo: Client<typeof ReactNative.AccessibilityInfo> =
  reactNative("AccessibilityInfo");
export const ActionSheetIOS: Client<typeof ReactNative.ActionSheetIOS> =
  reactNative("ActionSheetIOS");
export const ActivityIndicator: Client<typeof ReactNative.ActivityIndicator> =
  reactNative("ActivityIndicator");
export const Alert: Client<typeof ReactNative.Alert> = reactNative("Alert");
export const Animated: Client<typeof ReactNative.Animated> =
  reactNative("Animated");
export const AppRegistry: Client<typeof ReactNative.AppRegistry> =
  reactNative("AppRegistry");
export const AppState: Client<typeof ReactNative.AppState> =
  reactNative("AppState");
export const Appearance: Client<typeof ReactNative.Appearance> =
  reactNative("Appearance");
export const BackHandler: Client<typeof ReactNative.BackHandler> =
  reactNative("BackHandler");
export const Button: Client<typeof ReactNative.Button> = reactNative("Button");
export const Clipboard: Client<typeof ReactNative.Clipboard> =
  reactNative("Clipboard");
export const DevMenu: Client<typeof ReactNative.DevMenu> =
  reactNative("DevMenu");
export const DevSettings: Client<typeof ReactNative.DevSettings> =
  reactNative("DevSettings");
export const DeviceEventEmitter: Client<typeof ReactNative.DeviceEventEmitter> =
  reactNative("DeviceEventEmitter");
export const Dimensions: Client<typeof ReactNative.Dimensions> =
  reactNative("Dimensions");
export const DrawerLayoutAndroid: Client<
  typeof ReactNative.DrawerLayoutAndroid
> = reactNative("DrawerLayoutAndroid");
export const DynamicColorIOS: Client<typeof ReactNative.DynamicColorIOS> =
  reactNative("DynamicColorIOS");
export const Easing: Client<typeof ReactNative.Easing> = reactNative("Easing");
export const FlatList: Client<typeof ReactNative.FlatList> =
  reactNative("FlatList");
export const I18nManager: Client<typeof ReactNative.I18nManager> =
  reactNative("I18nManager");
export const Image: Client<typeof ReactNative.Image> = reactNative("Image");
export const ImageBackground: Client<typeof ReactNative.ImageBackground> =
  reactNative("ImageBackground");
export const InputAccessoryView: Client<typeof ReactNative.InputAccessoryView> =
  reactNative("InputAccessoryView");
export const InteractionManager: Client<typeof ReactNative.InteractionManager> =
  reactNative("InteractionManager");
export const Keyboard: Client<typeof ReactNative.Keyboard> =
  reactNative("Keyboard");
export const KeyboardAvoidingView: Client<
  typeof ReactNative.KeyboardAvoidingView
> = reactNative("KeyboardAvoidingView");
export const LayoutAnimation: Client<typeof ReactNative.LayoutAnimation> =
  reactNative("LayoutAnimation");
export const Linking: Client<typeof ReactNative.Linking> =
  reactNative("Linking");
export const LogBox: Client<typeof ReactNative.LogBox> = reactNative("LogBox");
export const Modal: Client<typeof ReactNative.Modal> = reactNative("Modal");
export const NativeAppEventEmitter: Client<
  typeof ReactNative.NativeAppEventEmitter
> = reactNative("NativeAppEventEmitter");
export const NativeComponentRegistry: Client<
  typeof ReactNative.NativeComponentRegistry
> = reactNative("NativeComponentRegistry");
export const NativeEventEmitter: Client<typeof ReactNative.NativeEventEmitter> =
  reactNative("NativeEventEmitter");
export const NativeModules: Client<typeof ReactNative.NativeModules> =
  reactNative("NativeModules");
export const PanResponder: Client<typeof ReactNative.PanResponder> =
  reactNative("PanResponder");
export const PermissionsAndroid: Client<typeof ReactNative.PermissionsAndroid> =
  reactNative("PermissionsAndroid");
export const PixelRatio: Client<typeof ReactNative.PixelRatio> =
  reactNative("PixelRatio");
export const Platform: Client<typeof ReactNative.Platform> =
  reactNative("Platform");
export const PlatformColor: Client<typeof ReactNative.PlatformColor> =
  reactNative("PlatformColor");
export const Pressable: Client<typeof ReactNative.Pressable> =
  reactNative("Pressable");
export const ProgressBarAndroid: Client<typeof ReactNative.ProgressBarAndroid> =
  reactNative("ProgressBarAndroid");
export const PushNotificationIOS: Client<
  typeof ReactNative.PushNotificationIOS
> = reactNative("PushNotificationIOS");
export const RefreshControl: Client<typeof ReactNative.RefreshControl> =
  reactNative("RefreshControl");
export const RootTagContext: Client<typeof ReactNative.RootTagContext> =
  reactNative("RootTagContext");
export const SafeAreaView: Client<typeof ReactNative.SafeAreaView> =
  reactNative("SafeAreaView");
export const ScrollView: Client<typeof ReactNative.ScrollView> =
  reactNative("ScrollView");
export const SectionList: Client<typeof ReactNative.SectionList> =
  reactNative("SectionList");
export const Settings: Client<typeof ReactNative.Settings> =
  reactNative("Settings");
export const Share: Client<typeof ReactNative.Share> = reactNative("Share");
export const StatusBar: Client<typeof ReactNative.StatusBar> =
  reactNative("StatusBar");
export const StyleSheet: Client<typeof ReactNative.StyleSheet> =
  reactNative("StyleSheet");
export const Switch: Client<typeof ReactNative.Switch> = reactNative("Switch");
export const Systrace: Client<typeof ReactNative.Systrace> =
  reactNative("Systrace");
export const Text: Client<typeof ReactNative.Text> = reactNative("Text");
export const TextInput: Client<typeof ReactNative.TextInput> =
  reactNative("TextInput");
export const ToastAndroid: Client<typeof ReactNative.ToastAndroid> =
  reactNative("ToastAndroid");
export const Touchable: Client<typeof ReactNative.Touchable> =
  reactNative("Touchable");
export const TouchableHighlight: Client<typeof ReactNative.TouchableHighlight> =
  reactNative("TouchableHighlight");
export const TouchableNativeFeedback: Client<
  typeof ReactNative.TouchableNativeFeedback
> = reactNative("TouchableNativeFeedback");
export const TouchableOpacity: Client<typeof ReactNative.TouchableOpacity> =
  reactNative("TouchableOpacity");
export const TouchableWithoutFeedback: Client<
  typeof ReactNative.TouchableWithoutFeedback
> = reactNative("TouchableWithoutFeedback");
export const TurboModuleRegistry: Client<
  typeof ReactNative.TurboModuleRegistry
> = reactNative("TurboModuleRegistry");
export const UIManager: Client<typeof ReactNative.UIManager> =
  reactNative("UIManager");
export const Vibration: Client<typeof ReactNative.Vibration> =
  reactNative("Vibration");
export const View: Client<typeof ReactNative.View> = reactNative("View");
export const VirtualizedList: Client<typeof ReactNative.VirtualizedList> =
  reactNative("VirtualizedList");
export const codegenNativeCommands: Client<
  typeof ReactNative.codegenNativeCommands
> = reactNative("codegenNativeCommands");
export const codegenNativeComponent: Client<
  typeof ReactNative.codegenNativeComponent
> = reactNative("codegenNativeComponent");
export const experimental_LayoutConformance: Client<
  typeof ReactNative.experimental_LayoutConformance
> = reactNative("experimental_LayoutConformance");
export const findNodeHandle: Client<typeof ReactNative.findNodeHandle> =
  reactNative("findNodeHandle");
export const processColor: Client<typeof ReactNative.processColor> =
  reactNative("processColor");
export const registerCallableModule: Client<
  typeof ReactNative.registerCallableModule
> = reactNative("registerCallableModule");
export const requireNativeComponent: Client<
  typeof ReactNative.requireNativeComponent
> = reactNative("requireNativeComponent");
export const unstable_TextAncestorContext: Client<
  typeof ReactNative.unstable_TextAncestorContext
> = reactNative("unstable_TextAncestorContext");
export const unstable_batchedUpdates: Client<
  typeof ReactNative.unstable_batchedUpdates
> = reactNative("unstable_batchedUpdates");
export const useAnimatedColor: Client<typeof ReactNative.useAnimatedColor> =
  reactNative("useAnimatedColor");
export const useAnimatedValue: Client<typeof ReactNative.useAnimatedValue> =
  reactNative("useAnimatedValue");
export const useAnimatedValueXY: Client<typeof ReactNative.useAnimatedValueXY> =
  reactNative("useAnimatedValueXY");
export const useColorScheme: Client<typeof ReactNative.useColorScheme> =
  reactNative("useColorScheme");
export const useWindowDimensions: Client<
  typeof ReactNative.useWindowDimensions
> = reactNative("useWindowDimensions");
export type {
  AccessibilityActionEvent,
  AccessibilityActionInfo,
  AccessibilityActionName,
  AccessibilityAnnouncementEventName,
  AccessibilityAnnouncementFinishedEvent,
  AccessibilityAnnouncementFinishedEventHandler,
  AccessibilityChangeEvent,
  AccessibilityChangeEventHandler,
  AccessibilityChangeEventName,
  AccessibilityEventTypes,
  AccessibilityInfoStatic,
  AccessibilityProperties,
  AccessibilityPropertiesAndroid,
  AccessibilityPropertiesIOS,
  AccessibilityProps,
  AccessibilityPropsAndroid,
  AccessibilityPropsIOS,
  AccessibilityRole,
  AccessibilityState,
  AccessibilityValue,
  ActionSheetIOSOptions,
  ActionSheetIOSStatic,
  ActivityIndicatorBase,
  ActivityIndicatorComponent,
  ActivityIndicatorIOSProperties,
  ActivityIndicatorIOSProps,
  ActivityIndicatorProperties,
  ActivityIndicatorProps,
  AlertButton,
  AlertOptions,
  AlertStatic,
  AlertType,
  AnimatableNumericValue,
  AnimatableStringValue,
  AppConfig,
  AppStateEvent,
  AppStateStatic,
  AppStateStatus,
  ArrayLike,
  BackHandlerStatic,
  BackPressEventName,
  BackgroundImageValue,
  BackgroundPositionValue,
  BackgroundPropType,
  BackgroundRepeatKeyword,
  BackgroundRepeatValue,
  BackgroundSizeValue,
  BaseBackgroundPropType,
  BlendMode,
  BlurEvent,
  BoxShadowValue,
  ButtonProperties,
  ButtonProps,
  CellRendererProps,
  ClipboardStatic,
  CodegenTypes,
  ColorSchemeName,
  ColorValue,
  ComponentProvider,
  ComponentProviderInstrumentationHook,
  CursorValue,
  DataDetectorTypes,
  DefaultSectionT,
  DevMenuStatic,
  DevSettingsStatic,
  DeviceEventEmitterStatic,
  DimensionValue,
  DocumentSelectionState,
  DrawerLayoutAndroidBase,
  DrawerLayoutAndroidComponent,
  DrawerLayoutAndroidProperties,
  DrawerLayoutAndroidProps,
  DrawerPosition,
  DrawerSlideEvent,
  DropShadowValue,
  DynamicColorIOSTuple,
  EasingFunction,
  EasingStatic,
  EmitterSubscription,
  EnterKeyHintType,
  EnterKeyHintTypeAndroid,
  EnterKeyHintTypeIOS,
  EnterKeyHintTypeOptions,
  ErrorHandlerCallback,
  ErrorUtils,
  EventSubscription,
  Falsy,
  FetchResult,
  FilterFunction,
  FlatListComponent,
  FlatListProperties,
  FlatListProps,
  FlexAlignType,
  FlexStyle,
  FocusEvent,
  FontVariant,
  GestureResponderEvent,
  GestureResponderHandlers,
  GradientValue,
  HTMLCollection,
  Handle,
  HardwareBackPressEvent,
  HostComponent,
  HostInstance,
  I18nManagerStatic,
  ImageBackgroundBase,
  ImageBackgroundComponent,
  ImageBackgroundProperties,
  ImageBackgroundProps,
  ImageBase,
  ImageComponent,
  ImageErrorEvent,
  ImageErrorEventData,
  ImageLoadEvent,
  ImageLoadEventData,
  ImageProgressEventDataIOS,
  ImageProgressEventIOS,
  ImageProperties,
  ImagePropertiesAndroid,
  ImagePropertiesIOS,
  ImagePropertiesSourceOptions,
  ImageProps,
  ImagePropsAndroid,
  ImagePropsBase,
  ImagePropsIOS,
  ImageRequireSource,
  ImageResizeMode,
  ImageResizeModeStatic,
  ImageResolvedAssetSource,
  ImageSize,
  ImageSource,
  ImageSourcePropType,
  ImageStyle,
  ImageURISource,
  InputAccessoryViewProperties,
  InputAccessoryViewProps,
  InputModeOptions,
  Insets,
  InteractionManagerStatic,
  KeyboardAvoidingViewBase,
  KeyboardAvoidingViewComponent,
  KeyboardAvoidingViewProps,
  KeyboardEvent,
  KeyboardEventEasing,
  KeyboardEventIOS,
  KeyboardEventListener,
  KeyboardEventName,
  KeyboardMetrics,
  KeyboardStatic,
  KeyboardType,
  KeyboardTypeAndroid,
  KeyboardTypeIOS,
  KeyboardTypeOptions,
  LayoutAnimationAnim,
  LayoutAnimationConfig,
  LayoutAnimationProperties,
  LayoutAnimationProperty,
  LayoutAnimationStatic,
  LayoutAnimationType,
  LayoutAnimationTypes,
  LayoutChangeEvent,
  LayoutConformanceProps,
  LayoutRectangle,
  LinearGradientValue,
  LinkingImpl,
  ListRenderItem,
  ListRenderItemInfo,
  LogBoxStatic,
  MatrixTransform,
  MaximumOneOf,
  MeasureInWindowOnSuccessCallback,
  MeasureLayoutOnSuccessCallback,
  MeasureOnSuccessCallback,
  ModalBaseProps,
  ModalProperties,
  ModalProps,
  ModalPropsAndroid,
  ModalPropsIOS,
  Module,
  MouseEvent,
  NativeEventSubscription,
  NativeMethods,
  NativeMethodsMixin,
  NativeMethodsMixinType,
  NativeModule,
  NativeModulesStatic,
  NativeMouseEvent,
  NativePointerEvent,
  NativeScrollEvent,
  NativeScrollPoint,
  NativeScrollRectangle,
  NativeScrollSize,
  NativeScrollVelocity,
  NativeSyntheticEvent,
  NativeTouchEvent,
  NativeUIEvent,
  NodeHandle,
  NodeList,
  OpaqueColorValue,
  PanResponderCallbacks,
  PanResponderGestureState,
  PanResponderInstance,
  PanResponderStatic,
  Permission,
  PermissionStatus,
  PermissionsAndroidStatic,
  PerspectiveTransform,
  PixelRatioStatic,
  PlatformAndroidStatic,
  PlatformConstants,
  PlatformIOSStatic,
  PlatformMacOSStatic,
  PlatformOSType,
  PlatformStatic,
  PlatformWebStatic,
  PlatformWindowsOSStatic,
  PointProp,
  PointerEvent,
  PointerEvents,
  PresentLocalNotificationDetails,
  PressableAndroidRippleConfig,
  PressableProps,
  PressableStateCallbackType,
  ProcessedColorValue,
  ProgressBarAndroidBase,
  ProgressBarAndroidComponent,
  ProgressBarAndroidProperties,
  ProgressBarAndroidProps,
  PromiseTask,
  PushNotification,
  PushNotificationEventName,
  PushNotificationIOSStatic,
  PushNotificationPermissions,
  RCTNativeAppEventEmitter,
  RadialExtent,
  RadialGradientPosition,
  RadialGradientShape,
  RadialGradientSize,
  RadialGradientValue,
  Rationale,
  ReactNativeDocument,
  ReactNativeElement,
  ReadOnlyCharacterData,
  ReadOnlyElement,
  ReadOnlyNode,
  ReadOnlyText,
  RecursiveArray,
  RefreshControlBase,
  RefreshControlComponent,
  RefreshControlProperties,
  RefreshControlPropertiesAndroid,
  RefreshControlPropertiesIOS,
  RefreshControlProps,
  RefreshControlPropsAndroid,
  RefreshControlPropsIOS,
  RegisterCallableModule,
  ReturnKeyType,
  ReturnKeyTypeAndroid,
  ReturnKeyTypeIOS,
  ReturnKeyTypeOptions,
  RippleBackgroundPropType,
  Role,
  RootTag,
  RootViewStyleProvider,
  RotateTransform,
  RotateXTransform,
  RotateYTransform,
  RotateZTransform,
  Runnable,
  SafeAreaViewBase,
  SafeAreaViewComponent,
  ScaleTransform,
  ScaleXTransform,
  ScaleYTransform,
  ScaledSize,
  ScheduleLocalNotificationDetails,
  ScrollResponderEvent,
  ScrollResponderMixin,
  ScrollViewBase,
  ScrollViewComponent,
  ScrollViewProperties,
  ScrollViewPropertiesAndroid,
  ScrollViewPropertiesIOS,
  ScrollViewProps,
  ScrollViewPropsAndroid,
  ScrollViewPropsIOS,
  SectionBase,
  SectionListComponent,
  SectionListData,
  SectionListProperties,
  SectionListProps,
  SectionListRenderItem,
  SectionListRenderItemInfo,
  SectionListScrollParams,
  SectionListStatic,
  SettingsStatic,
  ShadowStyleIOS,
  ShareAction,
  ShareActionSheetIOSOptions,
  ShareContent,
  ShareOptions,
  ShareStatic,
  SimpleTask,
  SkewXTransform,
  SkewYTransform,
  StatusBarAnimation,
  StatusBarProperties,
  StatusBarPropertiesAndroid,
  StatusBarPropertiesIOS,
  StatusBarProps,
  StatusBarPropsAndroid,
  StatusBarPropsIOS,
  StatusBarStyle,
  StyleProp,
  StyleSheetProperties,
  SubmitBehavior,
  SubscribableMixin,
  SwitchBase,
  SwitchChangeEvent,
  SwitchChangeEventData,
  SwitchComponent,
  SwitchProperties,
  SwitchPropertiesIOS,
  SwitchProps,
  SwitchPropsIOS,
  TVProps,
  TVViewPropsIOS,
  TargetedEvent,
  Task,
  TaskCancelProvider,
  TaskCanceller,
  TaskProvider,
  TextBase,
  TextComponent,
  TextInputAndroidProperties,
  TextInputAndroidProps,
  TextInputBase,
  TextInputChangeEvent,
  TextInputChangeEventData,
  TextInputComponent,
  TextInputContentSizeChangeEvent,
  TextInputContentSizeChangeEventData,
  TextInputEndEditingEvent,
  TextInputEndEditingEventData,
  TextInputFocusEvent,
  TextInputFocusEventData,
  TextInputIOSProperties,
  TextInputIOSProps,
  TextInputKeyPressEvent,
  TextInputKeyPressEventData,
  TextInputProperties,
  TextInputProps,
  TextInputScrollEvent,
  TextInputScrollEventData,
  TextInputSelectionChangeEvent,
  TextInputSelectionChangeEventData,
  TextInputState,
  TextInputSubmitEditingEvent,
  TextInputSubmitEditingEventData,
  TextLayoutEvent,
  TextLayoutEventData,
  TextLayoutLine,
  TextProperties,
  TextPropertiesAndroid,
  TextPropertiesIOS,
  TextProps,
  TextPropsAndroid,
  TextPropsIOS,
  TextStyle,
  TextStyleAndroid,
  TextStyleIOS,
  ThemeAttributeBackgroundPropType,
  ToastAndroidStatic,
  TouchableHighlightProperties,
  TouchableHighlightProps,
  TouchableMixin,
  TouchableNativeFeedbackBase,
  TouchableNativeFeedbackComponent,
  TouchableNativeFeedbackProperties,
  TouchableNativeFeedbackProps,
  TouchableOpacityProperties,
  TouchableOpacityProps,
  TouchableWithoutFeedbackBase,
  TouchableWithoutFeedbackComponent,
  TouchableWithoutFeedbackProperties,
  TouchableWithoutFeedbackProps,
  TouchableWithoutFeedbackPropsAndroid,
  TouchableWithoutFeedbackPropsIOS,
  TransformsStyle,
  TranslateXTransform,
  TranslateYTransform,
  TurboModule,
  UIManagerStatic,
  VibrationStatic,
  ViewBase,
  ViewComponent,
  ViewProperties,
  ViewPropertiesAndroid,
  ViewPropertiesIOS,
  ViewProps,
  ViewPropsAndroid,
  ViewPropsIOS,
  ViewStyle,
  ViewToken,
  ViewabilityConfig,
  ViewabilityConfigCallbackPair,
  ViewabilityConfigCallbackPairs,
  VirtualizedListProperties,
  VirtualizedListProps,
  VirtualizedListWithoutPreConfiguredProps,
  VirtualizedListWithoutRenderItemProps,
  WrapperComponentProvider,
  _Image,
  _ScrollView,
  _Text,
  _View,
} from "react-native";
