import { z } from "zod";

export const bpthFormSchema = z.object({
  kodeBpth: z.string().min(1, { message: "Kode Bpth wajib diisi" }).max(255, { message: "Kode Bpth maksimal 255 karakter" }),

  namaBpth: z.string().min(1, { message: "Nama Bpth wajib diisi" }).max(255, { message: "Nama Bpth maksimal 255 karakter" }),

  alamat: z.string().min(1, { message: "Alamat wajib diisi" }).optional(),

  telepon: z.string().min(1, { message: "Telepon wajib diisi" }).max(13, { message: "Telepon maksimal 13 karakter" }),

  provinsiId: z.number({ invalid_type_error: "Provinsi harus dipilih" }),
  kabupatenKotaId: z.number({ invalid_type_error: "Kabupaten / Kota harus dipilih" }),
  kecamatanId: z.number({ invalid_type_error: "Kecamatan harus dipilih" }),
  kelurahanDesaId: z.number({ invalid_type_error: "Kelurahan / Desa harus dipilih" }),
});
