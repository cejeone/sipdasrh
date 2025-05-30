import { Eselon1 } from "./Eselon1";

export interface Eselon2 {
  id: number;
  nama: string;
  pejabat: string;
  tugasDanFungsi: string;
  keterangan: string;
  eselon1Id: number;
  eselon1?: Eselon1;
}

export interface Eselon2Response {
  eselon2List: Eselon2[];
}
