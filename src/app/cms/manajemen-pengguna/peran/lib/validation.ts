import { z } from "zod";

export const peranFormSchema = z.object({
  nama: z.string().min(1, { message: "Nama Kategori wajib diisi" }).max(255, { message: "Nama Kategori maksimal 255 karakter" }),

  deskripsi: z.string().min(1, { message: "Deskripsi wajib diisi" }).max(500, { message: "Deskripsi maksimal 500 karakter" }),

  status: z.string().min(1, { message: "Status wajib diisi" }).max(50, { message: "Status maksimal 50 karakter" }),
});
