import { z } from "zod";

export const integrasiFormSchema = z.object({
  tipe: z.string().min(1, { message: "Tipe wajib diisi" }).max(255, { message: "Tipe maksimal 255 karakter" }),

  key: z.string().min(1, { message: "Key wajib diisi" }).max(255, { message: "Key maksimal 255 karakter" }),

  value: z.string().max(255, { message: "Value maksimal 255 karakter" }).optional(),

  deskripsi: z.string().min(1, { message: "Deskripsi wajib diisi" }).max(500, { message: "Deskripsi maksimal 500 karakter" }),

  status: z.string().min(1, { message: "Status wajib diisi" }).max(50, { message: "Status maksimal 50 karakter" }),
});
