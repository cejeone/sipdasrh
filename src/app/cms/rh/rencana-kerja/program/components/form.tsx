"use client";

import { setupInterceptor } from "lib/axios";
import { useRouter } from "next/navigation";
import { programFormSchema } from "../lib/validation";
import { createProgram, editProgram } from "../lib/action";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import InputField from "@/components/InputField";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Program } from "@/model/rh/Program";
import SelectCombobox from "@/components/SelectCombobox";
import { Lov } from "@/model/admin/Lov";
import InfoItem from "@/components/InfoItem";
import { IconFrame } from "@tabler/icons-react";
import { Eselon2 } from "@/model/admin/organisasi/Eselon2";

interface FormProgramProps {
  type?: "ADD" | "EDIT";
  defaultValues?: Program | null;
  lovList: Lov[];
  eselon2List: Eselon2[];
}

export interface FormProgramRef {
  submit: () => void;
}

const FormProgramPage = forwardRef<FormProgramRef, FormProgramProps>(({ type, defaultValues, lovList, eselon2List }, ref) => {
  // setupInterceptor();
  const router = useRouter();

  const [id, setId] = useState("");
  const [eselon2Id, setEselon2Id] = useState("");
  const [kategoriId, setKategoriId] = useState("");
  const [nama, setNama] = useState("");
  const [tahunPelaksana, setTahunPelaksana] = useState("");
  const [totalAnggaran, setTotalAnggaran] = useState("");
  const [targetLuas, setTargetLuas] = useState("");
  const [statusId, setStatusId] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (type == "EDIT" && defaultValues) {
      setId(defaultValues.id || "");
      setEselon2Id(String(defaultValues?.eselon2?.id ?? ""));
      setKategoriId(String(defaultValues?.kategori?.id ?? ""));
      setNama(defaultValues.nama || "");
      setTahunPelaksana(defaultValues.tahunPelaksana || "");
      setTotalAnggaran(String(defaultValues.totalAnggaran ?? ""));
      setTargetLuas(String(defaultValues.targetLuas ?? ""));
      setStatusId(String(defaultValues?.status?.id ?? ""));
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

  const handleProgram = async (e: React.FormEvent) => {
    e.preventDefault();

    const safeNumber = (value: string) => (value.trim() === "" ? undefined : Number(value));

    try {
      const validation = programFormSchema.safeParse({
        id,
        eselon2Id: safeNumber(eselon2Id),
        kategoriId: safeNumber(kategoriId),
        nama,
        tahunPelaksana,
        totalAnggaran: safeNumber(totalAnggaran),
        targetLuas: safeNumber(targetLuas),
        statusId: safeNumber(statusId),
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
        await createProgram(validData);

        router.push("/cms/rh/rencana-kerja/program");
        toast.success("Berhasil menambahkan data");
      } else {
        if (defaultValues?.id) {
          await editProgram(validData, defaultValues.id);

          router.push("/cms/rh/rencana-kerja/program");
          toast.success("Berhasil memperbaharui data");
        }
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menyimpan dokumen:", error);
      toast.error("Terjadi kesalahan saat menyimpan data");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleProgram}>
      <Card className="border border-border p-4 mb-2 bg-card">
        <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-0">
          <div className="col-span-12 lg:col-span-6 border-r space-y-4 pl-4">
            <div className="title text-base-green flex items-center gap-1">
              <IconFrame />
              <h5 className="font-bold">Informasi</h5>
            </div>
            <InfoItem number="1" title="ID" description="Nomor ID program, otomatis dibuat oleh sistem." />
            <InfoItem number="2" title="Kategori" description="Pilih jenis program yang akan dijalankan." />
            <InfoItem number="3" title="Nama" description="Tulis nama program sesuai dokumen rencana kerja atau surat tugas." />
            <InfoItem number="4" title="Eselon 2" description="Pilih Eselon 2" />
          </div>

          <div className="col-span-12 lg:col-span-6">
            <Card>
              <CardContent className="space-y-4">
                <InputField label="ID" value={id} onChange={(e) => setId(e.target.value)} error={errors.id} disabled />
                <SelectCombobox
                  label="Kategori"
                  value={kategoriId}
                  onChange={setKategoriId}
                  options={lovList.map((lov) => ({
                    label: lov.namaKategori,
                    value: String(lov.id),
                  }))}
                  error={errors.kategoriId}
                />
              
                <div>
                    <Label className="text-secondary-green mb-2 font-bold">Nama</Label>
                    <Textarea className="border-border" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Masukkan Keterangan" />
                    {errors.nama && <p className="text-sm text-base-destructive mt-1">{errors.nama}</p>}
                </div> 

                <SelectCombobox
                  label="Eselon 2"
                  value={eselon2Id}
                  onChange={setEselon2Id}
                  options={eselon2List.map((eselon2) => ({
                    label: eselon2.nama,
                    value: String(eselon2.id),
                  }))}
                  error={errors.eselon2Id}
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
              <h5 className="font-bold">Detail Program</h5>
            </div>
            <InfoItem number="1" title="Tahun Pelaksanaan" description="Masukkan tahun kapan program akan dilaksanakan. Ditulis dalam format tahun (YYYY)." />
            <InfoItem number="2" title="Total Anggaran" description="Masukan total anggaran dana yang digunakan untuk program." />
            <InfoItem number="3" title="Target Luas" description="Masukkan luas lahan yang menjadi target program dalam satuan hektar." />
            <InfoItem number="4" title="Status" description="Status dari program (aktif, selesai, atau tertunda)." />
          </div>

          <div className="col-span-12 lg:col-span-6">
            <Card>
              <CardContent className="space-y-4">
                <InputField label="Tahun Pelaksanaan" value={tahunPelaksana} onChange={(e) => setTahunPelaksana(e.target.value)} error={errors.tahunPelaksana} />
                <InputField label="Total Anggaran" value={totalAnggaran} onChange={(e) => setTotalAnggaran(e.target.value)} error={errors.totalAnggaran} />
                <InputField label="Target Luas" value={targetLuas} onChange={(e) => setTargetLuas(e.target.value)} error={errors.targetLuas} />
                <SelectCombobox
                  label="Status"
                  value={statusId}
                  onChange={setStatusId}
                  options={lovList.map((lov) => ({
                    label: lov.nilai,
                    value: String(lov.id),
                  }))}
                  error={errors.statusId}
                />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </form>
  );
});

export default FormProgramPage;
