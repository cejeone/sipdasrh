import { KabupatenKota } from "../struktur-wilayah/KabupatenKota";
import { Kecamatan } from "../struktur-wilayah/Kecamatan";
import { KelurahanDesa } from "../struktur-wilayah/KelurahanDesa";
import { Provinsi } from "../struktur-wilayah/Provinsi";

export interface Bpth {
  id: number;
  kodeBpth: string;
  namaBpth: string;
  provinsiId: number;
  kabupatenKotaId: number;
  kecamatanId: number;
  kelurahanDesaId: number;
  alamat: string;
  telepon: string;

  provinsi?: Provinsi;
  kabupatenKota?: KabupatenKota;
  kecamatan?: Kecamatan;
  kelurahanDesa?: KelurahanDesa;
}

export interface BpthResponse {
  bpthList: Bpth[];
}
