"use client";

import { setupInterceptor } from "lib/axios";
import { useRouter } from "next/navigation";
import { monevFormSchema } from "../lib/validation";
import { createMonev, editMonev } from "../lib/action";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Card,CardContent } from "@/components/ui/card";
import InputField from "@/components/InputField";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Monev } from "@/model/rh/Monev";

interface FormMonevProps {
  type?: "ADD" | "EDIT";
  defaultValues?: Monev | null;
}

export interface FormMonevRef {
  submit: () => void;
}

const FormMonevPage = forwardRef<FormMonevRef, FormMonevProps>(({ type, defaultValues }, ref) => {
  // setupInterceptor();
  const router = useRouter();

  const [id, setId] = useState("");
  const [program, setProgram] = useState("");
  const [bpdas, setBpdas] = useState("");
  const [totalTarget, setTotalTarget] = useState("");
  const [totalRealisasi, setTotalRealisasi] = useState("");
  const [totalT1, setTotalT1] = useState("");
  const [realisasiT1, setRealisasiT1] = useState("");
  const [totalP0, setTotalP0] = useState("");
  const [realisasiP0, setRealisasiP0] = useState("");
  const [totalP1, setTotalP1] = useState("");
  const [realisasiP1, setRealisasiP1] = useState("");
  const [totalP2, setTotalP2] = useState("");
  const [realisasiP2, setRealisasiP2] = useState("");
  const [totalBast, setTotalBast] = useState("");
  const [realisasiBast, setRealisasiBast] = useState("");
  const [keterangan, setKeterangan] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (type == "EDIT" && defaultValues) {
      setId(defaultValues.id || "");
      setProgram(defaultValues.program || "");
      setBpdas(defaultValues.bpdas || "");
      setTotalTarget(String(defaultValues.totalTarget ?? ""));
      setTotalRealisasi(String(defaultValues.totalRealisasi ?? ""));
      setTotalT1(String(defaultValues.totalT1 ?? ""));
      setRealisasiT1(String(defaultValues.realisasiT1 ?? ""));
      setTotalP0(String(defaultValues.totalP0 ?? ""));
      setRealisasiP0(String(defaultValues.realisasiP0 ?? ""));
      setTotalP1(String(defaultValues.totalP1 ?? ""));
      setRealisasiP1(String(defaultValues.realisasiP1 ?? ""));
      setTotalP2(String(defaultValues.totalP2 ?? ""));
      setRealisasiP2(String(defaultValues.realisasiP2 ?? ""));
      setTotalBast(String(defaultValues.totalBast ?? ""));
      setRealisasiBast(String(defaultValues.realisasiBast ?? ""));
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

  const handleMonev = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const safeNumber = (value: string) => (value.trim() === "" ? undefined : Number (value));
      const validation = monevFormSchema.safeParse({
        id,
        program,
        bpdas,
        totalTarget: safeNumber(totalTarget),
        totalRealisasi: safeNumber(totalRealisasi),
        totalT1: safeNumber(totalT1),
        realisasiT1: safeNumber(realisasiT1),
        totalP0: safeNumber(totalP0),
        realisasiP0: safeNumber(realisasiP0),
        totalP1: safeNumber(totalP1),
        realisasiP1: safeNumber(realisasiP1),
        totalP2: safeNumber(totalP2),
        realisasiP2: safeNumber(realisasiP2),
        totalBast: safeNumber(totalBast),
        realisasiBast: safeNumber(realisasiBast),
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
        const monev = await createMonev(validData);

        router.push("/cms/rh/monev");
        toast.success("Berhasil menambahkan data");
      } else {
        if (defaultValues?.id) {
          await editMonev(validData, defaultValues.id);

          router.push("/cms/rh/monev");
          toast.success("Berhasil memperbaharui data");
        }
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menyimpan dokumen:", error);
      toast.error("Terjadi kesalahan saat menyimpan data");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleMonev}>
      <CardContent className="space-y-4">
        <InputField label="ID" value={id} onChange={(e) => setId(e.target.value)} error={errors.id} disabled />
        <div>
          <Label className="text-secondary-green mb-2 font-bold">Program</Label>
          <Select value={program} onValueChange={setBpdas}>
            <SelectTrigger className="w-full border-border">
              <SelectValue placeholder="Pilih salah satu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BPDASHL CITARUM-CILIWUNG ">BPDASHL CITARUM-CILIWUNG </SelectItem>
            </SelectContent>
          </Select>
          {errors.program && <p className="text-red-500 text-sm">{errors.program}</p>}
        </div>
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
      </CardContent>
      
    </form> 
    
  );
});

export default FormMonevPage;
