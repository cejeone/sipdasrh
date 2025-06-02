"use client";

import { setupInterceptor } from "lib/axios";
import { useRouter } from "next/navigation";
import { kelurahanFormSchema } from "../lib/validation";
import { createKelurahanDesa, editKelurahanDesa } from "../lib/action";
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { CardContent } from "@/components/ui/card";
import InputField from "@/components/InputField";
import { toast } from "sonner";
import SelectCombobox from "@/components/SelectCombobox";
import { Kecamatan } from "@/model/admin/struktur-wilayah/Kecamatan";
import { KelurahanDesa } from "@/model/admin/struktur-wilayah/KelurahanDesa";

interface FormKelurahanProps {
  type?: "ADD" | "EDIT";
  defaultValues?: KelurahanDesa | null;
  kecamatanList: Kecamatan[];
}

export interface FormKelurahanRef {
  submit: () => void;
}

const FormKelurahanPage = forwardRef((props: FormKelurahanProps, ref: ForwardedRef<FormKelurahanRef>) => {
  const { kecamatanList, defaultValues, type = "CREATE" } = props;
  // setupInterceptor();
  const router = useRouter();

  const [kelurahan, setKelurahan] = useState("");
  // const [kodeDepdagri, setKodeDepdagri] = useState("");
  const [kecamatanId, setKecamatanId] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (type == "EDIT" && defaultValues) {
      setKecamatanId(String(defaultValues?.kecamatan?.id ?? ""));
      setKelurahan(defaultValues?.kelurahan ?? "");
      // setKodeDepdagri(defaultValues?.kodeDepdagri ?? "");
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
      const validation = kelurahanFormSchema.safeParse({
        kelurahan,
        // kodeDepdagri,
        kecamatanId: safeNumber(kecamatanId),
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
        await createKelurahanDesa(validData);

        router.push("/cms/masterdata/struktur-wilayah/kelurahan");
        toast.success("Berhasil menambahkan data");
      } else {
        if (defaultValues?.id) {
          await editKelurahanDesa(validData, defaultValues.id);

          router.push("/cms/masterdata/struktur-wilayah/kelurahan");
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
          label="Kecamatan"
          value={kecamatanId}
          onChange={setKecamatanId}
          options={kecamatanList.map((kec) => ({
            label: kec.kecamatan,
            value: String(kec.id),
          }))}
          error={errors.kecamatanId}
        />

        <InputField label="Nama Kelurahan" value={kelurahan} onChange={(e) => setKelurahan(e.target.value)} error={errors.kelurahan} />

        {/* <InputField label="Kode DEPDAGRI" value={kodeDepdagri} onChange={(e) => setKodeDepdagri(e.target.value)} error={errors.kodeDepdagri} /> */}
      </CardContent>
    </form>
  );
});

export default FormKelurahanPage;
