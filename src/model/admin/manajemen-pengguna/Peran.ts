export interface Peran {
  id: number;
  nama: string;
  deskripsi: string;
  status: string;
}

export interface PeranResponse {
  peranList: Peran[];
}
