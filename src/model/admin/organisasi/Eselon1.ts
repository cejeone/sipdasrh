export interface Eselon1 {
  id: number;
  nama: string;
  pejabat: string;
  tugasDanFungsi: string;
  keterangan: string;
}

export interface Eselon1Response {
  eselon1List: Eselon1[];
}
