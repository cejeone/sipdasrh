export interface KonfigurasiSistem {
  id: string;
  tipe: string;
  key: string;
  value: string;
  deskripsi: string;
  status: string;
}

export interface KonfigurasiSistemResponse {
  konfigurasiSistemList: KonfigurasiSistem[];
}
