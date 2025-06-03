"use client";

import { setupInterceptor } from "lib/axios";
import { useRouter } from "next/navigation";
import { peranFormSchema } from "../lib/validation";
import { createPeran, editPeran } from "../lib/action";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { CardContent } from "@/components/ui/card";
import InputField from "@/components/InputField";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Peran } from "@/model/admin/manajemen-pengguna/Peran";

interface FormPeranProps {
  type?: "ADD" | "EDIT";
  defaultValues?: Peran | null;
}

export interface FormPeranRef {
  submit: () => void;
}

const FormPeranPage = forwardRef<FormPeranRef, FormPeranProps>(({ type, defaultValues }, ref) => {
  // setupInterceptor();
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [status, setStatus] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (type == "EDIT" && defaultValues) {
      setNama(defaultValues.nama || "");
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

  const handlePeran = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validation = peranFormSchema.safeParse({
        nama,
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
        const peran = await createPeran(validData);

        router.push("/cms/peran");
        toast.success("Berhasil menambahkan data");
      } else {
        if (defaultValues?.id) {
          await editPeran(validData, defaultValues.id);

          router.push("/cms/peran");
          toast.success("Berhasil memperbaharui data");
        }
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menyimpan dokumen:", error);
      toast.error("Terjadi kesalahan saat menyimpan data");
    }
  };

  return (
    <form ref={formRef} onSubmit={handlePeran}>
      <CardContent className="space-y-4">
        <InputField label="Nama" value={nama} onChange={(e) => setNama(e.target.value)} error={errors.nama} />

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
            </SelectContent>
          </Select>
          {errors.status && <p className="text-sm text-base-destructive mt-1">{errors.status}</p>}
        </div>
      </CardContent>
    </form>
  );
});

export default FormPeranPage;
