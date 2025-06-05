import { Lov } from "../admin/Lov";
import { Eselon2 } from "../admin/organisasi/Eselon2";

export interface Program {
  id: string;
  eselon2Id: number;
  kategoriId: number;
  nama: string;

  tahunPelaksana: string;
  totalAnggaran: number;
  targetLuas: number;
  statusId: number;

  eselon2 ?: Eselon2;
  kategori?: Lov;
  status?: Lov;
}

export interface ProgramResponse {
  programList: Program[];
}
