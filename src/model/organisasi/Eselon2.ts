export interface Eselon2 {
  id: string;
  nama: string;
  pejabat: string;
  tugasDanFungsi: string;
  keterangan: string;
  eselon1: string;
}

export interface Eselon2Response {
  eselon2List: Eselon2[];
}
