import { z } from "zod";

export const lovFormSchema = z.object({
  namaKategori: z.string().min(1, { message: "Nama Kategori wajib diisi" }).max(255, { message: "Nama Kategori maksimal 255 karakter" }),

  nilai: z.string().min(1, { message: "Nilai wajib diisi" }).max(255, { message: "Nilai maksimal 255 karakter" }),

  kelas: z.string().max(255, { message: "Kelas maksimal 255 karakter" }).optional(),

  deskripsi: z.string().min(1, { message: "Deskripsi wajib diisi" }).max(500, { message: "Deskripsi maksimal 500 karakter" }),

  status: z.string().min(1, { message: "Status wajib diisi" }).max(50, { message: "Status maksimal 50 karakter" }),
});
