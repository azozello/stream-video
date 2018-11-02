import {Action} from '@ngrx/store';

export const GET_AVAILABLE_STREAMS = '[STREAM_LIST] Get';

export class GetAvailableStreams implements Action {
  readonly type = GET_AVAILABLE_STREAMS;

  constructor() {
  }
}

export type Action = GetAvailableStreams;
