export interface ProgramPagu {
  id: string;
  program?: Program;
  kategori: string;
  sumberAnggaran: string;
  tahunAnggaran: number;
  pagu: number;
  status: string;
  keterangan: string;
  programId: string;
}

export interface Program {
  id: string;
  direktorat: string;
  kategori: string;
  nama: string;
  tahunRencana: number;
  totalAnggaran: number;
  status: string;
  files: ProgramPagu[];
}

export interface ProgramResponse {
  programList: Program[];
}
