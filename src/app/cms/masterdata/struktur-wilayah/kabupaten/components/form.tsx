"use client";

import { setupInterceptor } from "lib/axios";
import { useRouter } from "next/navigation";
import { provinsiFormSchema } from "../lib/validation";
import { createKabupaten, editKabupaten } from "../lib/action";
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { CardContent } from "@/components/ui/card";
import InputField from "@/components/InputField";
import { toast } from "sonner";
import { KabupatenKota } from "@/model/admin/struktur-wilayah/KabupatenKota";
import { Provinsi } from "@/model/admin/struktur-wilayah/Provinsi";
import SelectCombobox from "@/components/SelectCombobox";

interface FormKabupatenProps {
  type?: "ADD" | "EDIT";
  defaultValues?: KabupatenKota | null;
  provinsiList: Provinsi[];
}

export interface FormKabupatenRef {
  submit: () => void;
}

const FormKabupatenPage = forwardRef((props: FormKabupatenProps, ref: ForwardedRef<FormKabupatenRef>) => {
  const { provinsiList, defaultValues, type = "CREATE" } = props;
  // setupInterceptor();
  const router = useRouter();

  const [kabupatenKota, setKabupatenKota] = useState("");
  const [kodeDepdagri, setKodeDepdagri] = useState("");
  const [provinsiId, setProvinsiId] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (type == "EDIT" && defaultValues) {
      setProvinsiId(String(defaultValues?.provinsi?.id ?? ""));
      setKabupatenKota(defaultValues?.kabupatenKota ?? "");
      setKodeDepdagri(defaultValues?.kodeDepdagri ?? "");
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

    const safeNumber = (value: string) => (value.trim() === "" ? undefined : Number(value));

    try {
      const validation = provinsiFormSchema.safeParse({
        kabupatenKota,
        kodeDepdagri,
        provinsiId: safeNumber(provinsiId),
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
        await createKabupaten(validData);

        router.push("/cms/masterdata/struktur-wilayah/kabupaten");
        toast.success("Berhasil menambahkan data");
      } else {
        if (defaultValues?.id) {
          await editKabupaten(validData, defaultValues.id);

          router.push("/cms/masterdata/struktur-wilayah/kabupaten");
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
        <SelectCombobox
          label="Provinsi"
          value={provinsiId}
          onChange={setProvinsiId}
          options={provinsiList.map((prov) => ({
            label: prov.namaProvinsi,
            value: String(prov.id),
          }))}
          error={errors.provinsiId}
        />

        <InputField label="Nama Kabupaten / Kota" value={kabupatenKota} onChange={(e) => setKabupatenKota(e.target.value)} error={errors.kabupatenKota} />

        <InputField label="Kode DEPDAGRI" value={kodeDepdagri} onChange={(e) => setKodeDepdagri(e.target.value)} error={errors.kodeDepdagri} />
      </CardContent>
    </form>
  );
});

export default FormKabupatenPage;
