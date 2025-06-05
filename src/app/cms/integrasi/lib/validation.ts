import { z } from "zod";

export const integrasiFormSchema = z.object({
  url: z.string().min(1, { message: "URL wajib diisi" }).max(255, { message: "URL maksimal 255 karakter" }),

  apiKey: z.string().min(1, { message: "API Key wajib diisi" }).max(255, { message: "API Key maksimal 255 karakter" }),

  tipe: z.string().max(255, { message: "Tipe maksimal 255 karakter" }).optional(),

  deskripsi: z.string().min(1, { message: "Deskripsi wajib diisi" }).max(500, { message: "Deskripsi maksimal 500 karakter" }),

  statusId: z.number({ invalid_type_error: "Status harus dipilih" }),
});
