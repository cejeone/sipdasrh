import { Provinsi } from "./struktur-wilayah/Provinsi";
import { KabupatenKota } from "./struktur-wilayah/KabupatenKota";
import { Kecamatan } from "./struktur-wilayah/Kecamatan";
import { KelurahanDesa } from "./struktur-wilayah/KelurahanDesa";
import { Lov } from "./Lov";


export interface Institusi {
  id: number;
  nama: string;
  email: string;
  nomorTelepon: string;
  website: string;
  tipeInstitusiId: number;
  tipeAkreditasiId: number;

  provinsiId: number;
  kabupatenKotaId: number;
  kecamatanId: number;
  alamat: string;
  kodePos: string;
  statusId: number;

  tipeInstitusi?: Lov;
  tipeAkreditasi?: Lov;
  status?: Lov;
  provinsi?: Provinsi;
  kabupatenKota?: KabupatenKota;
  kecamatan?: Kecamatan;
  kelurahanDesa?: KelurahanDesa;
}

export interface InstitusiResponse {
  institusiList: Institusi[];
}
