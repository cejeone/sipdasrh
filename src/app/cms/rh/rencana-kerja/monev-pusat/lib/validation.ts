import { z } from "zod";

export const monevPusatFormSchema = z.object({
  program: z.string().min(1, { message: "Direktorat wajib diisi" }).max(255, { message: "Direktorat maksimal 255 karakter" }),
  bpdasId: z.number({ invalid_type_error: "Provinsi harus dipilih" }),
  totalTarget: z.number({ invalid_type_error: "Nilai harus berupa angka" }).min(0, "Nilai tidak valid"),
  totalRealisasi: z.number({ invalid_type_error: "Nilai harus berupa angka" }).min(0, "Nilai tidak valid"),
  totalT1: z.number({ invalid_type_error: "Nilai harus berupa angka" }).min(0, "Tahun tidak valid"),
  realisasiT1: z.number({ invalid_type_error: "Nilai harus berupa angka" }).min(0, "Tahun tidak valid"),
  totalP0: z.number({ invalid_type_error: "Nilai harus berupa angka" }).min(0, "Tahun tidak valid"),
  realisasiP0: z.number({ invalid_type_error: "Nilai harus berupa angka" }).min(0, "Tahun tidak valid"),
  totalP1: z.number({ invalid_type_error: "Nilai harus berupa angka" }).min(0, "Tahun tidak valid"),
  realisasiP1: z.number({ invalid_type_error: "Nilai harus berupa angka" }).min(0, "Tahun tidak valid"),
  totalP2: z.number({ invalid_type_error: "Nilai harus berupa angka" }).min(0, "Tahun tidak valid"),
  realisasiP2: z.number({ invalid_type_error: "Nilai harus berupa angka" }).min(0, "Tahun tidak valid"),
  totalBast: z.number({ invalid_type_error: "Nilai harus berupa angka" }).min(0, "Tahun tidak valid"),
  realisasiBast: z.number({ invalid_type_error: "Nilai harus berupa angka" }).min(0, "Tahun tidak valid"),
  keterangan: z.number({ invalid_type_error: "Nilai harus berupa angka" }).min(0, "Tahun tidak valid"),
  
});
