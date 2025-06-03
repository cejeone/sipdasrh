import { z } from "zod";

export const kelompokMasyarakatFormSchema = z.object({
  namaKelompokMasyarakat: z.string().min(1, { message: "Nama Kelompok Masyarakat wajib diisi" }).max(255, { message: "Nama Bpdas maksimal 255 karakter" }),
  nomorSkPenetapan: z.string().min(1, { message: "Nomor SK Penetapan wajib diisi" }).max(255, { message: "Nama Bpdas maksimal 255 karakter" }),
  tanggalSkPenetapan: z.string().min(1, { message: "Tanggal SK Penetapan wajib diisi" }).max(255, { message: "Nama Bpdas maksimal 255 karakter" }),
  alamat: z.string().min(1, { message: "Alamat wajib diisi" }).optional(),
  telepon: z.string().min(1, { message: "Telepon wajib diisi" }).max(13, { message: "Telepon maksimal 13 karakter" }),
  // pic: z.string().min(1, { message: "PIC wajib diisi" }).max(13, { message: "Telepon maksimal 13 karakter" }),

  provinsiId: z.number({ invalid_type_error: "Provinsi harus dipilih" }),
  kabupatenKotaId: z.number({ invalid_type_error: "Kabupaten / Kota harus dipilih" }),
  kecamatanId: z.number({ invalid_type_error: "Kecamatan harus dipilih" }),
  kelurahanDesaId: z.number({ invalid_type_error: "Kelurahan / Desa harus dipilih" }),
});
