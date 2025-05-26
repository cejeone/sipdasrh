import { z } from "zod";

// Schema untuk ProgramPagu (disesuaikan dengan versi 'number' tahunAnggaran)
export const programPaguFormSchema = z.object({
  id: z.string(),
  programId: z.string(),
  kategori: z.string(),
  sumberAnggaran: z.string(),
  tahunAnggaran: z
    .number({ invalid_type_error: "Tahun anggaran harus berupa angka" })
    .int({ message: "Harus berupa bilangan bulat" })
    .gte(2000, { message: "Tahun anggaran minimal 2000" }),
  pagu: z.number().min(0, { message: "Pagu tidak boleh negatif" }),
  status: z.string().max(50),
  keterangan: z.string().max(255),
});

// Schema untuk Program
export const programFormSchema = z.object({
  direktorat: z.string().min(1, { message: "Direktorat wajib diisi" }).max(255, { message: "Direktorat maksimal 255 karakter" }),

  kategori: z.string().min(1, { message: "Kategori wajib diisi" }).max(255, { message: "Kategori maksimal 255 karakter" }),

  nama: z.string().min(1, { message: "Nama program wajib diisi" }).max(255, { message: "Nama maksimal 255 karakter" }),

  tahunRencana: z.number({ invalid_type_error: "Tahun rencana harus berupa angka" }).min(1900, "Tahun tidak valid"),
  totalAnggaran: z.number({ invalid_type_error: "Anggaran harus berupa angka" }).min(0, "Anggaran tidak boleh negatif"),

  status: z.string().min(1, { message: "Status wajib diisi" }).max(50, { message: "Status maksimal 50 karakter" }),
});
