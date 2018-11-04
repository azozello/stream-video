export interface Stream {
  id: number;
  title: string;
  source: string;
  type?: string;
  active?: boolean;
  hls?: boolean;
}
