export interface Lov {
  id: number;
  namaKategori: string;
  nilai: string;
  kelas: string;
  deskripsi: string;
  status: string;
}

export interface LovResponse {
  lovList: Lov[];
}
