export interface Lov {
  id: string;
  namaKategori: string;
  nilai: string;
  kelas: string;
  deskripsi: string;
  status: string;
}

export interface LovResponse {
  lovList: Lov[];
}
