// `react-native-fbsdk-next`, name for name, in alphabetical order: a value where it both
// exports and declares it, with the instance type of each class it names; a
// type for everything else it declares.
import type { Client } from "@backtickjs/core";
import type * as Fbsdk from "react-native-fbsdk-next";
import { fbsdk } from "./imports.js";

export const AEMReporterIOS: Client<typeof Fbsdk.AEMReporterIOS> =
  fbsdk("AEMReporterIOS");
export const AccessToken: Client<typeof Fbsdk.AccessToken> =
  fbsdk("AccessToken");
export type AccessToken = Fbsdk.AccessToken;
export const AppEventsLogger: Client<typeof Fbsdk.AppEventsLogger> =
  fbsdk("AppEventsLogger");
export const AppLink: Client<typeof Fbsdk.AppLink> = fbsdk("AppLink");
export const AuthenticationToken: Client<typeof Fbsdk.AuthenticationToken> =
  fbsdk("AuthenticationToken");
export type AuthenticationToken = Fbsdk.AuthenticationToken;
export const GameRequestDialog: Client<typeof Fbsdk.GameRequestDialog> =
  fbsdk("GameRequestDialog");
export const GraphRequest: Client<typeof Fbsdk.GraphRequest> =
  fbsdk("GraphRequest");
export type GraphRequest = Fbsdk.GraphRequest;
export const GraphRequestManager: Client<typeof Fbsdk.GraphRequestManager> =
  fbsdk("GraphRequestManager");
export type GraphRequestManager = Fbsdk.GraphRequestManager;
export const LoginButton: Client<typeof Fbsdk.LoginButton> =
  fbsdk("LoginButton");
export type LoginButton = Fbsdk.LoginButton;
export const LoginManager: Client<typeof Fbsdk.LoginManager> =
  fbsdk("LoginManager");
export const MessageDialog: Client<typeof Fbsdk.MessageDialog> =
  fbsdk("MessageDialog");
export const Profile: Client<typeof Fbsdk.Profile> = fbsdk("Profile");
export type Profile = Fbsdk.Profile;
export const SendButton: Client<typeof Fbsdk.SendButton> = fbsdk("SendButton");
export type SendButton = Fbsdk.SendButton;
export const Settings: Client<typeof Fbsdk.Settings> = fbsdk("Settings");
export const ShareButton: Client<typeof Fbsdk.ShareButton> =
  fbsdk("ShareButton");
export type ShareButton = Fbsdk.ShareButton;
export const ShareDialog: Client<typeof Fbsdk.ShareDialog> =
  fbsdk("ShareDialog");

export type {
  AccessTokenMap,
  AppEvent,
  AppEventParam,
  AppEventsFlushBehavior,
  AuthenticationTokenMap,
  DefaultAudience,
  Event,
  GameRequestDialogResult,
  GraphRequestCallback,
  GraphRequestConfig,
  GraphRequestParameters,
  LoginBehavior,
  LoginBehaviorAndroid,
  LoginBehaviorIOS,
  LoginResult,
  LoginTracking,
  MessageDialogResult,
  Params,
  ProductAvailability,
  ProductCondition,
  ProfileMap,
  RNFBSDKCallback,
  ShareContent,
  ShareContentCommonParameters,
  ShareDialogMode,
  ShareDialogModeAndroid,
  ShareDialogModeIOS,
  ShareDialogResult,
  ShareLinkContent,
  SharePhotoContent,
  ShareVideoContent,
  TooltipBehaviorIOS,
  UserData,
} from "react-native-fbsdk-next";
