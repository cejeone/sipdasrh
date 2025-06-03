"use client";

import { setupInterceptor } from "lib/axios";
import { useRouter } from "next/navigation";
import { pelakuUsahaFormSchema } from "../lib/validation";
import { createPelakuUsaha, editPelakuUsaha } from "../lib/action";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import InputField from "@/components/InputField";
import { toast } from "sonner";
import { PelakuUsaha } from "@/model/admin/masterdata/PelakuUsaha";
import SelectCombobox from "@/components/SelectCombobox";
import { Lov } from "@/model/admin/Lov";
import InfoItem from "@/components/InfoItem";
import { IconFrame } from "@tabler/icons-react";

interface FormPelakuUsahaProps {
  type?: "ADD" | "EDIT";
  defaultValues?: PelakuUsaha | null;
  lovList: Lov[];
}

export interface FormPelakuUsahaRef {
  submit: () => void;
}

const FormPelakuUsahaPage = forwardRef<FormPelakuUsahaRef, FormPelakuUsahaProps>(({ type, defaultValues, lovList }, ref) => {
  // setupInterceptor();
  const router = useRouter();

  const [namaBadanUsaha, setNamaBadanUsaha] = useState("");
  const [nomorIndukBerusahaNib, setNomorIndukBerusahaNib] = useState("");
  const [nomorSertifikatStandar, setNomorSertifikatStandar] = useState("");
  const [ruangLingkupUsaha, setRuangLingkupUsaha] = useState("");
  const [namaDirektur, setNamaDirektur] = useState("");
  const [nomorHpDirektur, setNomorHpDirektur] = useState("");
  const [alamat, setAlamat] = useState("");
  const [kategoriPelakuUsahaId, setKategoriPelakuUsahaId] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (type == "EDIT" && defaultValues) {
      setKategoriPelakuUsahaId(String(defaultValues?.kategoriPelakuUsaha?.id ?? ""));

      setNamaBadanUsaha(defaultValues.namaBadanUsaha || "");
      setNomorIndukBerusahaNib(defaultValues.nomorIndukBerusahaNib || "");
      setNomorSertifikatStandar(defaultValues.nomorSertifikatStandar || "");
      setRuangLingkupUsaha(defaultValues.ruangLingkupUsaha || "");
      setNamaDirektur(defaultValues.namaDirektur || "");
      setNomorHpDirektur(defaultValues.nomorHpDirektur || "");
      setAlamat(defaultValues.alamat || "");
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

  const handlePelakuUsaha = async (e: React.FormEvent) => {
    e.preventDefault();

    const safeNumber = (value: string) => (value.trim() === "" ? undefined : Number(value));

    try {
      const validation = pelakuUsahaFormSchema.safeParse({
        namaBadanUsaha,
        nomorIndukBerusahaNib,
        nomorSertifikatStandar,
        ruangLingkupUsaha,
        namaDirektur,
        nomorHpDirektur,
        alamat,
        kategoriPelakuUsahaId: safeNumber(kategoriPelakuUsahaId),
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
        await createPelakuUsaha(validData);

        router.push("/cms/masterdata/pelaku-usaha");
        toast.success("Berhasil menambahkan data");
      } else {
        if (defaultValues?.id) {
          await editPelakuUsaha(validData, defaultValues.id);

          router.push("/cms/masterdata/pelaku-usaha");
          toast.success("Berhasil memperbaharui data");
        }
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menyimpan dokumen:", error);
      toast.error("Terjadi kesalahan saat menyimpan data");
    }
  };

  return (
    <form ref={formRef} onSubmit={handlePelakuUsaha}>
      <Card className="border border-border p-4 mb-2 bg-card">
        <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-0">
          <div className="col-span-12 lg:col-span-6 border-r space-y-4 pl-4">
            <div className="title text-base-green flex items-center gap-1">
              <IconFrame />
              <h5 className="font-bold">Informasi</h5>
            </div>
            <InfoItem number="1" title="Kategori Pelaku Usaha" description="Pilih jenis usaha yang sesuai dengan badan usaha Anda, misalnya Perseorangan, PT, atau CV." />
            <InfoItem number="2" title="Nama Badan Usaha" description="Isi dengan nama resmi badan usaha sesuai dokumen legal." />
            <InfoItem number="3" title="Nomor Induk Berusaha (NIB)" description="Masukkan nomor yang diterbitkan oleh OSS setelah pendaftaran usaha." />
            <InfoItem number="4" title="Nomor Sertifikat Standar" description="Isi dengan nomor sertifikat yang menunjukkan badan usaha telah memenuhi standar tertentu." />
            <InfoItem number="5" title="Ruang Lingkup Usaha" description="Tuliskan bidang usaha utama yang dijalankan sesuai KBLI." />
          </div>

          <div className="col-span-12 lg:col-span-6">
            <Card>
              <CardContent className="space-y-4">
                <SelectCombobox
                  label="Kategori Pelaku Usaha"
                  value={kategoriPelakuUsahaId}
                  onChange={setKategoriPelakuUsahaId}
                  options={lovList.map((lov) => ({
                    label: lov.nilai,
                    value: String(lov.id),
                  }))}
                  error={errors.kategoriPelakuUsahaId}
                />

                <InputField label="Nama Badan Usaha" value={namaBadanUsaha} onChange={(e) => setNamaBadanUsaha(e.target.value)} error={errors.namaBadanUsaha} />

                <InputField
                  label="Nomor Induk Berusaha (NIB)"
                  value={nomorIndukBerusahaNib}
                  onChange={(e) => setNomorIndukBerusahaNib(e.target.value)}
                  error={errors.nomorIndukBerusahaNib}
                />
                <InputField
                  label="Nomor Sertifikat Standar"
                  value={nomorSertifikatStandar}
                  onChange={(e) => setNomorSertifikatStandar(e.target.value)}
                  error={errors.nomorSertifikatStandar}
                />
                <InputField label="Ruang Lingkup Usaha" value={ruangLingkupUsaha} onChange={(e) => setRuangLingkupUsaha(e.target.value)} error={errors.ruangLingkupUsaha} />
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
              <h5 className="font-bold">Kontak</h5>
            </div>
            <InfoItem number="1" title="Nama Direktur" description="Isi dengan nama lengkap direktur utama atau penanggung jawab badan usaha." />
            <InfoItem number="2" title="Nomor HP Direktur" description="Masukkan nomor ponsel aktif yang bisa dihubungi." />
            <InfoItem number="3" title="Alamat" description="Tulis alamat lengkap kantor atau lokasi usaha sesuai dokumen resmi." />
          </div>

          <div className="col-span-12 lg:col-span-6">
            <Card>
              <CardContent className="space-y-4">
                <InputField label="Nama Direktur" value={namaDirektur} onChange={(e) => setNamaDirektur(e.target.value)} error={errors.namaDirektur} />
                <InputField label="Nomor HP" value={nomorHpDirektur} onChange={(e) => setNomorHpDirektur(e.target.value)} error={errors.nomorHpDirektur} />
                <InputField label="Alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} error={errors.alamat} />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </form>
  );
});

export default FormPelakuUsahaPage;
