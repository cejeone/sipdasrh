"use client";

import { setupInterceptor } from "lib/axios";
import { useRouter } from "next/navigation";
import { pemantauanDASFormSchema } from "../lib/validation";
import { createPemantauanDAS, editPemantauanDAS } from "../lib/action";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { CardContent } from "@/components/ui/card";
import InputField from "@/components/InputField";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { PemantauanDAS } from "@/model/pepdas/PemantauanDAS";

interface FormPemantauanDASProps {
  type?: "ADD" | "EDIT";
  defaultValues?: PemantauanDAS | null;
}

export interface FormPemantauanDASRef {
  submit: () => void;
}

const FormPemantauanDASPage = forwardRef<FormPemantauanDASRef, FormPemantauanDASProps>(({ type, defaultValues }, ref) => {
  // setupInterceptor();
  const router = useRouter();

  const [bpdas, setBpdas] = useState("");
  const [das, setDas] = useState("");
  const [spasId, setSpasId] = useState("");
  const [tanggalWaktu, setTanggalWaktu] = useState("");
  const [nilaiTma, setNilaiTma] = useState("");
  const [nilaiCurahHujan, setNilaiCurahHujan] = useState("");
  const [teganganBaterai, setTeganganBaterai] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (type == "EDIT" && defaultValues) {
      setBpdas(defaultValues.bpdas || "");
      setDas(defaultValues.das || "");
      setSpasId(defaultValues.spasId || "");
      setTanggalWaktu(defaultValues.tanggalWaktu || "");
      setNilaiTma(String(defaultValues.nilaiTma ?? ""));
      setNilaiCurahHujan(String(defaultValues.nilaiCurahHujan ?? ""));
      setTeganganBaterai(String(defaultValues.teganganBaterai ?? ""));
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

  const handlePemantauanDAS = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const safeNumber = (value: string) => (value.trim() === "" ? undefined : Number (value));
      
      function toLocalISOString(date: Date): string {
        const pad = (n: number) => n.toString().padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${date.getMilliseconds()}`;
      }

      const isoTanggal = toLocalISOString(new Date(tanggalWaktu));
      
      const validation = pemantauanDASFormSchema.safeParse({
        bpdas,
        das,
        spasId,
        tanggalWaktu: isoTanggal,
        nilaiTma: safeNumber(nilaiTma),
        nilaiCurahHujan: safeNumber(nilaiCurahHujan),
        teganganBaterai: safeNumber(teganganBaterai),
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
        const pemantauanDAS = await createPemantauanDAS(validData);

        router.push("/cms/pepdas/pemantauan-das");
        toast.success("Berhasil menambahkan data");
      } else {
        if (defaultValues?.id) {
          await editPemantauanDAS(validData, defaultValues.id);

          router.push("/cms/pepdas/pemantauan-das");
          toast.success("Berhasil memperbaharui data");
        }
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menyimpan dokumen:", error);
      toast.error("Terjadi kesalahan saat menyimpan data");
    }
  };

  return (
    <form ref={formRef} onSubmit={handlePemantauanDAS}>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-secondary-green mb-2 font-bold">BPDAS</Label>
          <Select value={bpdas} onValueChange={setBpdas}>
            <SelectTrigger className="w-full border-border">
              <SelectValue placeholder="Pilih salah satu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BPDASHL CITARUM-CILIWUNG ">BPDASHL CITARUM-CILIWUNG </SelectItem>
            </SelectContent>
          </Select>
          {errors.bpdas && <p className="text-sm text-base-destructive mt-1">{errors.bpdas}</p>}
        </div>

        <div>
          <Label className="text-secondary-green mb-2 font-bold">DAS</Label>
          <Select value={das} onValueChange={setDas}>
            <SelectTrigger className="w-full border-border">
              <SelectValue placeholder="Pilih salah satu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PEPDAS">PEPDAS</SelectItem>
              <SelectItem value="SEKDITJEN">SEKDITJEN</SelectItem>
              <SelectItem value="RH">RH</SelectItem>
              <SelectItem value="RM">RM</SelectItem>
              <SelectItem value="TKTRH">TKTRH</SelectItem>
              <SelectItem value="PPTH">PPTH</SelectItem>
            </SelectContent>
          </Select>
          {errors.direktorat && <p className="text-sm text-base-destructive mt-1">{errors.direktorat}</p>}
        </div>

        

        <InputField label="SPAS ID" value={spasId} onChange={(e) => setSpasId(e.target.value)} error={errors.spasId} />

        <InputField label="Tanggal & Waktu" value={tanggalWaktu} onChange={(e) => setTanggalWaktu(e.target.value)} error={errors.tanggalWaktu} type="datetime-local" />

        <InputField label="Nilai TMA" type="number" value={nilaiTma} onChange={(e) => setNilaiTma(e.target.value)} error={errors.nilaiTma} />        
        <InputField label="Nilai Curah Hujan" type="number" value={nilaiCurahHujan} onChange={(e) => setNilaiCurahHujan(e.target.value)} error={errors.nilaiCurahHujan} />        
        <InputField label="Tegangan Baterai" type="number" value={teganganBaterai} onChange={(e) => setTeganganBaterai(e.target.value)} error={errors.teganganBaterai} />        

      </CardContent>
    </form>
  );
});

export default FormPemantauanDASPage;
