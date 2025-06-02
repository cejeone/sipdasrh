import { z } from "zod";

export const kecamatanFormSchema = z.object({
  kecamatan: z.string().min(1, { message: "Nama Kecamatan wajib diisi" }).max(255, { message: "Provinsi maksimal 255 karakter" }),

  kodeDepdagri: z.string().min(1, { message: "Kode DEPDAGRI wajib diisi" }).max(255, { message: "Kode DEPDAGRI maksimal 255 karakter" }),

  kabupatenKotaId: z.number({ invalid_type_error: "Kabupaten/Kota harus dipilih" }),
});
