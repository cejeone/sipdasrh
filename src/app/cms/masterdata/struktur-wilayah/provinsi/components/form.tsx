"use client";

import { setupInterceptor } from "lib/axios";
import { useRouter } from "next/navigation";
import { provinsiFormSchema } from "../lib/validation";
import { createProvinsi, editProvinsi } from "../lib/action";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { CardContent } from "@/components/ui/card";
import InputField from "@/components/InputField";
import { toast } from "sonner";
import { Provinsi } from "@/model/admin/struktur-wilayah/Provinsi";

interface FormProvinsiProps {
  type?: "ADD" | "EDIT";
  defaultValues?: Provinsi | null;
}

export interface FormProvinsiRef {
  submit: () => void;
}

const FormProvinsiPage = forwardRef<FormProvinsiRef, FormProvinsiProps>(({ type, defaultValues }, ref) => {
  // setupInterceptor();
  const router = useRouter();

  const [namaProvinsi, setNamaProvinsi] = useState("");
  const [kodeDepdagri, setKodeDepdagri] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (type == "EDIT" && defaultValues) {
      setNamaProvinsi(defaultValues.namaProvinsi || "");
      setKodeDepdagri(defaultValues.kodeDepdagri || "");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validation = provinsiFormSchema.safeParse({
        namaProvinsi,
        kodeDepdagri,
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
        const provinsi = await createProvinsi(validData);

        router.push("/cms/masterdata/struktur-wilayah/provinsi");
        toast.success("Berhasil menambahkan data");
      } else {
        if (defaultValues?.id) {
          await editProvinsi(validData, defaultValues.id);

          router.push("/cms/masterdata/struktur-wilayah/provinsi");
          toast.success("Berhasil memperbaharui data");
        }
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menyimpan data:", error);
      toast.error("Terjadi kesalahan saat menyimpan data");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        <InputField label="Nama Provinsi" value={namaProvinsi} onChange={(e) => setNamaProvinsi(e.target.value)} error={errors.namaProvinsi} />

        <InputField label="Kode DEPDAGRI" value={kodeDepdagri} onChange={(e) => setKodeDepdagri(e.target.value)} error={errors.kodeDepdagri} />
      </CardContent>
    </form>
  );
});

export default FormProvinsiPage;
