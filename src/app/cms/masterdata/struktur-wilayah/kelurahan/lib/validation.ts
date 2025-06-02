import { z } from "zod";

export const kelurahanFormSchema = z.object({
  kelurahan: z.string().min(1, { message: "Nama Kelurahan wajib diisi" }).max(255, { message: "Provinsi maksimal 255 karakter" }),

  // kodeDepdagri: z.string().min(1, { message: "Kode DEPDAGRI wajib diisi" }).max(255, { message: "Kode DEPDAGRI maksimal 255 karakter" }),

  kecamatanId: z.number({ invalid_type_error: "Kecamatan harus dipilih" }),
});
