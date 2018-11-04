export interface Stream {
  id: number;
  title: string;
  source: string;
  active?: boolean;
  hls?: boolean;
}
