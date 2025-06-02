"use client";

import { setupInterceptor } from "lib/axios";
import { useRouter } from "next/navigation";
import { kecamatanFormSchema } from "../lib/validation";
import { createKecamatan, editKecamatan } from "../lib/action";
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { CardContent } from "@/components/ui/card";
import InputField from "@/components/InputField";
import { toast } from "sonner";
import { KabupatenKota } from "@/model/admin/struktur-wilayah/KabupatenKota";
import SelectCombobox from "@/components/SelectCombobox";
import { Kecamatan } from "@/model/admin/struktur-wilayah/Kecamatan";

interface FormKecamatanProps {
  type?: "ADD" | "EDIT";
  defaultValues?: Kecamatan | null;
  kabupatenKotaList: KabupatenKota[];
}

export interface FormKecamatanRef {
  submit: () => void;
}

const FormKecamatanPage = forwardRef((props: FormKecamatanProps, ref: ForwardedRef<FormKecamatanRef>) => {
  const { kabupatenKotaList, defaultValues, type = "CREATE" } = props;
  // setupInterceptor();
  const router = useRouter();

  const [kecamatan, setKecamatan] = useState("");
  const [kodeDepdagri, setKodeDepdagri] = useState("");
  const [kabupatenKotaId, setKabupatenKotaId] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (type == "EDIT" && defaultValues) {
      setKabupatenKotaId(String(defaultValues?.kabupatenKota?.id ?? ""));
      setKecamatan(defaultValues?.kecamatan ?? "");
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
      const validation = kecamatanFormSchema.safeParse({
        kecamatan,
        kodeDepdagri,
        kabupatenKotaId: safeNumber(kabupatenKotaId),
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
        await createKecamatan(validData);

        router.push("/cms/masterdata/struktur-wilayah/kecamatan");
        toast.success("Berhasil menambahkan data");
      } else {
        if (defaultValues?.id) {
          await editKecamatan(validData, defaultValues.id);

          router.push("/cms/masterdata/struktur-wilayah/kecamatan");
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
          label="Kabupaten/Kota"
          value={kabupatenKotaId}
          onChange={setKabupatenKotaId}
          options={kabupatenKotaList.map((kab) => ({
            label: kab.kabupatenKota,
            value: String(kab.id),
          }))}
          error={errors.kabupatenKotaId}
        />

        <InputField label="Nama Kecamatan" value={kecamatan} onChange={(e) => setKecamatan(e.target.value)} error={errors.kecamatan} />

        <InputField label="Kode DEPDAGRI" value={kodeDepdagri} onChange={(e) => setKodeDepdagri(e.target.value)} error={errors.kodeDepdagri} />
      </CardContent>
    </form>
  );
});

export default FormKecamatanPage;
