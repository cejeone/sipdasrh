import { Eselon2 } from "./Eselon2";

export interface Eselon3 {
  id: number;
  nama: string;
  pejabat: string;
  tugasDanFungsi: string;
  keterangan: string;
  eselon2Id: number;
  eselon2?: Eselon2;
}

export interface Eselon3Response {
  eselon3List: Eselon3[];
}
