import { z } from "zod";

export const dokumenFormSchema = z.object({
  tipe: z.string({ required_error: "Tipe harus diisi" }).min(1, "Tipe harus diisi"),
  namaDokumen: z.string({ required_error: "Nama Dokumen harus diisi" }).min(1, "Nama Dokumen harus diisi"),
  status: z.string({ required_error: "Status harus diisi" }).min(1, "Status harus diisi"),
  keterangan: z.string({ required_error: "Keterangan harus diisi" }).min(1, "Keterangan harus diisi"),
  // files: z.array(z.instanceof(File)).nonempty({ message: "File harus diunggah" }),
});
