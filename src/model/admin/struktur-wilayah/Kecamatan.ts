import { KabupatenKota } from "./KabupatenKota";

export interface Kecamatan {
  id: number;
  kecamatan: string;
  kodeDepdagri: string;
  kabupatenkotaId: number;
  kabupatenKota?: KabupatenKota;
}

export interface KecamatanResponse {
  kecamatanList: Kecamatan[];
}
