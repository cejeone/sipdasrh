"use client";

import { setupInterceptor } from "lib/axios";
import { useRouter } from "next/navigation";
import { bpthFormSchema } from "../lib/validation";
import { createBpth, editBpth } from "../lib/action";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { CardContent } from "@/components/ui/card";
import InputField from "@/components/InputField";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Bpth } from "@/model/admin/organisasi/Bpth";
import dynamic from "next/dynamic";
import { Provinsi } from "@/model/admin/struktur-wilayah/Provinsi";
import SelectCombobox from "@/components/SelectCombobox";

const Editor = dynamic(() => import("react-simple-wysiwyg").then((mod) => mod.default), { ssr: false });

interface FormBpthProps {
  type?: "ADD" | "EDIT";
  defaultValues?: Bpth | null;
  provinsiList: Provinsi[];
}

export interface FormBpthRef {
  submit: () => void;
}

const FormBpthPage = forwardRef<FormBpthRef, FormBpthProps>(({ type, defaultValues, provinsiList }, ref) => {
  // setupInterceptor();
  const router = useRouter();

  const [kodeBpth, setKodeBpth] = useState("");
  const [namaBpth, setNamaBpth] = useState("");
  const [provinsiId, setProvinsiId] = useState("");
  const [alamat, setAlamat] = useState("");
  const [telepon, setTelepon] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (type == "EDIT" && defaultValues) {
      setProvinsiId(String(defaultValues?.provinsi?.id ?? ""));
      setKodeBpth(defaultValues.kodeBpth || "");
      setNamaBpth(defaultValues.namaBpth || "");
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

  const handleBpth = async (e: React.FormEvent) => {
    e.preventDefault();

    const safeNumber = (value: string) => (value.trim() === "" ? undefined : Number(value));

    try {
      const validation = bpthFormSchema.safeParse({
        kodeBpth,
        namaBpth,
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
        const bpth = await createBpth(validData);

        router.push("/cms/organisasi/bpth");
        toast.success("Berhasil menambahkan data");
      } else {
        if (defaultValues?.id) {
          await editBpth(validData, defaultValues.id);

          router.push("/cms/organisasi/bpth");
          toast.success("Berhasil memperbaharui data");
        }
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menyimpan dokumen:", error);
      toast.error("Terjadi kesalahan saat menyimpan data");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleBpth}>
      <CardContent className="space-y-4">

        <InputField label="Kode BPTH" value={kodeBpth} onChange={(e) => setKodeBpth(e.target.value)} error={errors.kodeBpth} />
        <InputField label="Nama BPTH" value={namaBpth} onChange={(e) => setNamaBpth(e.target.value)} error={errors.namaBpth} />
        
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

export default FormBpthPage;
