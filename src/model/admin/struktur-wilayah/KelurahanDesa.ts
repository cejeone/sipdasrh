import { Kecamatan } from "./Kecamatan";

export interface KelurahanDesa {
  id: number;
  kelurahan: string;
  // kodeDepdagri: string;
  kecamatanId: number;
  kecamatan?: Kecamatan;
}

export interface KelurahanDesaResponse {
  kelurahanDesaList: KelurahanDesa[];
}
