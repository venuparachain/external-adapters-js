import type {
  AdapterRequest,
  AdapterResponse,
  BatchableProperty,
  Execute,
  AdapterData,
} from '../../../types'
import { ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'

export interface WarmupExecutePayload<D extends AdapterData = AdapterData>
  extends AdapterRequest<D> {
  /**
   * The Execute function of the adapter. Used when polling for new data.
   */
  executeFn: Execute<AdapterRequest<D>>
  /**
   * The response returned from requesting data from a provider
   */
  result: AdapterResponse
}
export const warmupExecute = createAction<WarmupExecutePayload>('WARMUP/EXECUTE')
export const makeWarmupExecute = <D extends AdapterData = AdapterData>(): ActionCreatorWithPayload<
  WarmupExecutePayload<D>,
  string
> => createAction<WarmupExecutePayload<D>>('WARMUP/EXECUTE')

export interface WarmupSubscribedPayload<D extends AdapterData = AdapterData>
  extends WarmupExecutePayload<D> {
  /**
   * Override the key to used when storing the subscription
   * Batch warmers will use a key without the data property
   */
  key?: string
  /**
   * If a subscription is being warmed by a batch warmer
   * This will hold the subscription key of the parent
   */
  parent?: string
  /**
   * If a subscription is being warmed by a parent batch request
   * This will hold the key of the request data to join
   * (e.g.
   * when getting price data this might be "base"
   * that will be the path in data:
   *  {
   *    "base": ["ETH", "USD"],
   *    "quote": "USD"
   *  }
   * )
   */
  batchablePropertyPath?: BatchableProperty[]
  /**
   * If a subscription is a batch warmer that is warming multiple other requests
   * This will hold a map of the children subscription key to the last time it was seen
   */
  childLastSeenById?: { [childKey: string]: number }
}

export interface WarmupSubscribedMultiplePayload {
  members: WarmupSubscribedPayload[]
}

export interface WarmupUnsubscribedPayload {
  key: string
  isBatched: boolean
  reason: string
}
export interface WarmupStoppedPayload {
  keys: string[]
  isBatched: boolean
}
interface WarmupSubscriptionTimeoutResetPayload {
  key: string
}
interface WarmupJoinGroupPayload {
  parent: string
  childLastSeenById: { [childKey: string]: number }
  batchablePropertyPath: BatchableProperty[]
}
interface WarmupLeaveGroupPayload {
  parent: string
  childLastSeenById: { [childKey: string]: number }
  batchablePropertyPath: BatchableProperty[]
}

export const warmupSubscribed = createAction<WarmupSubscribedPayload>('WARMUP/SUBSCRIBED')
export const warmupSubscribedMultiple = createAction<WarmupSubscribedMultiplePayload>(
  'WARMUP/SUBSCRIBED_MULTIPLE',
)
export const warmupSubscriptionTimeoutReset = createAction<WarmupSubscriptionTimeoutResetPayload>(
  'WARMUP/SUBSCRIPTION_TIMEOUT_RESET',
)
export const warmupUnsubscribed = createAction<WarmupUnsubscribedPayload>('WARMUP/UNSUBSCRIBED')
export const warmupStopped = createAction<WarmupStoppedPayload>('WARMUP/STOPPED')
export const warmupJoinGroup = createAction<WarmupJoinGroupPayload>('WARMUP/JOIN_GROUP')
export const warmupLeaveGroup = createAction<WarmupLeaveGroupPayload>('WARMUP/LEAVE_GROUP')
export const warmupShutdown = createAction('WARMUP/SHUTDOWN')

interface WarmupRequestedPayload {
  /**
   * State lookup key so that the warmup handler can find the slice of data it needs
   * to warmup the cold EA
   */
  key: string
}
interface WarmupFulfilledPayload {
  /**
   * State lookup key
   */
  key: string
}
interface WarmupFailedPayload {
  /**
   * State lookup key
   */
  feedLabel: string
  key: string
  error: Error
}
/**
 * These set of events are emitted when our warmup handler requests the EA itself to warm up
 * the cache for a particular key
 */
export const warmupRequested = createAction<WarmupRequestedPayload>('WARMUP/REQUESTED')
export const warmupFulfilled = createAction<WarmupFulfilledPayload>('WARMUP/FULFILLED')
export const warmupFailed = createAction<WarmupFailedPayload>('WARMUP/FAILED')
