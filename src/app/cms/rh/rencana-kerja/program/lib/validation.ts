import { z } from "zod";

// Schema untuk Program
export const programFormSchema = z.object({
  eselon2: z.number({ invalid_type_error: "Eselon 2 harus dipilih" }),

  kategoriId: z.number({ invalid_type_error: "Kategori harus dipilih" }),

  nama: z.string().min(1, { message: "Nama program wajib diisi" }).max(255, { message: "Nama maksimal 255 karakter" }),

  tahunPelaksana: z.string().min(1, { message: "Tahun Pelaksana wajib diisi" }).max(255, { message: "Tahun Pelaksana maksimal 255 karakter" }),
  
  totalAnggaran: z.number({ invalid_type_error: "Anggaran harus berupa angka" }).min(0, "Anggaran tidak boleh negatif"),

  targetLuas: z.number({ invalid_type_error: "Luas harus berupa angka" }).min(0, "Luas tidak boleh negatif"),

  statusId: z.number({ invalid_type_error: "Status harus dipilih" }),
});
