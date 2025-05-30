import { z } from "zod";

export const provinsiFormSchema = z.object({
  namaProvinsi: z.string().min(1, { message: "Nama Provinsi wajib diisi" }).max(255, { message: "Provinsi maksimal 255 karakter" }),

  kodeDepdagri: z.string().min(1, { message: "Kode DEPDAGRI wajib diisi" }).max(255, { message: "Kode DEPDAGRI maksimal 255 karakter" }),
});
