import { Provinsi } from "../struktur-wilayah/Provinsi";

export interface Bpdas {
  id: number;
  kodeBpdas: string;
  namaBpdas: string;
  provinsiId: number;
  provinsi?: Provinsi;
  alamat: string;
  telepon: string;
}

export interface BpdasResponse {
  bpdasList: Bpdas[];
}
