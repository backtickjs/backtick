// `@tanstack/react-query`, name for name, in alphabetical order: a value where
// it exports one, with the type each class or symbol also names; a type for
// everything else it declares.
import type { Client } from "@backtickjs/core";
import type * as ReactQuery from "@tanstack/react-query";
import { query } from "./imports.js";

export const CancelledError: Client<typeof ReactQuery.CancelledError> =
  query("CancelledError");
export type CancelledError = ReactQuery.CancelledError;
export const HydrationBoundary: Client<typeof ReactQuery.HydrationBoundary> =
  query("HydrationBoundary");
export const InfiniteQueryObserver: Client<
  typeof ReactQuery.InfiniteQueryObserver
> = query("InfiniteQueryObserver");
export type InfiniteQueryObserver<
  TQueryFnData = unknown,
  TError = ReactQuery.DefaultError,
  TData = ReactQuery.InfiniteData<TQueryFnData>,
  TQueryKey extends ReactQuery.QueryKey = ReactQuery.QueryKey,
  TPageParam = unknown,
> = ReactQuery.InfiniteQueryObserver<
  TQueryFnData,
  TError,
  TData,
  TQueryKey,
  TPageParam
>;
export const IsRestoringProvider: Client<
  typeof ReactQuery.IsRestoringProvider
> = query("IsRestoringProvider");
export const Mutation: Client<typeof ReactQuery.Mutation> = query("Mutation");
export type Mutation<
  TData = unknown,
  TError = ReactQuery.DefaultError,
  TVariables = unknown,
  TOnMutateResult = unknown,
> = ReactQuery.Mutation<TData, TError, TVariables, TOnMutateResult>;
export const MutationCache: Client<typeof ReactQuery.MutationCache> =
  query("MutationCache");
export type MutationCache = ReactQuery.MutationCache;
export const MutationObserver: Client<typeof ReactQuery.MutationObserver> =
  query("MutationObserver");
export type MutationObserver<
  TData = unknown,
  TError = ReactQuery.DefaultError,
  TVariables = void,
  TOnMutateResult = unknown,
> = ReactQuery.MutationObserver<TData, TError, TVariables, TOnMutateResult>;
export const QueriesObserver: Client<typeof ReactQuery.QueriesObserver> =
  query("QueriesObserver");
export type QueriesObserver<
  TCombinedResult = Array<ReactQuery.QueryObserverResult>,
> = ReactQuery.QueriesObserver<TCombinedResult>;
export const Query: Client<typeof ReactQuery.Query> = query("Query");
export type Query<
  TQueryFnData = unknown,
  TError = ReactQuery.DefaultError,
  TData = TQueryFnData,
  TQueryKey extends ReactQuery.QueryKey = ReactQuery.QueryKey,
> = ReactQuery.Query<TQueryFnData, TError, TData, TQueryKey>;
export const QueryCache: Client<typeof ReactQuery.QueryCache> =
  query("QueryCache");
export type QueryCache = ReactQuery.QueryCache;
export const QueryClient: Client<typeof ReactQuery.QueryClient> =
  query("QueryClient");
export type QueryClient = ReactQuery.QueryClient;
export const QueryClientContext: Client<typeof ReactQuery.QueryClientContext> =
  query("QueryClientContext");
export const QueryClientProvider: Client<
  typeof ReactQuery.QueryClientProvider
> = query("QueryClientProvider");
export const QueryErrorResetBoundary: Client<
  typeof ReactQuery.QueryErrorResetBoundary
> = query("QueryErrorResetBoundary");
export const QueryObserver: Client<typeof ReactQuery.QueryObserver> =
  query("QueryObserver");
export type QueryObserver<
  TQueryFnData = unknown,
  TError = ReactQuery.DefaultError,
  TData = TQueryFnData,
  TQueryData = TQueryFnData,
  TQueryKey extends ReactQuery.QueryKey = ReactQuery.QueryKey,
> = ReactQuery.QueryObserver<
  TQueryFnData,
  TError,
  TData,
  TQueryData,
  TQueryKey
>;
export const dataTagErrorSymbol: Client<typeof ReactQuery.dataTagErrorSymbol> =
  query("dataTagErrorSymbol");
export type dataTagErrorSymbol = ReactQuery.dataTagErrorSymbol;
export const dataTagSymbol: Client<typeof ReactQuery.dataTagSymbol> =
  query("dataTagSymbol");
export type dataTagSymbol = ReactQuery.dataTagSymbol;
export const defaultScheduler: Client<typeof ReactQuery.defaultScheduler> =
  query("defaultScheduler");
export const defaultShouldDehydrateMutation: Client<
  typeof ReactQuery.defaultShouldDehydrateMutation
> = query("defaultShouldDehydrateMutation");
export const defaultShouldDehydrateQuery: Client<
  typeof ReactQuery.defaultShouldDehydrateQuery
> = query("defaultShouldDehydrateQuery");
export const dehydrate: Client<typeof ReactQuery.dehydrate> =
  query("dehydrate");
export const dehydrateQuery: Client<typeof ReactQuery.dehydrateQuery> =
  query("dehydrateQuery");
export const environmentManager: Client<typeof ReactQuery.environmentManager> =
  query("environmentManager");
export const experimental_streamedQuery: Client<
  typeof ReactQuery.experimental_streamedQuery
> = query("experimental_streamedQuery");
export const focusManager: Client<typeof ReactQuery.focusManager> =
  query("focusManager");
export const hashKey: Client<typeof ReactQuery.hashKey> = query("hashKey");
export const hydrate: Client<typeof ReactQuery.hydrate> = query("hydrate");
export const infiniteQueryOptions: Client<
  typeof ReactQuery.infiniteQueryOptions
> = query("infiniteQueryOptions");
export const isCancelledError: Client<typeof ReactQuery.isCancelledError> =
  query("isCancelledError");
export const isServer: Client<typeof ReactQuery.isServer> = query("isServer");
export const keepPreviousData: Client<typeof ReactQuery.keepPreviousData> =
  query("keepPreviousData");
export const matchMutation: Client<typeof ReactQuery.matchMutation> =
  query("matchMutation");
export const matchQuery: Client<typeof ReactQuery.matchQuery> =
  query("matchQuery");
export const mutationOptions: Client<typeof ReactQuery.mutationOptions> =
  query("mutationOptions");
export const noop: Client<typeof ReactQuery.noop> = query("noop");
export const notifyManager: Client<typeof ReactQuery.notifyManager> =
  query("notifyManager");
export const onlineManager: Client<typeof ReactQuery.onlineManager> =
  query("onlineManager");
export const partialMatchKey: Client<typeof ReactQuery.partialMatchKey> =
  query("partialMatchKey");
export const queryOptions: Client<typeof ReactQuery.queryOptions> =
  query("queryOptions");
export const replaceEqualDeep: Client<typeof ReactQuery.replaceEqualDeep> =
  query("replaceEqualDeep");
export const shouldThrowError: Client<typeof ReactQuery.shouldThrowError> =
  query("shouldThrowError");
export const skipToken: Client<typeof ReactQuery.skipToken> =
  query("skipToken");
export const timeoutManager: Client<typeof ReactQuery.timeoutManager> =
  query("timeoutManager");
export const unsetMarker: Client<typeof ReactQuery.unsetMarker> =
  query("unsetMarker");
export const useInfiniteQuery: Client<typeof ReactQuery.useInfiniteQuery> =
  query("useInfiniteQuery");
export const useIsFetching: Client<typeof ReactQuery.useIsFetching> =
  query("useIsFetching");
export const useIsMutating: Client<typeof ReactQuery.useIsMutating> =
  query("useIsMutating");
export const useIsRestoring: Client<typeof ReactQuery.useIsRestoring> =
  query("useIsRestoring");
export const useMutation: Client<typeof ReactQuery.useMutation> =
  query("useMutation");
export const useMutationState: Client<typeof ReactQuery.useMutationState> =
  query("useMutationState");
export const usePrefetchInfiniteQuery: Client<
  typeof ReactQuery.usePrefetchInfiniteQuery
> = query("usePrefetchInfiniteQuery");
export const usePrefetchQuery: Client<typeof ReactQuery.usePrefetchQuery> =
  query("usePrefetchQuery");
export const useQueries: Client<typeof ReactQuery.useQueries> =
  query("useQueries");
export const useQuery: Client<typeof ReactQuery.useQuery> = query("useQuery");
export const useQueryClient: Client<typeof ReactQuery.useQueryClient> =
  query("useQueryClient");
export const useQueryErrorResetBoundary: Client<
  typeof ReactQuery.useQueryErrorResetBoundary
> = query("useQueryErrorResetBoundary");
export const useSuspenseInfiniteQuery: Client<
  typeof ReactQuery.useSuspenseInfiniteQuery
> = query("useSuspenseInfiniteQuery");
export const useSuspenseQueries: Client<typeof ReactQuery.useSuspenseQueries> =
  query("useSuspenseQueries");
export const useSuspenseQuery: Client<typeof ReactQuery.useSuspenseQuery> =
  query("useSuspenseQuery");

export type {
  AnyDataTag,
  AnyUseBaseQueryOptions,
  AnyUseInfiniteQueryOptions,
  AnyUseMutationOptions,
  AnyUseQueryOptions,
  AnyUseSuspenseInfiniteQueryOptions,
  AnyUseSuspenseQueryOptions,
  CancelOptions,
  DataTag,
  DefaultError,
  DefaultOptions,
  DefaultedInfiniteQueryObserverOptions,
  DefaultedQueryObserverOptions,
  DefinedInfiniteQueryObserverResult,
  DefinedInitialDataInfiniteOptions,
  DefinedInitialDataOptions,
  DefinedQueryObserverResult,
  DefinedUseInfiniteQueryResult,
  DefinedUseQueryResult,
  DehydrateOptions,
  DehydratedState,
  DistributiveOmit,
  EnsureInfiniteQueryDataOptions,
  EnsureQueryDataOptions,
  FetchInfiniteQueryOptions,
  FetchNextPageOptions,
  FetchPreviousPageOptions,
  FetchQueryOptions,
  FetchStatus,
  FocusManager,
  GetNextPageParamFunction,
  GetPreviousPageParamFunction,
  HydrateOptions,
  HydrationBoundaryProps,
  InferDataFromTag,
  InferErrorFromTag,
  InfiniteData,
  InfiniteQueryExecuteOptions,
  InfiniteQueryObserverBaseResult,
  InfiniteQueryObserverLoadingErrorResult,
  InfiniteQueryObserverLoadingResult,
  InfiniteQueryObserverOptions,
  InfiniteQueryObserverPendingResult,
  InfiniteQueryObserverPlaceholderResult,
  InfiniteQueryObserverRefetchErrorResult,
  InfiniteQueryObserverResult,
  InfiniteQueryObserverSuccessResult,
  InfiniteQueryPageParamsOptions,
  InitialDataFunction,
  InitialPageParam,
  InvalidateOptions,
  InvalidateQueryFilters,
  ManagedTimerId,
  MutateFunction,
  MutateFunctionRest,
  MutateOptions,
  MutationCacheConfig,
  MutationCacheNotifyEvent,
  MutationFilters,
  MutationFunction,
  MutationFunctionContext,
  MutationKey,
  MutationMeta,
  MutationObserverBaseResult,
  MutationObserverErrorResult,
  MutationObserverIdleResult,
  MutationObserverLoadingResult,
  MutationObserverOptions,
  MutationObserverResult,
  MutationObserverSuccessResult,
  MutationOptions,
  MutationScope,
  MutationState,
  MutationStatus,
  NetworkMode,
  NonUndefinedGuard,
  NotifyEvent,
  NotifyEventType,
  NotifyOnChangeProps,
  OmitKeyof,
  OnlineManager,
  Override,
  PlaceholderDataFunction,
  QueriesObserverOptions,
  QueriesOptions,
  QueriesPlaceholderDataFunction,
  QueriesResults,
  QueryBooleanOption,
  QueryCacheConfig,
  QueryCacheNotifyEvent,
  QueryClientConfig,
  QueryClientProviderProps,
  QueryErrorClearResetFunction,
  QueryErrorIsResetFunction,
  QueryErrorResetBoundaryFunction,
  QueryErrorResetBoundaryProps,
  QueryErrorResetFunction,
  QueryExecuteOptions,
  QueryFilters,
  QueryFunction,
  QueryFunctionContext,
  QueryKey,
  QueryKeyHashFunction,
  QueryKeyWithDataTag,
  QueryMeta,
  QueryObserverBaseResult,
  QueryObserverLoadingErrorResult,
  QueryObserverLoadingResult,
  QueryObserverOptions,
  QueryObserverPendingResult,
  QueryObserverPlaceholderResult,
  QueryObserverRefetchErrorResult,
  QueryObserverResult,
  QueryObserverSuccessResult,
  QueryOptions,
  QueryPersister,
  QueryState,
  QueryStatus,
  RefetchOptions,
  RefetchQueryFilters,
  Register,
  ResetOptions,
  ResultOptions,
  SetDataOptions,
  SkipToken,
  StaleTime,
  StaleTimeFunction,
  SuspenseQueriesOptions,
  SuspenseQueriesResults,
  ThrowOnError,
  TimeoutCallback,
  TimeoutManager,
  TimeoutProvider,
  UndefinedInitialDataInfiniteOptions,
  UndefinedInitialDataOptions,
  UnsetMarker,
  UnusedSkipTokenInfiniteOptions,
  UnusedSkipTokenOptions,
  Updater,
  UseBaseMutationResult,
  UseBaseQueryOptions,
  UseBaseQueryResult,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseMutateAsyncFunction,
  UseMutateFunction,
  UseMutationOptions,
  UseMutationResult,
  UsePrefetchInfiniteQueryOptions,
  UsePrefetchQueryOptions,
  UseQueryOptions,
  UseQueryResult,
  UseSuspenseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryResult,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
  WithRequired,
} from "@tanstack/react-query";
