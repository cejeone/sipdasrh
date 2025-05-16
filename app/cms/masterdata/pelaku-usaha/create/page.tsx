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
import { Building } from "lucide-react";
import InfoItem from "@/components/InfoItem";
import InputField from "@/components/InputField";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";

// === Zustand Store ===
type FormState = {
  id: string;
  kategori_pelaku_usaha: string;
  nama_badan_usaha: string;
  nib: string;
  nomor_sertifikat: string;
  ruang_lingkup_usaha: string;
  nama_direktur: string;
  nomor_hp: string;
  alamat: string;
  setField: (field: keyof FormState, value: string) => void;
};

const useForm = create<FormState>((set) => ({
  id: "",
  kategori_pelaku_usaha: "",
  nama_badan_usaha: "",
  nib: "",
  nomor_sertifikat: "",
  ruang_lingkup_usaha: "",
  nama_direktur: "",
  nomor_hp: "",
  alamat: "",
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
}));

const FormSchema = z.object({
  id: z.string().min(1, "Wajib diisi"),
  nomor_bast: z.string().min(1, "Wajib diisi"),
  kegiatan: z.string().min(1, "Wajib diisi"),
  kontrak: z.string().min(1, "Wajib diisi"),
  tanggal: z.string().min(1, "Wajib diisi"),
  deskripsi: z.string().min(1, "Wajib diisi"),
  dokumen: z.string().min(1, "Wajib diisi"),
  status: z.string().min(1, "Wajib diisi"),
});

export default function Form() {
  const form = useForm();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = FormSchema.safeParse(form);
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
            <Breadcrumbs items={[{ label: "Masterdata", href: "" }, { label: "Pelaku Usaha", href: "/cms/masterdata/pelaku-usaha" }, { label: "Buat Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <Building />
              <h1 className="text-2xl font-bold">Pelaku Usaha</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Tambah
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk membuat data pelaku usaha</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Button type="submit" variant="green" onClick={handleSubmit}>
              <IconDeviceFloppy /> Simpan
            </Button>
            <Link href="/cms/masterdata/pelaku-usaha">
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
        <form onSubmit={handleSubmit}>
          <Card className="border border-border p-4 mb-2 bg-card">
            <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-0">
              <div className="col-span-12 lg:col-span-6 border-r space-y-4 pl-4">
                <div className="title text-base-green flex items-center gap-1">
                  <IconFrame />
                  <h5 className="font-bold">Informasi</h5>
                </div>
                <InfoItem number="1" title="Kategori Pelaku Usaha" description="Pilih jenis usaha yang sesuai dengan badan usaha Anda, misalnya Perseorangan, PT, atau CV." />
                <InfoItem number="2" title="Nama Badan Usaha" description="Isi dengan nama resmi badan usaha sesuai dokumen legal." />
                <InfoItem number="3" title="Nomor Induk Berusaha (NIB)" description="Masukkan nomor yang diterbitkan oleh OSS setelah pendaftaran usaha." />
                <InfoItem number="4" title="Nomor Sertifikat Standar" description="Isi dengan nomor sertifikat yang menunjukkan badan usaha telah memenuhi standar tertentu." />
                <InfoItem number="5" title="Ruang Lingkup Usaha" description="Tuliskan bidang usaha utama yang dijalankan sesuai KBLI." />
              </div>

              <div className="col-span-12 lg:col-span-6">
                <Card>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-secondary-green mb-2 font-bold">Kategori Pelaku Usaha</Label>
                      <Select value={form.kategori_pelaku_usaha} onValueChange={(val) => form.setField("kategori_pelaku_usaha", val)}>
                        <SelectTrigger className="w-full border-border">
                          <SelectValue placeholder="Pilih salah satu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Perseorangan">Perseorangan</SelectItem>
                          <SelectItem value="Perusahaan">Perusahaan</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                    </div>
                    <InputField
                      label="Nama Badan Usaha"
                      value={form.nama_badan_usaha}
                      onChange={(e) => form.setField("nama_badan_usaha", e.target.value)}
                      error={errors.nama_badan_usaha}
                    />
                    <InputField label="NIB" value={form.nib} onChange={() => {}} error={errors.nib} />
                    <InputField label="Nomor Sertifikat Standar" value={form.nomor_sertifikat} onChange={() => {}} error={errors.nomor_sertifikat} />
                    <InputField label="Ruang Lingkup Usaha" value={form.ruang_lingkup_usaha} onChange={() => {}} error={errors.ruang_lingkup_usaha} />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border p-4 mb-2 bg-card">
            <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-0">
              <div className="col-span-12 lg:col-span-6 border-r space-y-4 pl-4">
                <div className="title text-base-green flex items-center gap-1">
                  <IconFrame />
                  <h5 className="font-bold">Kontak</h5>
                </div>
                <InfoItem number="1" title="Nama Direktur" description="Isi dengan nama lengkap direktur utama atau penanggung jawab badan usaha." />
                <InfoItem number="2" title="Nomor HP Direktur" description="Masukkan nomor ponsel aktif yang bisa dihubungi." />
                <InfoItem number="3" title="Alamat" description="Tulis alamat lengkap kantor atau lokasi usaha sesuai dokumen resmi." />
              </div>

              <div className="col-span-12 lg:col-span-6">
                <Card>
                  <CardContent className="space-y-4">
                    <InputField label="Nama Direktur" value={form.nama_direktur} onChange={(e) => form.setField("nama_direktur", e.target.value)} error={errors.nama_direktur} />
                    <InputField label="Nomor HP" value={form.nomor_hp} onChange={() => {}} error={errors.nomor_hp} />
                    <InputField label="Alamat" value={form.alamat} onChange={() => {}} error={errors.alamat} />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  );
}
