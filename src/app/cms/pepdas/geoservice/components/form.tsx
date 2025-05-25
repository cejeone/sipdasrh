"use client";

import { setupInterceptor } from "lib/axios";
import { useRouter } from "next/navigation";
import { geoserviceFormSchema } from "../lib/validation";
import { createGeoservices, editGeoservices } from "../lib/action";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { CardContent } from "@/components/ui/card";
import InputField from "@/components/InputField";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Geoservice } from "@/model/pepdas/Geoservice";

interface FormGeoserviceProps {
  type?: "ADD" | "EDIT";
  defaultValues?: Geoservice | null;
}

export interface FormGeoserviceRef {
  submit: () => void;
}

const FormGeoservicePage = forwardRef<FormGeoserviceRef, FormGeoserviceProps>(({ type, defaultValues }, ref) => {
  // setupInterceptor();
  const router = useRouter();

  const [direktorat, setDirektorat] = useState("");
  const [bpdas, setBpdas] = useState("");
  const [geoserviceId, setGeoserviceId] = useState("");
  const [url, setUrl] = useState("");
  const [tipe, setTipe] = useState("");
  const [service, setService] = useState("");
  const [status, setStatus] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (type == "EDIT" && defaultValues) {
      setDirektorat(defaultValues.direktorat || "");
      setBpdas(defaultValues.bpdas || "");
      setGeoserviceId(defaultValues.geoserviceId || "");
      setUrl(defaultValues.url || "");
      setTipe(defaultValues.tipe || "");
      setService(defaultValues.service || "");
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

  const handleGeoservice = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validation = geoserviceFormSchema.safeParse({
        direktorat,
        bpdas,
        geoserviceId,
        url,
        tipe,
        service,
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
        const geoservice = await createGeoservices(validData);

        router.push("/cms/pepdas/geoservice");
        toast.success("Berhasil menambahkan data");
      } else {
        if (defaultValues?.id) {
          await editGeoservices(validData, defaultValues.id);

          router.push("/cms/pepdas/geoservice");
          toast.success("Berhasil memperbaharui data");
        }
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menyimpan dokumen:", error);
      toast.error("Terjadi kesalahan saat menyimpan data");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleGeoservice}>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-secondary-green mb-2 font-bold">Direktorat</Label>
          <Select value={direktorat} onValueChange={setDirektorat}>
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

        <InputField label="Geoservice ID" value={geoserviceId} onChange={(e) => setGeoserviceId(e.target.value)} error={errors.geoserviceId} />

        <InputField label="URL" value={url} onChange={(e) => setUrl(e.target.value)} error={errors.url} />

        <div>
          <Label className="text-secondary-green mb-2 font-bold">Tipe</Label>
          <Select value={tipe} onValueChange={setTipe}>
            <SelectTrigger className="w-full border-border">
              <SelectValue placeholder="Pilih salah satu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FeatureServer">FeatureServer</SelectItem>
              <SelectItem value="MapServer">MapServer</SelectItem>
              <SelectItem value="WMS">WMS</SelectItem>
              <SelectItem value="WFS">WFS</SelectItem>
            </SelectContent>
          </Select>
          {errors.tipe && <p className="text-sm text-base-destructive mt-1">{errors.tipe}</p>}
        </div>

        <InputField label="Service" value={service} onChange={(e) => setService(e.target.value)} error={errors.service} />

        <div>
          <Label className="text-secondary-green mb-2 font-bold">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full border-border">
              <SelectValue placeholder="Pilih salah satu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Aktif">Aktif</SelectItem>
              <SelectItem value="Nonaktif">Nonaktif</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && <p className="text-sm text-base-destructive mt-1">{errors.status}</p>}
        </div>
      </CardContent>
    </form>
  );
});

export default FormGeoservicePage;
