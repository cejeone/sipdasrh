"use client";

import { setupInterceptor } from "lib/axios";
import { useRouter } from "next/navigation";
import { bpdasFormSchema } from "../lib/validation";
import { createBpdas, editBpdas } from "../lib/action";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { CardContent } from "@/components/ui/card";
import InputField from "@/components/InputField";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Bpdas } from "@/model/admin/organisasi/Bpdas";
import dynamic from "next/dynamic";
import { Provinsi } from "@/model/admin/struktur-wilayah/Provinsi";
import SelectCombobox from "@/components/SelectCombobox";

const Editor = dynamic(() => import("react-simple-wysiwyg").then((mod) => mod.default), { ssr: false });

interface FormBpdasProps {
  type?: "ADD" | "EDIT";
  defaultValues?: Bpdas | null;
  provinsiList: Provinsi[];
}

export interface FormBpdasRef {
  submit: () => void;
}

const FormBpdasPage = forwardRef<FormBpdasRef, FormBpdasProps>(({ type, defaultValues, provinsiList }, ref) => {
  // setupInterceptor();
  const router = useRouter();

  const [kodeBpdas, setKodeBpdas] = useState("");
  const [namaBpdas, setNamaBpdas] = useState("");
  const [provinsiId, setProvinsiId] = useState("");
  const [alamat, setAlamat] = useState("");
  const [telepon, setTelepon] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (type == "EDIT" && defaultValues) {
      setProvinsiId(String(defaultValues?.provinsi?.id ?? ""));
      setKodeBpdas(defaultValues.kodeBpdas || "");
      setNamaBpdas(defaultValues.namaBpdas || "");
      setAlamat(defaultValues.alamat || "");
      setTelepon(defaultValues.telepon || "");
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

  const handleBpdas = async (e: React.FormEvent) => {
    e.preventDefault();

    const safeNumber = (value: string) => (value.trim() === "" ? undefined : Number(value));

    try {
      const validation = bpdasFormSchema.safeParse({
        kodeBpdas,
        namaBpdas,
        provinsiId: safeNumber(provinsiId),
        alamat,
        telepon,
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
        const bpdas = await createBpdas(validData);

        router.push("/cms/organisasi/bpdas");
        toast.success("Berhasil menambahkan data");
      } else {
        if (defaultValues?.id) {
          await editBpdas(validData, defaultValues.id);

          router.push("/cms/organisasi/bpdas");
          toast.success("Berhasil memperbaharui data");
        }
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menyimpan dokumen:", error);
      toast.error("Terjadi kesalahan saat menyimpan data");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleBpdas}>
      <CardContent className="space-y-4">

        <InputField label="Kode BPDAS" value={kodeBpdas} onChange={(e) => setKodeBpdas(e.target.value)} error={errors.kodeBpdas} />
        <InputField label="Nama BPDAS" value={namaBpdas} onChange={(e) => setNamaBpdas(e.target.value)} error={errors.namaBpdas} />
        
        <SelectCombobox
          label="Provinsi"
          value={provinsiId}
          onChange={setProvinsiId}
          options={provinsiList.map((provinsi) => ({
            label: provinsi.namaProvinsi,
            value: String(provinsi.id),
          }))}
          error={errors.eselon1Id}
        />

        <InputField label="Alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} error={errors.alamat} />
        <InputField label="Telepon" value={telepon} onChange={(e) => setTelepon(e.target.value)} error={errors.telepon} />
      </CardContent>
    </form>
  );
});

export default FormBpdasPage;
