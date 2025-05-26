"use client";

import { setupInterceptor } from "lib/axios";
import { useRouter } from "next/navigation";
import { programFormSchema } from "../lib/validation";
import { createProgram, editProgram } from "../lib/action";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { CardContent } from "@/components/ui/card";
import InputField from "@/components/InputField";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Program } from "@/model/pepdas/Program";
import { Textarea } from "@/components/ui/textarea";

interface FormProgramProps {
  type?: "ADD" | "EDIT";
  defaultValues?: Program | null;
}

export interface FormProgramRef {
  submit: () => void;
}

const FormProgramPage = forwardRef<FormProgramRef, FormProgramProps>(({ type, defaultValues }, ref) => {
  // setupInterceptor();
  const router = useRouter();

  const [direktorat, setDirektorat] = useState("");
  const [kategori, setKategori] = useState("");
  const [nama, setNama] = useState("");
  const [tahunRencana, setTahunRencana] = useState("");
  const [totalAnggaran, setTotalAnggaran] = useState("");
  const [status, setStatus] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (type == "EDIT" && defaultValues) {
      setDirektorat(defaultValues.direktorat || "");
      setKategori(defaultValues.kategori || "");
      setNama(defaultValues.nama || "");
      setTahunRencana(String(defaultValues.tahunRencana ?? ""));
      setTotalAnggaran(String(defaultValues.totalAnggaran ?? ""));
      setStatus(defaultValues.status || "");
    }
  }, [type, defaultValues]);

  // btn submit
  useImperativeHandle(ref, () => ({
    submit: () => {
      formRef.current?.requestSubmit();
    },
  }));

  useImperativeHandle(ref, () => ({
    submit: () => {
      formRef.current?.requestSubmit();
    },
  }));
  // btn submit

  const handleGeoservice = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const safeNumber = (value: string) => (value.trim() === "" ? undefined : Number(value));

      const validation = programFormSchema.safeParse({
        direktorat,
        kategori,
        nama,
        tahunRencana: safeNumber(tahunRencana),
        totalAnggaran: safeNumber(totalAnggaran),
        status,
      });

      if (!validation.success) {
        const fieldErrors: Record<string, string> = {};
        validation.error.issues.forEach((issue) => {
          const field = issue.path[0] as string;
          fieldErrors[field] = issue.message;
        });
        setErrors(fieldErrors);
        return;
      }

      const validData = validation.data;

      if (type == "ADD") {
        await createProgram(validData);

        router.push("/cms/pepdas/rencana-kerja/program");
        toast.success("Berhasil menambahkan data");
      } else {
        if (defaultValues?.id) {
          await editProgram(validData, defaultValues.id);

          router.push("/cms/pepdas/rencana-kerja/program");
          toast.success("Berhasil memperbaharui data");
        }
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menyimpan dokumen:", error);
      toast.error("Terjadi kesalahan saat menyimpan data");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleGeoservice}>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-secondary-green mb-2 font-bold">Direktorat</Label>
          <Select value={direktorat} onValueChange={setDirektorat}>
            <SelectTrigger className="w-full border-border">
              <SelectValue placeholder="Pilih salah satu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PEPDAS">PEPDAS</SelectItem>
              <SelectItem value="SEKDITJEN">SEKDITJEN</SelectItem>
              <SelectItem value="RH">RH</SelectItem>
              <SelectItem value="RM">RM</SelectItem>
              <SelectItem value="TKTRH">TKTRH</SelectItem>
              <SelectItem value="PPTH">PPTH</SelectItem>
            </SelectContent>
          </Select>
          {errors.direktorat && <p className="text-sm text-base-destructive mt-1">{errors.direktorat}</p>}
        </div>

        <div>
          <Label className="text-secondary-green mb-2 font-bold">Kategori</Label>
          <Select value={kategori} onValueChange={setKategori}>
            <SelectTrigger className="w-full border-border">
              <SelectValue placeholder="Pilih salah satu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SEMINAR">SEMINAR</SelectItem>
              <SelectItem value="BIMTEK">BIMTEK</SelectItem>
              <SelectItem value="PENGADAAN BARANG/JASA">PENGADAAN BARANG/JASA</SelectItem>
            </SelectContent>
          </Select>
          {errors.kategori && <p className="text-sm text-base-destructive mt-1">{errors.kategori}</p>}
        </div>

        <div>
          <Label className="text-secondary-green mb-2 font-bold">Nama</Label>
          <Textarea className="border-border" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Masukkan Nama" />
          {errors.nama && <p className="text-sm text-base-destructive mt-1">{errors.nama}</p>}
        </div>

        <InputField label="Tahun Rencana" type="number" value={tahunRencana} onChange={(e) => setTahunRencana(e.target.value)} error={errors.tahunRencana} />

        <InputField label="Total Anggaran" type="number" value={totalAnggaran} onChange={(e) => setTotalAnggaran(e.target.value)} error={errors.totalAnggaran} />

        <div>
          <Label className="text-secondary-green mb-2 font-bold">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full border-border">
              <SelectValue placeholder="Pilih salah satu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Aktif">Aktif</SelectItem>
              <SelectItem value="Tertunda">Tertunda</SelectItem>
              <SelectItem value="Selesai">Selesai</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && <p className="text-sm text-base-destructive mt-1">{errors.status}</p>}
        </div>
      </CardContent>
    </form>
  );
});

export default FormProgramPage;
