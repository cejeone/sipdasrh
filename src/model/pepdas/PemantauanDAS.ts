export interface PemantauanDAS {
  id: string;
  bpdas: string;
  das: string;
  spasId: string;
  tanggalWaktu: string;
  nilaiTma: number;
  nilaiCurahHujan: number;
  teganganBaterai: number;
}

export interface PemantauanDASResponse {
  pemantauanDasList: PemantauanDAS[];
}
