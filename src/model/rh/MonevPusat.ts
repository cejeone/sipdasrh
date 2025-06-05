import { Bpdas } from "../admin/organisasi/Bpdas";

export interface MonevPusat {
  id: string;
  program: string;
  bpdasId: Bpdas;
  totalTarget: number;
  totalRealisasi: number;
  totalT1: number;
  realisasiT1: number;
  totalP0: number;
  realisasiP0: number;
  totalP1: number;
  realisasiP1: number;
  totalP2: number;
  realisasiP2: number;
  totalBast: number;
  realisasiBast: number;
  keterangan: string;
  bpdas?: Bpdas;
}

export interface MonevPusatResponse {
  monevPusatList: MonevPusat[];
}
