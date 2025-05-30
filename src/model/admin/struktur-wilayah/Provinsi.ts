export interface Provinsi {
  id: number;
  namaProvinsi: string;
  kodeDepdagri: string;
}

export interface ProvinsiResponse {
  provinsiList: Provinsi[];
}
