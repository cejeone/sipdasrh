import { Lov } from "./Lov";

export interface Integrasi {
  id: number;
  url: string;
  apiKey: string;
  tipe: string;
  deskripsi: string;
  statusId: number;
  status?: Lov;
}

export interface IntegrasiResponse {
  integrasiList: Integrasi[];
}
