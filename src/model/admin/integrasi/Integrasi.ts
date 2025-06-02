export interface Integrasi {
  id: string;
  url: string;
  apiKey: string;
  tipe: string;
  deskripsi: string;
  status: string;
}

export interface IntegrasiResponse {
  integrasiList: Integrasi[];
}
