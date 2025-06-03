import { KabupatenKota } from "../struktur-wilayah/KabupatenKota";
import { Kecamatan } from "../struktur-wilayah/Kecamatan";
import { KelurahanDesa } from "../struktur-wilayah/KelurahanDesa";
import { Provinsi } from "../struktur-wilayah/Provinsi";

export interface KelompokMasyarakat {
  id: number;
  namaKelompokMasyarakat: string;
  nomorSkPenetapan: string;
  tanggalSkPenetapan: string;
  alamat: string;
  pic: string;
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

export interface KelompokMasyarakatResponse {
  kelompokMasyarakatList: KelompokMasyarakat[];
}
