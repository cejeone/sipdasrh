"use client";

import { setupInterceptor } from "lib/axios";
import { useRouter } from "next/navigation";
import { monevPusatFormSchema } from "../lib/validation";
import { createMonevPusat, editMonevPusat } from "../lib/action";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Card,CardContent } from "@/components/ui/card";
import InputField from "@/components/InputField";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { MonevPusat } from "@/model/rh/MonevPusat";
import { Bpdas } from "@/model/admin/organisasi/Bpdas";
import InfoItem from "@/components/InfoItem";
import { IconFrame } from "@tabler/icons-react";
import SelectCombobox from "@/components/SelectCombobox";


interface FormMonevPusatProps {
  type?: "ADD" | "EDIT";
  defaultValues?: MonevPusat | null;
  bpdasList: Bpdas[];
}

export interface FormMonevPusatRef {
  submit: () => void;
}

const FormMonevPusatPage = forwardRef<FormMonevPusatRef, FormMonevPusatProps>(({ type, defaultValues, bpdasList }, ref) => {
  // setupInterceptor();
  const router = useRouter();

  const [id, setId] = useState("");
  const [program, setProgram] = useState("");
  const [bpdasId, setBpdasId] = useState("");
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
      setBpdasId(String(defaultValues?.bpdas?.id ?? ""));
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

  const handleMonevPusat = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const safeNumber = (value: string) => (value.trim() === "" ? undefined : Number (value));
      const validation = monevPusatFormSchema.safeParse({
        id,
        program,
        bpdas: safeNumber(bpdasId),
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
        const monevPusat = await createMonevPusat(validData);

        router.push("/cms/rh/monev-pusat");
        toast.success("Berhasil menambahkan data");
      } else {
        if (defaultValues?.id) {
          await editMonevPusat(validData, defaultValues.id);

          router.push("/cms/rh/monev-pusat");
          toast.success("Berhasil memperbaharui data");
        }
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menyimpan dokumen:", error);
      toast.error("Terjadi kesalahan saat menyimpan data");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleMonevPusat}>
      <Card className="border border-border p-4 mb-2 bg-card">
        <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-0">
          <div className="col-span-12 lg:col-span-6 border-r space-y-4 pl-4">
            <div className="title text-base-green flex items-center gap-1">
              <IconFrame />
              <h5 className="font-bold">Informasi Umum</h5>
            </div>
            <InfoItem number="1" title="ID" description="Terisi oleh sistem sebagai identifikasi unik untuk setiap kegiatan." />
            <InfoItem number="2" title="Program" description="Pilih program yang dijalankan." />
            <InfoItem number="3" title="BPDAS" description="Pilih Balai Pengelolaan Daerah Aliran Sungai (BPDAS) yang menaungi wilayah kegiatan dari daftar yang tersedia." />
          </div>

          <div className="col-span-12 lg:col-span-6">
            <Card>
              <CardContent className="space-y-4">
                <InputField label="ID" value={id} onChange={(e) => setId(e.target.value)} error={errors.id} disabled />
                <SelectCombobox
                  label="BPDAS"
                  value={bpdasId}
                  onChange={setBpdasId}
                  options={bpdasList.map((bpdas) => ({
                    label: bpdas.namaBpdas,
                    value: String(bpdas.id),
                  }))}
                  error={errors.bpdasId}
                />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border p-4 mb-2 bg-card">
        <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-0">
          <div className="col-span-12 lg:col-span-6 border-r space-y-4 pl-4">
            <div className="title text-base-green flex items-center gap-1">
              <IconFrame />
              <h5 className="font-bold">Target Kegiatan</h5>
            </div>
            <InfoItem number="1" title="Luas Total" description="Masukkan jumlah capaian yang direncanakan sejak awal." />
            <InfoItem number="2" title="T-1" description="Masukkan target dan realisasi luas kegiatan pada tahap perencanaan (T-1)." />
            <InfoItem number="3" title="P-0" description="Masukkan target dan realisasi luas kegiatan pada tahap penanaman (P-0)." />
            <InfoItem number="4" title="P-1" description="Masukkan target dan realisasi luas kegiatan pada tahap pemeliharaan pertama (P-1)." />
            <InfoItem number="5" title="P-2" description="Masukkan target dan realisasi luas kegiatan pada tahap pemeliharaan kedua (P-2)." />
            <InfoItem number="6" title="BAST" description="Masukkan target dan realisasi luas kegiatan pada tahap Serah Terima." />
          </div>

          <div className="col-span-12 lg:col-span-6">
            <Card>
              <CardContent className="grid grid-cols-2 gap-4">
                {/* Baris 1 */}
                <InputField label="Total Target" value={totalTarget} onChange={(e) => setTotalTarget(e.target.value)} />
                <InputField label="Total Realisasi" value={totalRealisasi} onChange={(e) => setTotalRealisasi(e.target.value)} />

                {/* Baris 2 */}
                <InputField label="Target T-1" value={totalT1} onChange={(e) => setTotalT1(e.target.value)} />
                <InputField label="Realisasi T-1" value={realisasiT1} onChange={(e) => setRealisasiT1(e.target.value)} />

                {/* Baris 3 */}
                <InputField label="Target P-0" value={totalP0} onChange={(e) => setTotalP0(e.target.value)} />
                <InputField label="Realisasi P-0" value={realisasiP0} onChange={(e) => setRealisasiP0(e.target.value)} />

                {/* Baris 4 */}
                <InputField label="Target P-1" value={totalP1} onChange={(e) => setTotalP1(e.target.value)} />
                <InputField label="Realisasi P-1" value={realisasiP1} onChange={(e) => setRealisasiP1(e.target.value)} />

                {/* Baris 5 */}
                <InputField label="Target P-2" value={totalP2} onChange={(e) => setTotalP2(e.target.value)} />
                <InputField label="Realisasi P-2" value={realisasiP2} onChange={(e) => setRealisasiP2(e.target.value)} />

                {/* Baris 6 */}
                <InputField label="Target BAST" value={totalBast} onChange={(e) => setTotalBast(e.target.value)} />
                <InputField label="Realisasi BAST" value={realisasiBast} onChange={(e) => setRealisasiBast(e.target.value)} />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>


      <Card className="border border-border p-4 mb-2 bg-card">
        <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-0">
          <div className="col-span-12 lg:col-span-6 border-r space-y-4 pl-4">
            <div className="title text-base-green flex items-center gap-1">
              <IconFrame />
              <h5 className="font-bold">Keterangan</h5>
            </div>
            <InfoItem number="1" title="Keterangan" description="Catatan tambahan atau penjelasan kegiatan." />
          </div>

          <div className="col-span-12 lg:col-span-6">
            <Card>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-secondary-green mb-2 font-bold">Keterangan</Label>
                  <Textarea className="border-border" value={keterangan} onChange={(e) => setKeterangan(e.target.value)} placeholder="Masukkan Keterangan" />
                  {errors.keterangan && <p className="text-sm text-base-destructive mt-1">{errors.keterangan}</p>}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </form> 
  );
});

export default FormMonevPusatPage;
