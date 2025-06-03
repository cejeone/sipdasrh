"use client";

import { setupInterceptor } from "lib/axios";
import { useRouter } from "next/navigation";
import { kelompokMasyarakatFormSchema } from "../lib/validation";
import { createKelompokMasyarakat, editKelompokMasyarakat } from "../lib/action";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { CardContent } from "@/components/ui/card";
import InputField from "@/components/InputField";
import { toast } from "sonner";
import { KelompokMasyarakat } from "@/model/admin/masterdata/KelompokMasyarakat";
import SelectCombobox from "@/components/SelectCombobox";
import { Provinsi } from "@/model/admin/struktur-wilayah/Provinsi";
import { Kecamatan } from "@/model/admin/struktur-wilayah/Kecamatan";
import { KabupatenKota } from "@/model/admin/struktur-wilayah/KabupatenKota";
import { KelurahanDesa } from "@/model/admin/struktur-wilayah/KelurahanDesa";

interface FormKelompokMasyarakatProps {
  type?: "ADD" | "EDIT";
  defaultValues?: KelompokMasyarakat | null;
  provinsiList: Provinsi[];
  kabupatenKotaList: KabupatenKota[];
  kecamatanList: Kecamatan[];
  kelurahanDesaList: KelurahanDesa[];
}

export interface FormKelompokMasyarakatRef {
  submit: () => void;
}

const FormKelompokMasyarakatPage = forwardRef<FormKelompokMasyarakatRef, FormKelompokMasyarakatProps>(
  ({ type, defaultValues, provinsiList, kabupatenKotaList, kecamatanList, kelurahanDesaList }, ref) => {
    // setupInterceptor();
    const router = useRouter();

    const [namaKelompokMasyarakat, setNamaKelompokMasyarakat] = useState("");
    const [provinsiId, setProvinsiId] = useState("");
    const [kabupatenKotaId, setKabupatenKotaId] = useState("");
    const [kecamatanId, setKecamatanId] = useState("");
    const [kelurahanDesaId, setKelurahanDesaId] = useState("");
    const [alamat, setAlamat] = useState("");
    const [telepon, setTelepon] = useState("");
    // const [pic, setPic] = useState("");
    const [nomorSkPenetapan, setNomorSkPenetapan] = useState("");
    const [tanggalSkPenetapan, setTanggalSkPenetapan] = useState("");

    const [errors, setErrors] = useState<Record<string, string>>({});
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
      if (type == "EDIT" && defaultValues) {
        setProvinsiId(String(defaultValues?.provinsi?.id ?? ""));
        setKabupatenKotaId(String(defaultValues?.kabupatenKota?.id ?? ""));
        setKecamatanId(String(defaultValues?.kecamatan?.id ?? ""));
        setKelurahanDesaId(String(defaultValues?.kelurahanDesa?.id ?? ""));

        setNamaKelompokMasyarakat(defaultValues.namaKelompokMasyarakat || "");
        setAlamat(defaultValues.alamat || "");
        setTelepon(defaultValues.telepon || "");
        // setPic(defaultValues.pic || "");
        setNomorSkPenetapan(defaultValues.nomorSkPenetapan || "");
        setTanggalSkPenetapan(defaultValues.tanggalSkPenetapan || "");
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

    const handleKelompokMasyarakat = async (e: React.FormEvent) => {
      e.preventDefault();

      const safeNumber = (value: string) => (value.trim() === "" ? undefined : Number(value));

      try {
        const validation = kelompokMasyarakatFormSchema.safeParse({
          namaKelompokMasyarakat,
          alamat,
          telepon,
          // pic,
          nomorSkPenetapan,
          tanggalSkPenetapan,
          provinsiId: safeNumber(provinsiId),
          kabupatenKotaId: safeNumber(kabupatenKotaId),
          kecamatanId: safeNumber(kecamatanId),
          kelurahanDesaId: safeNumber(kelurahanDesaId),
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
          await createKelompokMasyarakat(validData);

          router.push("/cms/masterdata/kelompok-masyarakat");
          toast.success("Berhasil menambahkan data");
        } else {
          if (defaultValues?.id) {
            await editKelompokMasyarakat(validData, defaultValues.id);

            router.push("/cms/masterdata/kelompok-masyarakat");
            toast.success("Berhasil memperbaharui data");
          }
        }
      } catch (error) {
        console.error("Terjadi kesalahan saat menyimpan dokumen:", error);
        toast.error("Terjadi kesalahan saat menyimpan data");
      }
    };

    return (
      <form ref={formRef} onSubmit={handleKelompokMasyarakat}>
        <CardContent className="space-y-4">
          <InputField
            label="Nama Kelompok Masyarakat"
            value={namaKelompokMasyarakat}
            onChange={(e) => setNamaKelompokMasyarakat(e.target.value)}
            error={errors.namaKelompokMasyarakat}
          />

          <InputField label="Nomor SK Penetapan" value={nomorSkPenetapan} onChange={(e) => setNomorSkPenetapan(e.target.value)} error={errors.nomorSkPenetapan} />

          <InputField
            type="date"
            label="Tanggal SK Penetapan"
            value={tanggalSkPenetapan}
            onChange={(e) => setTanggalSkPenetapan(e.target.value)}
            error={errors.tanggalSkPenetapan}
          />

          <SelectCombobox
            label="Provinsi"
            value={provinsiId}
            onChange={setProvinsiId}
            options={provinsiList.map((prov) => ({
              label: prov.namaProvinsi,
              value: String(prov.id),
            }))}
            error={errors.provinsiId}
          />

          <SelectCombobox
            label="Kabupaten / Kota"
            value={kabupatenKotaId}
            onChange={setKabupatenKotaId}
            options={kabupatenKotaList.map((kab) => ({
              label: kab.kabupatenKota,
              value: String(kab.id),
            }))}
            error={errors.kabupatenKotaId}
          />

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

          <SelectCombobox
            label="Kelurahan / Desa"
            value={kelurahanDesaId}
            onChange={setKelurahanDesaId}
            options={kelurahanDesaList.map((kel) => ({
              label: kel.kelurahan,
              value: String(kel.id),
            }))}
            error={errors.kelurahanDesaId}
          />

          <InputField label="Alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} error={errors.alamat} />
          <InputField label="Telepon" value={telepon} onChange={(e) => setTelepon(e.target.value)} error={errors.telepon} />
        </CardContent>
      </form>
    );
  }
);

export default FormKelompokMasyarakatPage;
