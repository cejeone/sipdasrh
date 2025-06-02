import { Lov } from "../lov/Lov";

export interface KonfigurasiSistem {
  id: string;
  lovId: number;
  lov?: Lov;
  key: string;
  value: string;
  deskripsi: string;
  status: string;
}

export interface KonfigurasiSistemResponse {
  konfigurasiSistemList: KonfigurasiSistem[];
}
