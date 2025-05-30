export interface Eselon3 {
  id: string;
  nama: string;
  pejabat: string;
  tugasDanFungsi: string;
  keterangan: string;
  eselon2: string;
}

export interface Eselon3Response {
  eselon3List: Eselon3[];
}
