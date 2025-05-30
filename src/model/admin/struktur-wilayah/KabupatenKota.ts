import { Provinsi } from "./Provinsi";

export interface KabupatenKota {
  id: number;
  kabupatenKota: string;
  kodeDepdagri: string;
  provinsiId: number;
  provinsi?: Provinsi;
}

export interface KabupatenKotaResponse {
  kabupatenKotaList: KabupatenKota[];
}
