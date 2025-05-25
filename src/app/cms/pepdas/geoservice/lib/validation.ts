import { z } from "zod";

export const geoserviceFormSchema = z.object({
  direktorat: z.string().min(1, { message: "Direktorat wajib diisi" }).max(255, { message: "Direktorat maksimal 255 karakter" }),

  bpdas: z.string().min(1, { message: "BPDAS wajib diisi" }).max(255, { message: "BPDAS maksimal 255 karakter" }),

  geoserviceId: z.string().max(255, { message: "ID Geoservice maksimal 255 karakter" }).optional(),

  url: z.string().min(1, { message: "URL wajib diisi" }).max(500, { message: "URL maksimal 500 karakter" }),

  tipe: z.string().min(1, { message: "Tipe wajib diisi" }).max(100, { message: "Tipe maksimal 100 karakter" }),

  service: z.string().min(1, { message: "Service wajib diisi" }).max(100, { message: "Service maksimal 100 karakter" }),

  status: z.string().min(1, { message: "Status wajib diisi" }).max(50, { message: "Status maksimal 50 karakter" }),
});
