export interface Geoservice {
  id: string;
  direktorat: string;
  bpdas: string;
  geoserviceId: string;
  url: string;
  tipe: string;
  service: string;
  status: string;
}

export interface GeoserviceResponse {
  geoServiceList: Geoservice[];
}
