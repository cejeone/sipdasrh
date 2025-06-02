import { Provinsi } from "../struktur-wilayah/Provinsi";

export interface Bpth {
  id: number;
  kodeBpth: string;
  namaBpth: string;
  provinsiId: number;
  provinsi?: Provinsi;
  alamat: string;
  telepon: string;
}

export interface BpthResponse {
  bpthList: Bpth[];
}
