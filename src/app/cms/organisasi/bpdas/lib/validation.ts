import { z } from "zod";

export const bpdasFormSchema = z.object({
  kodeBpdas: z.string().min(1, { message: "Kode Bpdas wajib diisi" }).max(255, { message: "Kode Bpdas maksimal 255 karakter" }),

  namaBpdas: z.string().min(1, { message: "Nama Bpdas wajib diisi" }).max(255, { message: "Nama Bpdas maksimal 255 karakter" }),

  alamat: z.string().min(1, { message: "Alamat wajib diisi" }).optional(),

  telepon: z.string().min(1, { message: "Telepon wajib diisi" }).max(13, { message: "Telepon maksimal 13 karakter" }),

  provinsiId: z.number({ invalid_type_error: "Provinsi harus dipilih" }),
  kabupatenKotaId: z.number({ invalid_type_error: "Kabupaten / Kota harus dipilih" }),
  kecamatanId: z.number({ invalid_type_error: "Kecamatan harus dipilih" }),
  kelurahanDesaId: z.number({ invalid_type_error: "Kelurahan / Desa harus dipilih" }),
});
