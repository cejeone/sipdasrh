import { z } from "zod";

export const eselon1FormSchema = z.object({
  nama: z.string().min(1, { message: "Nama wajib diisi" }).max(255, { message: "Direktorat maksimal 255 karakter" }),

  pejabat: z.string().min(1, { message: "Pejabat wajib diisi" }).max(255, { message: "BPDAS maksimal 255 karakter" }),

  tugasDanFungsi: z.string().min(1, { message: "Tugas Dan Fungsi wajib diisi" }).optional(),

  keterangan: z.string().min(1, { message: "Ketarangan wajib diisi" }).max(500, { message: "Ketarangan maksimal 500 karakter" }),

});
