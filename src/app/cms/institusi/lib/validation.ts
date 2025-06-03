import { z } from "zod";

export const InstitusiFormSchema = z.object({
  nama: z.string().min(1, { message: "Nama wajib diisi" }).max(255, { message: "Nama maksimal 255 karakter" }),
  email: z.string().min(1, { message: "Email wajib diisi" }).max(255, { message: "Email maksimal 255 karakter" }),
  nomorTelepon: z.string().min(1, { message: "Nomor Telepon wajib diisi" }).max(255, { message: "Nomor Telepon maksimal 255 karakter" }),
  website: z.string().min(1, { message: "Website wajib diisi" }).max(255, { message: "Website maksimal 255 karakter" }),
  tipeInstitusiId: z.number({ invalid_type_error: "Tipe Institusi harus dipilih" }),
  tipeAkreditasiId: z.number({ invalid_type_error: "Tipe Akreditasi harus dipilih" }),
  
  provinsiId: z.number({ invalid_type_error: "Provinsi harus dipilih" }),
  kabupatenKotaId: z.number({ invalid_type_error: "Kabupaten / Kota harus dipilih" }),
  kecamatanId: z.number({ invalid_type_error: "Kecamatan harus dipilih" }),
  alamat: z.string().min(1, { message: "Alamat wajib diisi" }).max(255, { message: "Alamat maksimal 255 karakter" }),
  kodePos: z.string().min(1, { message: "Kode Pos wajib diisi" }).max(255, { message: "Kode Pos maksimal 255 karakter" }),
  statusId: z.number({ invalid_type_error: "Status harus dipilih" }),

});
