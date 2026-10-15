// `react-error-boundary`, name for name, in alphabetical order: a value where
// it exports one, with the instance type of the class it names; a type for
// everything else it declares.
import type { Client } from "@backtickjs/core";
import type * as ReactErrorBoundary from "react-error-boundary";
import { errorBoundary } from "./imports.js";

export const ErrorBoundary: Client<typeof ReactErrorBoundary.ErrorBoundary> =
  errorBoundary("ErrorBoundary");
export type ErrorBoundary = ReactErrorBoundary.ErrorBoundary;
export const ErrorBoundaryContext: Client<
  typeof ReactErrorBoundary.ErrorBoundaryContext
> = errorBoundary("ErrorBoundaryContext");
export const getErrorMessage: Client<
  typeof ReactErrorBoundary.getErrorMessage
> = errorBoundary("getErrorMessage");
export const useErrorBoundary: Client<
  typeof ReactErrorBoundary.useErrorBoundary
> = errorBoundary("useErrorBoundary");
export const withErrorBoundary: Client<
  typeof ReactErrorBoundary.withErrorBoundary
> = errorBoundary("withErrorBoundary");

export type {
  ErrorBoundaryContextType,
  ErrorBoundaryProps,
  ErrorBoundaryPropsWithComponent,
  ErrorBoundaryPropsWithFallback,
  ErrorBoundaryPropsWithRender,
  FallbackProps,
  OnErrorCallback,
  UseErrorBoundaryApi,
} from "react-error-boundary";
