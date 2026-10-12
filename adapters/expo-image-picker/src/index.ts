// `expo-image-picker`, name for name, in alphabetical order: a value where it
// both exports and declares it, with the instance type of each class it names;
// a type for everything else it declares.
import type { Client } from "@backtickjs/core";
import type * as ImagePicker from "expo-image-picker";
import { imagePicker } from "./imports.js";

export const CameraType: Client<typeof ImagePicker.CameraType> =
  imagePicker("CameraType");
export const MediaTypeOptions: Client<typeof ImagePicker.MediaTypeOptions> =
  imagePicker("MediaTypeOptions");
export const PermissionStatus: Client<typeof ImagePicker.PermissionStatus> =
  imagePicker("PermissionStatus");
export const UIImagePickerControllerQualityType: Client<
  typeof ImagePicker.UIImagePickerControllerQualityType
> = imagePicker("UIImagePickerControllerQualityType");
export const UIImagePickerPreferredAssetRepresentationMode: Client<
  typeof ImagePicker.UIImagePickerPreferredAssetRepresentationMode
> = imagePicker("UIImagePickerPreferredAssetRepresentationMode");
export const UIImagePickerPresentationStyle: Client<
  typeof ImagePicker.UIImagePickerPresentationStyle
> = imagePicker("UIImagePickerPresentationStyle");
export const VideoExportPreset: Client<typeof ImagePicker.VideoExportPreset> =
  imagePicker("VideoExportPreset");
export const getCameraPermissionsAsync: Client<
  typeof ImagePicker.getCameraPermissionsAsync
> = imagePicker("getCameraPermissionsAsync");
export const getMediaLibraryPermissionsAsync: Client<
  typeof ImagePicker.getMediaLibraryPermissionsAsync
> = imagePicker("getMediaLibraryPermissionsAsync");
export const getPendingResultAsync: Client<
  typeof ImagePicker.getPendingResultAsync
> = imagePicker("getPendingResultAsync");
export const launchCameraAsync: Client<typeof ImagePicker.launchCameraAsync> =
  imagePicker("launchCameraAsync");
export const launchImageLibraryAsync: Client<
  typeof ImagePicker.launchImageLibraryAsync
> = imagePicker("launchImageLibraryAsync");
export const requestCameraPermissionsAsync: Client<
  typeof ImagePicker.requestCameraPermissionsAsync
> = imagePicker("requestCameraPermissionsAsync");
export const requestMediaLibraryPermissionsAsync: Client<
  typeof ImagePicker.requestMediaLibraryPermissionsAsync
> = imagePicker("requestMediaLibraryPermissionsAsync");
export const useCameraPermissions: Client<
  typeof ImagePicker.useCameraPermissions
> = imagePicker("useCameraPermissions");
export const useMediaLibraryPermissions: Client<
  typeof ImagePicker.useMediaLibraryPermissions
> = imagePicker("useMediaLibraryPermissions");

export type {
  CameraPermissionResponse,
  CropShape,
  DefaultTab,
  ExpandImagePickerResult,
  ImageInfo,
  ImagePickerAsset,
  ImagePickerCanceledResult,
  ImagePickerCancelledResult,
  ImagePickerErrorResult,
  ImagePickerMultipleResult,
  ImagePickerOptions,
  ImagePickerResult,
  ImagePickerSuccessResult,
  MediaLibraryPermissionResponse,
  MediaType,
  OpenFileBrowserOptions,
  PermissionExpiration,
  PermissionHookOptions,
  PermissionResponse,
} from "expo-image-picker";
