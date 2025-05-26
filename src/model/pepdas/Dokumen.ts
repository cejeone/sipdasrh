export interface DokumenFile {
  id: string;
  dokumen?: Dokumen;
  namaFile: string;
  namaAsli: string;
  ukuranMb: number;
  contentType: string;
  uploadedAt: string;
}

export interface Dokumen {
  id: string;
  tipe: string;
  namaDokumen: string;
  status: string;
  keterangan: string;
  uploadedAt: string;
  files: DokumenFile[];
}

export interface DokumenResponse {
  dokumenList: Dokumen[];
}
