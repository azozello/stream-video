import {Stream} from '../models/stream';
import * as StreamListAction from '../actions/streamList';

export interface State {
  streams: Stream[];
}

export const InitialState: State = {
  streams: [
    {
      id: 0,
      title: 'Sintel',
      source: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
    },
    {
      id: 1,
      title: 'BigBuckBunny',
      source: 'http://184.72.239.149/vod/smil:BigBuckBunny.smil/playlist.m3u8'
    }
  ]
};

export function reducer(state = InitialState, action: StreamListAction.Action) {
  switch (action.type) {
    case StreamListAction.GET_AVAILABLE_STREAMS:
      return {
        ...state
      };
    default:
      return state;
  }
}

export const getStreams = (state: State) => state.streams;
