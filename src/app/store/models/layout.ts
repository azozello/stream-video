import {Stream} from './stream';

export interface Layout {
  length: number;
  class?: string;
  unique?: number;
  streams: Stream[];
}
