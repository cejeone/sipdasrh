"use client";

import { setupInterceptor } from "lib/axios";
import { useRouter } from "next/navigation";
import { eselon1FormSchema } from "../lib/validation";
import { createEselon1, editEselon1 } from "../lib/action";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { CardContent } from "@/components/ui/card";
import InputField from "@/components/InputField";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Eselon1 } from "@/model/admin/organisasi/Eselon1";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("react-simple-wysiwyg").then((mod) => mod.default), { ssr: false });

interface FormEselon1Props {
  type?: "ADD" | "EDIT";
  defaultValues?: Eselon1 | null;
}

export interface FormEselon1Ref {
  submit: () => void;
}

const FormEselon1Page = forwardRef<FormEselon1Ref, FormEselon1Props>(({ type, defaultValues }, ref) => {
  // setupInterceptor();
  const router = useRouter();

  const [id, setId] = useState("");
  const [nama, setNama] = useState("");
  const [pejabat, setPejabat] = useState("");
  const [tugasDanFungsi, setTugasDanFungsi] = useState("");
  const [keterangan, setKeterangan] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (type == "EDIT" && defaultValues) {
      setNama(defaultValues.nama || "");
      setPejabat(defaultValues.pejabat || "");
      setTugasDanFungsi(defaultValues.tugasDanFungsi || "");
      setKeterangan(defaultValues.keterangan || "");
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

  const handleEselon1 = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validation = eselon1FormSchema.safeParse({
        id,
        nama,
        pejabat,
        tugasDanFungsi,
        keterangan,
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
        const eselon1 = await createEselon1(validData);

        router.push("/cms/organisasi/eselon-1");
        toast.success("Berhasil menambahkan data");
      } else {
        if (defaultValues?.id) {
          await editEselon1(validData, defaultValues.id);

          router.push("/cms/organisasi/eselon-1");
          toast.success("Berhasil memperbaharui data");
        }
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menyimpan dokumen:", error);
      toast.error("Terjadi kesalahan saat menyimpan data");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleEselon1}>
      <CardContent className="space-y-4">
        <InputField label="Nama" value={nama} onChange={(e) => setNama(e.target.value)} error={errors.nama} />
        <InputField label="Pejabat" value={pejabat} onChange={(e) => setPejabat(e.target.value)} error={errors.pejabat} />
        <div>
          <Label className="text-secondary-green mb-2 font-bold">Tugas dan Fungsi</Label>
          <Editor value={tugasDanFungsi} onChange={(e) => setTugasDanFungsi(e.target.value)} />
          {errors.tugasDanFungsi && <p className="text-sm text-base-destructive mt-1">{errors.tugasDanFungsi}</p>}
        </div>
        <div>
          <Label className="text-secondary-green mb-2 font-bold">Keterangan</Label>
          <Textarea className="border-border" value={keterangan} onChange={(e) => setKeterangan(e.target.value)} placeholder="Masukkan Keterangan" />
          {errors.keterangan && <p className="text-sm text-base-destructive mt-1">{errors.keterangan}</p>}
        </div>
      </CardContent>
    </form>
  );
});

export default FormEselon1Page;
