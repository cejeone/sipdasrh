"use client";

import { setupInterceptor } from "lib/axios";
import { useRouter } from "next/navigation";
import { integrasiFormSchema } from "../lib/validation";
import { createIntegrasi, editIntegrasi } from "../lib/action";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { CardContent } from "@/components/ui/card";
import InputField from "@/components/InputField";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Integrasi } from "@/model/admin/integrasi/Integrasi";

interface FormIntegrasiProps {
  type?: "ADD" | "EDIT";
  defaultValues?: Integrasi | null;
}

export interface FormIntegrasiRef {
  submit: () => void;
}

const FormIntegrasiPage = forwardRef<FormIntegrasiRef, FormIntegrasiProps>(({ type, defaultValues }, ref) => {
  // setupInterceptor();
  const router = useRouter();

  const [url, setUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [tipe, setTipe] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [status, setStatus] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (type == "EDIT" && defaultValues) {
      setUrl(defaultValues.url || "");
      setApiKey(defaultValues.apiKey || "");
      setTipe(defaultValues.tipe || "");
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

  const handleIntegrasi = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validation = integrasiFormSchema.safeParse({
        url,
        apiKey,
        tipe,
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
        const integrasi = await createIntegrasi(validData);

        router.push("/cms/integrasi");
        toast.success("Berhasil menambahkan data");
      } else {
        if (defaultValues?.id) {
          await editIntegrasi(validData, defaultValues.id);

          router.push("/cms/integrasi");
          toast.success("Berhasil memperbaharui data");
        }
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menyimpan dokumen:", error);
      toast.error("Terjadi kesalahan saat menyimpan data");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleIntegrasi}>
      <CardContent className="space-y-4">
        <InputField label="URL" value={url} onChange={(e) => setUrl(e.target.value)} error={errors.url} />
        <InputField label="API Key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} error={errors.apiKey} />
        <InputField label="Tipe" value={tipe} onChange={(e) => setTipe(e.target.value)} error={errors.tipe} />

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
              <SelectItem value="Nonaktif">Nonaktif</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && <p className="text-sm text-base-destructive mt-1">{errors.status}</p>}
        </div>
      </CardContent>
    </form>
  );
});

export default FormIntegrasiPage;
