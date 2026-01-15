interface ResultItem {
  metadata: {
    lat: number;
    long: number;
    refreshRate: string;
    source: string;
    cameraName: string;
  };
  url: string;
  cosineDistance: number;
  updated_at: number;
}
export type Result = ResultItem;