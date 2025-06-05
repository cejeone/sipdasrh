"use client";

import { setupInterceptor } from "lib/axios";
import { useRouter } from "next/navigation";
import { integrasiFormSchema } from "../lib/validation";
import { createIntegrasi, editIntegrasi } from "../lib/action";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import InputField from "@/components/InputField";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Integrasi } from "@/model/admin/Integrasi";
import InfoItem from "@/components/InfoItem";
import { IconFrame } from "@tabler/icons-react";
import { Lov } from "@/model/admin/Lov";
import SelectCombobox from "@/components/SelectCombobox";

interface FormIntegrasiProps {
  type?: "ADD" | "EDIT";
  defaultValues?: Integrasi | null;
  dataStatus: Lov[];
}

export interface FormIntegrasiRef {
  submit: () => void;
}

const FormIntegrasiPage = forwardRef<FormIntegrasiRef, FormIntegrasiProps>(({ type, defaultValues, dataStatus }, ref) => {
  // setupInterceptor();
  const router = useRouter();

  const [url, setUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [tipe, setTipe] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [statusId, setStatusId] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (type == "EDIT" && defaultValues) {
      setUrl(defaultValues.url || "");
      setApiKey(defaultValues.apiKey || "");
      setTipe(defaultValues.tipe || "");
      setDeskripsi(defaultValues.deskripsi || "");
      setStatusId(String(defaultValues?.status?.id ?? ""));
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

    const safeNumber = (value: string) => (value.trim() === "" ? undefined : Number(value));

    try {
      const validation = integrasiFormSchema.safeParse({
        url,
        apiKey,
        tipe,
        deskripsi,
        statusId: safeNumber(statusId),
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
      <Card className="border border-border p-4 mb-2 bg-card">
        <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-0">
          <div className="col-span-12 lg:col-span-6 border-r space-y-4 pl-4">
            <div className="title text-base-green flex items-center gap-1">
              <IconFrame />
              <h5 className="font-bold">Informasi</h5>
            </div>
            <InfoItem number="1" title="URL" description="Alamat endpoint sistem atau layanan pihak ketiga yang akan dihubungkan." />
            <InfoItem number="2" title="API Key" description="Kunci otentikasi yang digunakan untuk mengakses API secara aman." />
            <InfoItem number="3" title="Tipe" description="Jenis koneksi atau layanan yang digunakan, seperti REST, Webhook, dll." />
            <InfoItem number="4" title="Deskripsi" description="Penjelasan singkat mengenai tujuan atau fungsi dari konfigurasi ini." />
            <InfoItem number="5" title="Status" description="Menentukan status konfigurasi, misalnya Aktif atau Nonaktif." />
          </div>

          <div className="col-span-12 lg:col-span-6">
            <Card>
              <CardContent className="space-y-4">
                <InputField label="URL" value={url} onChange={(e) => setUrl(e.target.value)} error={errors.url} />
                <InputField label="API Key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} error={errors.apiKey} />
                <InputField label="Tipe" value={tipe} onChange={(e) => setTipe(e.target.value)} error={errors.tipe} />

                <div>
                  <Label className="text-secondary-green mb-2 font-bold">Deskripsi</Label>
                  <Textarea className="border-border" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} placeholder="Masukkan Deskripsi" />
                  {errors.deskripsi && <p className="text-sm text-base-destructive mt-1">{errors.keterangan}</p>}
                </div>

                <SelectCombobox
                  label="Status"
                  value={statusId}
                  onChange={setStatusId}
                  options={dataStatus.map((lov) => ({
                    label: lov.nilai,
                    value: String(lov.id),
                  }))}
                  error={errors.statusId}
                />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </form>
  );
});

export default FormIntegrasiPage;
