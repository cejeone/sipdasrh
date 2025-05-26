import { z } from "zod";

export const pemantauanDASFormSchema = z.object({
  das: z.string().min(1, { message: "Direktorat wajib diisi" }).max(255, { message: "Direktorat maksimal 255 karakter" }),

  bpdas: z.string().min(1, { message: "BPDAS wajib diisi" }).max(255, { message: "BPDAS maksimal 255 karakter" }),

  spasId: z.string().max(255, { message: "SPAS ID maksimal 255 karakter" }).optional(),

  tanggalWaktu: z.string().min(1, { message: "Tanggal Waktu wajib diisi" }).max(500, { message: "Tanggal Waktu maksimal 500 karakter" }),

  nilaiTma: z.number({ invalid_type_error: "Nilai harus berupa angka" }).min(0, "Nilai tidak valid"),

  nilaiCurahHujan: z.number({ invalid_type_error: "Nilai harus berupa angka" }).min(0, "Nilai tidak valid"),

  teganganBaterai: z.number({ invalid_type_error: "Nilai harus berupa angka" }).min(0, "Tahun tidak valid"),
});
