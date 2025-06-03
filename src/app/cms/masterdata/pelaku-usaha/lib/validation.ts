import { z } from "zod";

export const pelakuUsahaFormSchema = z.object({
  namaBadanUsaha: z.string().min(1, { message: "Nama Badan Usaha wajib diisi" }).max(255, { message: "Nama Bpdas maksimal 255 karakter" }),
  nomorIndukBerusahaNib: z.string().min(1, { message: "Nomor Induk Berusaha (NIB) wajib diisi" }).max(255, { message: "Nama Bpdas maksimal 255 karakter" }),
  nomorSertifikatStandar: z.string().min(1, { message: "Nomor Sertifikat Standar wajib diisi" }).max(255, { message: "Nama Bpdas maksimal 255 karakter" }),
  ruangLingkupUsaha: z.string().min(1, { message: "Ruang Lingkup Usaha wajib diisi" }).max(255, { message: "Nama Bpdas maksimal 255 karakter" }),
  namaDirektur: z.string().min(1, { message: "Nama Direktur wajib diisi" }).max(255, { message: "Nama Bpdas maksimal 255 karakter" }),
  nomorHpDirektur: z.string().min(1, { message: "Nomor HP Direktur wajib diisi" }).max(255, { message: "Nama Bpdas maksimal 255 karakter" }),
  alamat: z.string().min(1, { message: "Alamat wajib diisi" }).optional(),

  kategoriPelakuUsahaId: z.number({ invalid_type_error: "Kategori Pelaku Usaha harus dipilih" }),
});
