export interface Monev {
  id: string;
  program: string;
  bpdas: string;
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
}

export interface MonevResponse {
  monevList: Monev[];
}
