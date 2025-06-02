import { Provinsi } from "../struktur-wilayah/Provinsi";
import { KabupatenKota } from "./../struktur-wilayah/KabupatenKota";
import { Kecamatan } from "../struktur-wilayah/Kecamatan";
import { KelurahanDesa } from "../struktur-wilayah/KelurahanDesa";

export interface Bpdas {
  id: number;
  kodeBpdas: string;
  namaBpdas: string;
  alamat: string;
  telepon: string;
  provinsiId: number;
  kabupatenKotaId: number;
  kecamatanId: number;
  kelurahanDesaId: number;

  provinsi?: Provinsi;
  kabupatenKota?: KabupatenKota;
  kecamatan?: Kecamatan;
  kelurahanDesa?: KelurahanDesa;
}

export interface BpdasResponse {
  bpdasList: Bpdas[];
}
