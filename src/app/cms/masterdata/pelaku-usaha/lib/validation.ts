import { z } from "zod";

export const pelakuUsahaFormSchema = z.object({
  namaBadanUsaha: z.string().min(1, { message: "Nama Kelompok Masyarakat wajib diisi" }).max(255, { message: "Nama Bpdas maksimal 255 karakter" }),
  nomorIndukBerusahaNib: z.string().min(1, { message: "Nomor SK Penetapan wajib diisi" }).max(255, { message: "Nama Bpdas maksimal 255 karakter" }),
  nomorSertifikatStandar: z.string().min(1, { message: "Tanggal SK Penetapan wajib diisi" }).max(255, { message: "Nama Bpdas maksimal 255 karakter" }),
  ruangLingkupUsaha: z.string().min(1, { message: "Tanggal SK Penetapan wajib diisi" }).max(255, { message: "Nama Bpdas maksimal 255 karakter" }),
  namaDirektur: z.string().min(1, { message: "Tanggal SK Penetapan wajib diisi" }).max(255, { message: "Nama Bpdas maksimal 255 karakter" }),
  nomorHpDirektur: z.string().min(1, { message: "Tanggal SK Penetapan wajib diisi" }).max(255, { message: "Nama Bpdas maksimal 255 karakter" }),
  alamat: z.string().min(1, { message: "Alamat wajib diisi" }).optional(),

  kategoriPelakuUsahaId: z.number({ invalid_type_error: "Kategori Pelaku Usaha harus dipilih" }),
  // provinsiId: z.number({ invalid_type_error: "Provinsi harus dipilih" }),
  // kabupatenKotaId: z.number({ invalid_type_error: "Kabupaten / Kota harus dipilih" }),
  // kecamatanId: z.number({ invalid_type_error: "Kecamatan harus dipilih" }),
  // kelurahanDesaId: z.number({ invalid_type_error: "Kelurahan / Desa harus dipilih" }),
});
