"use client";

import { setupInterceptor } from "lib/axios";
import { useRouter } from "next/navigation";
import { integrasiFormSchema } from "../lib/validation";
import { createKonfigurasiSistem, editKonfigurasiSistem } from "../lib/action";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { CardContent } from "@/components/ui/card";
import InputField from "@/components/InputField";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { KonfigurasiSistem } from "@/model/admin/konfigurasi-sistem/KonfigurasiSistem";

interface FormKonfigurasiSistemProps {
  type?: "ADD" | "EDIT";
  defaultValues?: KonfigurasiSistem | null;
}

export interface FormKonfigurasiSistemRef {
  submit: () => void;
}

const FormKonfigurasiSistemPage = forwardRef<FormKonfigurasiSistemRef, FormKonfigurasiSistemProps>(({ type, defaultValues }, ref) => {
  // setupInterceptor();
  const router = useRouter();

  const [tipe, setTipe] = useState("");
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [status, setStatus] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (type == "EDIT" && defaultValues) {
      setTipe(defaultValues.tipe || "");
      setKey(defaultValues.key || "");
      setValue(defaultValues.value || "");
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

  const handleKonfigurasiSistem = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validation = integrasiFormSchema.safeParse({
        tipe,
        key,
        value,
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
        const integrasi = await createKonfigurasiSistem(validData);

        router.push("/cms/konfigurasi-sistem");
        toast.success("Berhasil menambahkan data");
      } else {
        if (defaultValues?.id) {
          await editKonfigurasiSistem(validData, defaultValues.id);

          router.push("/cms/konfigurasi-sistem");
          toast.success("Berhasil memperbaharui data");
        }
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menyimpan dokumen:", error);
      toast.error("Terjadi kesalahan saat menyimpan data");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleKonfigurasiSistem}>
      <CardContent className="space-y-4">
        <InputField label="Tipe" value={tipe} onChange={(e) => setTipe(e.target.value)} error={errors.tipe} />
        <InputField label="Key" value={key} onChange={(e) => setKey(e.target.value)} error={errors.key} />
        <InputField label="Value" value={value} onChange={(e) => setValue(e.target.value)} error={errors.value} />

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

export default FormKonfigurasiSistemPage;
