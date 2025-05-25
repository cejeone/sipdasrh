"use client";

import { useState } from "react";
import { z } from "zod";
import { create } from "zustand";

import { IconCircleX, IconDeviceFloppy, IconFrame } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { List } from "lucide-react";
import InfoItem from "@/components/InfoItem";
import InputField from "@/components/InputField";
import InputFile from "@/components/InputFile";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";

// === Zustand Store ===
type FormState = {
  id: string;
  nama_bimtek: string;
  subjek: string;
  program: string;
  bpdas: string;
  tempat: string;
  tanggal: string;
  audience: string;
  materi_bimtek: string;
  vidio_bimtek: string;
  foto_bimtek: string;
  evaluasi: string;
  catatan: string;
  setField: (field: keyof FormState, value: string) => void;
};

const useDokumenForm = create<FormState>((set) => ({
  id: "BIMTEK-2025-007",
  nama_bimtek: "",
  subjek: "",
  program: "",
  bpdas: "",
  tempat: "",
  tanggal: "",
  audience: "",
  materi_bimtek: "",
  vidio_bimtek: "",
  foto_bimtek: "",
  evaluasi: "",
  catatan: "",
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
}));

const dokumenFormSchema = z.object({
  id: z.string().min(1, "Wajib diisi"),
  nama_bimtek: z.string().min(1, "Wajib diisi"),
  subjek: z.string().min(1, "Wajib diisi"),
  program: z.string().min(1, "Wajib diisi"),
  bpdas: z.string().min(1, "Wajib diisi"),
  tempat: z.string().min(1, "Wajib diisi"),
  tanggal: z.string().min(1, "Wajib diisi"),
  audience: z.string().min(1, "Wajib diisi"),
  materi_bimtek: z.string().min(1, "Wajib diisi"),
  vidio_bimtek: z.string().min(1, "Wajib diisi"),
  foto_bimtek: z.string().min(1, "Wajib diisi"),
  evaluasi: z.string().min(1, "Wajib diisi"),
  catatan: z.string().min(1, "Wajib diisi"),
});

export default function DokumenForm() {
  const form = useDokumenForm();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = dokumenFormSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const newErrors: Record<string, string> = {};
      Object.entries(fieldErrors).forEach(([key, val]) => {
        if (val) newErrors[key] = val[0];
      });
      setErrors(newErrors);
      return;
    }

    setErrors({});
    console.log("✅ Submit data:", result.data);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div>
            <Breadcrumbs items={[{ label: "Dokumen", href: "#" }, { label: "Buat Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <List />
              <h1 className="text-2xl font-bold">Bimtek</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Tambah
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk membuat data bimtek</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Button type="submit" variant="green" onClick={handleSubmit}>
              <IconDeviceFloppy /> Simpan
            </Button>
            <Link href="/cms/rh/dokumen">
              <Button variant="outline">
                <IconCircleX /> Batal
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <hr className="mb-2" />

      {/* Form Section */}
      <main className="overflow-auto h-full">
        <Card className="border border-border p-4 mb-2 bg-card">
          <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-0">
            <div className="col-span-12 lg:col-span-6 border-r space-y-4 pl-4">
              <div className="title text-base-green flex items-center gap-1">
                <IconFrame />
                <h5 className="font-bold">Identitas Bimtek</h5>
              </div>
              <InfoItem
                number="1"
                title="Id"
                description="Nomor identitas unik yang dihasilkan secara otomatis oleh sistem untuk membedakan setiap elemen Bimtek. Contoh: BIMTEK-2025-007"
              />
              <InfoItem
                number="2"
                title="Nama Bimtek"
                description="Judul Kegiatan Bimtek yang mencerminkan isi utama kegiatan. Contoh: Bimtek Teknik Rehabilitasi Hutan di Lahan Kritis DAS Citarum"
              />
              <InfoItem
                number="3"
                title="Subjek"
                description="Uraian ringkas tentang materi atau topik utama yang dibahas dalam kegiatan Bimtek. Contoh: Pelatihan teknik persemaian, penanaman jenis lokal, dan monitoring hasil rehabilitasi hutan di lahan kritis."
              />
              <InfoItem
                number="4"
                title="Program"
                description="Program dari Direktorat Rehabilitasi Hutan yang menjadi bagian dari kegiatan ini. Contoh: Rehabilitasi Hutan dan Lahan Berbasis DAS."
              />
              <InfoItem
                number="5"
                title="BPDAS"
                description="Pilihan nama BPDAS (Balai Pengelolaan Daerah Aliran Sungai) yang menyelenggarakan atau terlibat dalam Bimtek. Contoh: BPDAS Cimanuk-Citanduy."
              />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <InputField label="Id" value={form.id} onChange={() => {}} error={errors.kontrak} disabled />
                    <InputField label="Nama Bimtek" value={form.nama_bimtek} onChange={() => {}} error={errors.nama_bimtek} />
                    <div>
                      <Label className="text-secondary-green mb-2 font-bold">Subjek</Label>
                      <Textarea
                        className="border-border"
                        value=""
                        onChange={(e) => form.setField("subjek", e.target.value)}
                        placeholder="Pelatihan teknik persemaian, penanaman jenis lokal, dan monitoring hasil rehabilitasi hutan di lahan kritis."></Textarea>
                    </div>
                    <div>
                      <Label className="text-secondary-green mb-2 font-bold">Program</Label>
                      <Select value={form.program} onValueChange={(val) => form.setField("program", val)}>
                        <SelectTrigger className="w-full border-border">
                          <SelectValue placeholder="Pilih salah satu" />
                        </SelectTrigger>
                        <SelectContent></SelectContent>
                      </Select>
                      {errors.program && <p className="text-red-500 text-sm">{errors.program}</p>}
                    </div>
                    <div>
                      <Label className="text-secondary-green mb-2 font-bold">BPDAS</Label>
                      <Select value={form.bpdas} onValueChange={(val) => form.setField("bpdas", val)}>
                        <SelectTrigger className="w-full border-border">
                          <SelectValue placeholder="Pilih salah satu" />
                        </SelectTrigger>
                        <SelectContent></SelectContent>
                      </Select>
                      {errors.bpdas && <p className="text-red-500 text-sm">{errors.bpdas}</p>}
                    </div>
                  </CardContent>
                </form>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border p-4 mb-2 bg-card">
          <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-0">
            <div className="col-span-12 lg:col-span-6 border-r space-y-4 pl-4">
              <div className="title text-base-green flex items-center gap-1">
                <IconFrame />
                <h5 className="font-bold">Pelaksanaan Kegiatan</h5>
              </div>
              <InfoItem
                number="1"
                title="Tempat"
                description="Lokasi pelaksanaan kegiatan Bimtek. Bisa berupa alamat lengkap atau nama gedung/instansi. Contoh: Aula BPDAS Cimanuk-Citanduy, Kota Tasikmalaya, Jawa Barat."
              />
              <InfoItem
                number="2"
                title="Tanggal"
                description="Tanggal pelaksanaan kegiatan. Jika lebih dari satu hari, bisa ditambahkan rentang tanggal. Contoh: 13 Mei 2025 atau 13–15 Mei 2025."
              />
              <InfoItem
                number="3"
                title="Audience"
                description="Pihak atau kelompok sasaran peserta Bimtek yang diundang atau menjadi target kegiatan. Contoh: Penyuluh kehutanan, petugas BPDAS, masyarakat desa hutan, dan perwakilan LSM lingkungan."
              />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-secondary-green mb-2 font-bold">Tempat</Label>
                      <Textarea
                        className="border-border"
                        value=""
                        onChange={(e) => form.setField("tempat", e.target.value)}
                        placeholder="Aula BPDAS Cimanuk-Citanduy, Kota Tasikmalaya, Jawa Barat"></Textarea>
                    </div>
                    <InputField label="Tanggal" value={form.tanggal} onChange={(e) => form.setField("tanggal", e.target.value)} error={errors.tanggal} type="date" />
                    <div>
                      <Label className="text-secondary-green mb-2 font-bold">Audience</Label>
                      <Textarea
                        className="border-border"
                        value=""
                        onChange={(e) => form.setField("audience", e.target.value)}
                        placeholder="Penyuluh kehutanan, petugas BPDAS, masyarakat desa hutan, dan perwakilan LSM lingkungan."></Textarea>
                    </div>
                  </CardContent>
                </form>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border p-4 mb-2 bg-card">
          <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-0">
            <div className="col-span-12 lg:col-span-6 border-r space-y-4 pl-4">
              <div className="title text-base-green flex items-center gap-1">
                <IconFrame />
                <h5 className="font-bold">Dokumentasi</h5>
              </div>
              <InfoItem
                number="1"
                title="Upload Materi Bimtek"
                description="Tempat untuk mengunggah file presentasi, modul, atau dokumen materi pelatihan. Contoh file: Materi_Teknik_Penanaman_Mangrove.pdf"
              />
              <InfoItem number="2" title="Upload Video Bimtek" description="File dokumentasi video pelaksanaan kegiatan. Contoh file: Video_Sesi1_Pembukaan_Bimtek.mp4." />
              <InfoItem
                number="3"
                title="Upload Foto Bimtek"
                description="Dokumentasi visual dalam bentuk foto kegiatan Bimtek. Contoh file: Foto_Peserta_Bimtek_Kegiatan_Lapangan.jpg."
              />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <InputFile
                      id="materi_bimtek"
                      name="materi_bimtek[]"
                      label="Upload Materi Bimtek"
                      multiple={false}
                      accept={{ "application/pdf": [".pdf"] }}
                      maxSize={2 * 1024 * 1024}
                    />
                  </CardContent>
                  <CardContent className="space-y-4">
                    <InputFile
                      id="vidio_bimtek"
                      name="vidio_bimtek[]"
                      label="Upload Vidio Bimtek"
                      multiple={false}
                      accept={{ "application/pdf": [".mp4"] }}
                      maxSize={2 * 1024 * 1024}
                    />
                  </CardContent>
                  <CardContent className="space-y-4">
                    <InputFile
                      id="materi_bimtek"
                      name="materi_bimtek[]"
                      label="Upload Foto Bimtek"
                      multiple={false}
                      accept={{ "application/pdf": [".jpg"] }}
                      maxSize={2 * 1024 * 1024}
                    />
                  </CardContent>
                </form>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border p-4 mb-2 bg-card">
          <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-0">
            <div className="col-span-12 lg:col-span-6 border-r space-y-4 pl-4">
              <div className="title text-base-green flex items-center gap-1">
                <IconFrame />
                <h5 className="font-bold">Evaluasi</h5>
              </div>
              <InfoItem
                number="1"
                title="Evaluasi"
                description="Ringkasan hasil evaluasi dari peserta atau panitia, seperti kepuasan, masukan, dan rekomendasi. Contoh: Sebagian besar peserta merasa terbantu dengan materi praktik lapangan. Disarankan menambah waktu untuk diskusi."
              />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-secondary-green mb-2 font-bold">Evaluasi</Label>
                      <Textarea
                        className="border-border"
                        value=""
                        onChange={(e) => form.setField("evaluasi", e.target.value)}
                        placeholder="Sebagian besar peserta merasa terbantu dengan materi praktik lapangan. Disarankan menambah waktu untuk diskusi."></Textarea>
                    </div>
                  </CardContent>
                </form>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border p-4 mb-2 bg-card">
          <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-0">
            <div className="col-span-12 lg:col-span-6 border-r space-y-4 pl-4">
              <div className="title text-base-green flex items-center gap-1">
                <IconFrame />
                <h5 className="font-bold">Catatan</h5>
              </div>
              <InfoItem
                number="1"
                title="Catatan"
                description="Informasi tambahan atau kondisi khusus selama kegiatan. Contoh: Kegiatan berlangsung secara hybrid., terdapat kendala teknis saat sesi materi kedua."
              />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-secondary-green mb-2 font-bold">Catatan</Label>
                      <Textarea
                        className="border-border"
                        value=""
                        onChange={(e) => form.setField("catatan", e.target.value)}
                        placeholder="Kegiatan berlangsung secara hybrid. Terdapat kendala teknis saat sesi materi kedua."></Textarea>
                    </div>
                  </CardContent>
                </form>
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
