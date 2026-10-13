// `expo-file-system`, name for name, in alphabetical order: a value where it
// both exports and declares it, with the instance type of each class it names;
// a type for everything else it declares.
import type { Client } from "@backtickjs/core";
import type * as FileSystem from "expo-file-system";
import { fileSystem } from "./imports.js";

export const DEFAULT_DEBOUNCE_MS: Client<
  typeof FileSystem.DEFAULT_DEBOUNCE_MS
> = fileSystem("DEFAULT_DEBOUNCE_MS");
export const Directory: Client<typeof FileSystem.Directory> =
  fileSystem("Directory");
export type Directory = FileSystem.Directory;
export const DownloadTask: Client<typeof FileSystem.DownloadTask> =
  fileSystem("DownloadTask");
export type DownloadTask = FileSystem.DownloadTask;
export const EncodingType: Client<typeof FileSystem.EncodingType> =
  fileSystem("EncodingType");
export const File: Client<typeof FileSystem.File> = fileSystem("File");
export type File = FileSystem.File;
export const FileMode: Client<typeof FileSystem.FileMode> =
  fileSystem("FileMode");
export const Paths: Client<typeof FileSystem.Paths> = fileSystem("Paths");
export type Paths = FileSystem.Paths;
export const UploadTask: Client<typeof FileSystem.UploadTask> =
  fileSystem("UploadTask");
export type UploadTask = FileSystem.UploadTask;
export const UploadType: Client<typeof FileSystem.UploadType> =
  fileSystem("UploadType");
export const copyAsync: Client<typeof FileSystem.copyAsync> =
  fileSystem("copyAsync");
export const createDownloadResumable: Client<
  typeof FileSystem.createDownloadResumable
> = fileSystem("createDownloadResumable");
export const createUploadTask: Client<typeof FileSystem.createUploadTask> =
  fileSystem("createUploadTask");
export const deleteAsync: Client<typeof FileSystem.deleteAsync> =
  fileSystem("deleteAsync");
export const deleteLegacyDocumentDirectoryAndroid: Client<
  typeof FileSystem.deleteLegacyDocumentDirectoryAndroid
> = fileSystem("deleteLegacyDocumentDirectoryAndroid");
export const downloadAsync: Client<typeof FileSystem.downloadAsync> =
  fileSystem("downloadAsync");
export const getContentUriAsync: Client<typeof FileSystem.getContentUriAsync> =
  fileSystem("getContentUriAsync");
export const getFreeDiskStorageAsync: Client<
  typeof FileSystem.getFreeDiskStorageAsync
> = fileSystem("getFreeDiskStorageAsync");
export const getInfoAsync: Client<typeof FileSystem.getInfoAsync> =
  fileSystem("getInfoAsync");
export const getTotalDiskCapacityAsync: Client<
  typeof FileSystem.getTotalDiskCapacityAsync
> = fileSystem("getTotalDiskCapacityAsync");
export const makeDirectoryAsync: Client<typeof FileSystem.makeDirectoryAsync> =
  fileSystem("makeDirectoryAsync");
export const moveAsync: Client<typeof FileSystem.moveAsync> =
  fileSystem("moveAsync");
export const readAsStringAsync: Client<typeof FileSystem.readAsStringAsync> =
  fileSystem("readAsStringAsync");
export const readDirectoryAsync: Client<typeof FileSystem.readDirectoryAsync> =
  fileSystem("readDirectoryAsync");
export const uploadAsync: Client<typeof FileSystem.uploadAsync> =
  fileSystem("uploadAsync");
export const writeAsStringAsync: Client<typeof FileSystem.writeAsStringAsync> =
  fileSystem("writeAsStringAsync");

export type {
  DirectoryCreateOptions,
  DirectoryInfo,
  DownloadOptions,
  DownloadPauseState,
  DownloadProgress,
  DownloadTaskOptions,
  DownloadTaskState,
  FileCreateOptions,
  FileHandle,
  FileInfo,
  FileWriteOptions,
  InfoOptions,
  NetworkTaskSessionType,
  PathInfo,
  PickFileCanceledResult,
  PickFileGeneralOptions,
  PickFileOptions,
  PickMultipleFilesOptions,
  PickMultipleFilesResult,
  PickMultipleFilesSuccessResult,
  PickSingleFileOptions,
  PickSingleFileResult,
  PickSingleFileSuccessResult,
  RelocationOptions,
  UploadOptions,
  UploadProgress,
  UploadResult,
  UploadTaskState,
  WatchEvent,
  WatchEventType,
  WatchOptions,
  WatchSubscription,
} from "expo-file-system";
