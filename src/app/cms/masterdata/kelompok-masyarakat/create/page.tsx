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
import { Users2 } from "lucide-react";
import InfoItem from "@/components/InfoItem";
import InputField from "@/components/InputField";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";

// === Zustand Store ===
type FormState = {
  id: string;
  nama_kelompok_masyarakat: string;
  nama_sk: string;
  tanggal_sk: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  desa: string;
  alamat: string;
  telepon: string;
  jumlah_kta: string;
  status: string;
  setField: (field: keyof FormState, value: string) => void;
};

const useForm = create<FormState>((set) => ({
  id: "",
  nama_kelompok_masyarakat: "",
  nama_sk: "",
  tanggal_sk: "",
  provinsi: "",
  kabupaten: "",
  kecamatan: "",
  desa: "",
  alamat: "",
  telepon: "",
  jumlah_kta: "",
  status: "",
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
}));

const FormSchema = z.object({
  id: z.string().min(1, "Wajib diisi"),
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
            <Breadcrumbs items={[{ label: "Masterdata", href: "" }, { label: "Kelompok Masyarakat", href: "/cms/masterdata/kelompok-masyarakat" }, { label: "Buat Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <Users2 />
              <h1 className="text-2xl font-bold">Kelompok Masyarakat</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Tambah
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk membuat data kelompok masyarakat</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Button type="submit" variant="green" onClick={handleSubmit}>
              <IconDeviceFloppy /> Simpan
            </Button>
            <Link href="/cms/masterdata/kelompok-masyarakat">
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
                <InfoItem number="1" title="Nama Kelompok Masyarakat" description="Masukkan nama kelompok masyarakat yang menerima bantuan pembibitan." />
                <InfoItem
                  number="2"
                  title="Nomor SK Penetapan"
                  description="Masukkan nomor Surat Keputusan (SK) resmi yang menetapkan kelompok masyarakat sebagai penerima program."
                />
                <InfoItem number="3" title="Tanggal SK Penetapan" description="Pilih tanggal diterbitkannya Surat Keputusan (SK) penetapan kelompok masyarakat." />
                <InfoItem number="4" title="Provinsi" description="Pilih nama provinsi tempat kelompok tani berlokasi." />
                <InfoItem number="5" title="Kabupaten/Kota" description="Pilih nama kabupaten atau kota tempat kelompok tani berada dari daftar yang tersedia." />
                <InfoItem number="6" title="Kecamatan" description="Pilih nama kecamatan tempat kelompok tani berada dari daftar yang tersedia." />
                <InfoItem number="7" title="Kelurahan/Desa" description="Pilih nama kelurahan atau desa tempat kelompok tani berada dari daftar yang tersedia." />
                <InfoItem number="8" title="Alamat" description="Masukkan alamat lengkap lokasi kelompok masyarakat." />
                <InfoItem number="9" title="Telepon" description="Masukkan nomor telepon yang dapat dihubungi terkait kelompok masyarakat." />
              </div>

              <div className="col-span-12 lg:col-span-6">
                <Card>
                  <CardContent className="space-y-4">
                    <InputField
                      label="Nama Kelompok Masyarakat"
                      value={form.nama_kelompok_masyarakat}
                      onChange={(e) => form.setField("nama_kelompok_masyarakat", e.target.value)}
                      error={errors.nama_kelompok_masyarakat}
                    />
                    <InputField label="Nama SK Penetapan" value={form.nama_sk} onChange={() => {}} error={errors.nama_sk} />
                    <InputField label="Tanggal SK Penetapan" value={form.tanggal_sk} onChange={() => {}} error={errors.tanggal_sk} type="date" />

                    <div>
                      <Label className="text-secondary-green mb-2 font-bold">Provinsi</Label>
                      <Select value={form.provinsi} onValueChange={(val) => form.setField("provinsi", val)}>
                        <SelectTrigger className="w-full border-border">
                          <SelectValue placeholder="Pilih salah satu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="jawa timur">Jawa Timur</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                    </div>
                    <div>
                      <Label className="text-secondary-green mb-2 font-bold">Kabupaten</Label>
                      <Select value={form.kabupaten} onValueChange={(val) => form.setField("kabupaten", val)}>
                        <SelectTrigger className="w-full border-border">
                          <SelectValue placeholder="Pilih salah satu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="jawa timur">Jawa Timur</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                    </div>
                    <div>
                      <Label className="text-secondary-green mb-2 font-bold">Kecamatan</Label>
                      <Select value={form.kecamatan} onValueChange={(val) => form.setField("kecamatan", val)}>
                        <SelectTrigger className="w-full border-border">
                          <SelectValue placeholder="Pilih salah satu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="jawa timur">Jawa Timur</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                    </div>
                    <div>
                      <Label className="text-secondary-green mb-2 font-bold">Kelurahan/Desa</Label>
                      <Select value={form.desa} onValueChange={(val) => form.setField("desa", val)}>
                        <SelectTrigger className="w-full border-border">
                          <SelectValue placeholder="Pilih salah satu" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="jawa timur">Jawa Timur</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                    </div>
                    <InputField label="Alamat" value={form.alamat} onChange={() => {}} error={errors.alamat} />
                    <InputField label="Telepon" value={form.telepon} onChange={() => {}} error={errors.telepon} />
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
