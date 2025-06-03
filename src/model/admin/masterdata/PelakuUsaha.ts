import { Lov } from "./../Lov";

export interface PelakuUsaha {
  id: number;
  namaBadanUsaha: string;
  nomorIndukBerusahaNib: string;
  nomorSertifikatStandar: string;
  ruangLingkupUsaha: string;
  namaDirektur: string;
  nomorHpDirektur: string;
  alamat: string;
  kategoriPelakuUsahaId: number;
  kategoriPelakuUsaha: Lov;
}

export interface PelakuUsahaResponse {
  kelompokMasyarakatList: PelakuUsaha[];
}
