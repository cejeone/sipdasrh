"use client";

import { setupInterceptor } from "lib/axios";
import { useRouter } from "next/navigation";
import { lovFormSchema } from "../lib/validation";
import { createLov, editLov } from "../lib/action";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { CardContent } from "@/components/ui/card";
import InputField from "@/components/InputField";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Lov } from "@/model/admin/Lov";

interface FormLovProps {
  type?: "ADD" | "EDIT";
  defaultValues?: Lov | null;
}

export interface FormLovRef {
  submit: () => void;
}

const FormLovPage = forwardRef<FormLovRef, FormLovProps>(({ type, defaultValues }, ref) => {
  // setupInterceptor();
  const router = useRouter();

  const [namaKategori, setNamaKategori] = useState("");
  const [nilai, setNilai] = useState("");
  const [kelas, setKelas] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [status, setStatus] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (type == "EDIT" && defaultValues) {
      setNamaKategori(defaultValues.namaKategori || "");
      setNilai(defaultValues.nilai || "");
      setKelas(defaultValues.kelas || "");
      setDeskripsi(defaultValues.deskripsi || "");
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

  const handleLov = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validation = lovFormSchema.safeParse({
        namaKategori,
        nilai,
        kelas,
        deskripsi,
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
        const lov = await createLov(validData);

        router.push("/cms/lov");
        toast.success("Berhasil menambahkan data");
      } else {
        if (defaultValues?.id) {
          await editLov(validData, defaultValues.id);

          router.push("/cms/lov");
          toast.success("Berhasil memperbaharui data");
        }
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menyimpan dokumen:", error);
      toast.error("Terjadi kesalahan saat menyimpan data");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleLov}>
      <CardContent className="space-y-4">
        <InputField label="Nama Kategori" value={namaKategori} onChange={(e) => setNamaKategori(e.target.value)} error={errors.namaKategori} />
        <InputField label="Nilai" value={nilai} onChange={(e) => setNilai(e.target.value)} error={errors.nilai} />
        <InputField label="Kelas" value={kelas} onChange={(e) => setKelas(e.target.value)} error={errors.kelas} />

        <div>
          <Label className="text-secondary-green mb-2 font-bold">Deskripsi</Label>
          <Textarea className="border-border" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} placeholder="Masukkan Deskripsi" />
          {errors.deskripsi && <p className="text-sm text-base-destructive mt-1">{errors.keterangan}</p>}
        </div>

        <div>
          <Label className="text-secondary-green mb-2 font-bold">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full border-border">
              <SelectValue placeholder="Pilih salah satu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Aktif">Aktif</SelectItem>
              <SelectItem value="TidakAktif">Tidak Aktif</SelectItem>
              <SelectItem value="Terhapus">Terhapus</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && <p className="text-sm text-base-destructive mt-1">{errors.status}</p>}
        </div>
      </CardContent>
    </form>
  );
});

export default FormLovPage;
