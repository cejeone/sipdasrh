"use client";

import { setupInterceptor } from "lib/axios";
import { useRouter } from "next/navigation";
import { InstitusiFormSchema } from "../lib/validation";
import { createInstitusi, editInstitusi } from "../lib/action";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import InputField from "@/components/InputField";
import { toast } from "sonner";
import { Institusi } from "@/model/admin/Institusi";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SelectCombobox from "@/components/SelectCombobox";
import { Lov } from "@/model/admin/Lov";
import InfoItem from "@/components/InfoItem";
import { IconFrame } from "@tabler/icons-react";
import { Provinsi } from "@/model/admin/struktur-wilayah/Provinsi";
import { Kecamatan } from "@/model/admin/struktur-wilayah/Kecamatan";
import { KabupatenKota } from "@/model/admin/struktur-wilayah/KabupatenKota";

interface FormInstitusiProps {
  type?: "ADD" | "EDIT";
  defaultValues?: Institusi | null;
  lovList: Lov[];
  dataTipeAkreditasi: Lov[];
  dataStatus: Lov[];
  provinsiList: Provinsi[];
  kabupatenKotaList: KabupatenKota[];
  kecamatanList: Kecamatan[];
}

export interface FormInstitusiRef {
  submit: () => void;
}

const FormInstitusiPage = forwardRef<FormInstitusiRef, FormInstitusiProps>(
  ({ type, defaultValues, lovList, dataTipeAkreditasi, dataStatus, provinsiList, kabupatenKotaList, kecamatanList }, ref) => {
    // setupInterceptor();
    const router = useRouter();

    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [nomorTelepon, setNomorTelepon] = useState("");
    const [website, setWebsite] = useState("");
    const [tipeInstitusiId, setTipeInstitusiId] = useState("");
    const [tipeAkreditasiId, setTipeAkreditasiId] = useState("");
    const [provinsiId, setProvinsiId] = useState("");
    const [kabupatenKotaId, setKabupatenKotaId] = useState("");
    const [kecamatanId, setKecamatanId] = useState("");
    const [alamat, setAlamat] = useState("");
    const [kodePos, setKodePos] = useState("");
    const [statusId, setStatusiId] = useState("");

    const [errors, setErrors] = useState<Record<string, string>>({});
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
      if (type == "EDIT" && defaultValues) {
        setNama(defaultValues.nama || "");
        setEmail(defaultValues.email || "");
        setNomorTelepon(defaultValues.nomorTelepon || "");
        setWebsite(defaultValues.website || "");
        setTipeInstitusiId(String(defaultValues?.tipeInstitusi?.id ?? ""));
        setTipeAkreditasiId(String(defaultValues?.tipeAkreditasi?.id ?? ""));
        setProvinsiId(String(defaultValues?.provinsi?.id ?? ""));
        setKabupatenKotaId(String(defaultValues?.kabupatenKota?.id ?? ""));
        setKecamatanId(String(defaultValues?.kecamatan?.id ?? ""));
        setAlamat(defaultValues.alamat || "");
        setKodePos(defaultValues.kodePos || "");
        setStatusiId(String(defaultValues?.status?.id ?? ""));
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

    const handleInstitusi = async (e: React.FormEvent) => {
      e.preventDefault();

      const safeNumber = (value: string) => (value.trim() === "" ? undefined : Number(value));

      try {
        const validation = InstitusiFormSchema.safeParse({
          nama,
          email,
          nomorTelepon,
          website,
          tipeInstitusiId: safeNumber(tipeInstitusiId),
          tipeAkreditasiId: safeNumber(tipeAkreditasiId),
          provinsiId: safeNumber(provinsiId),
          kabupatenKotaId: safeNumber(kabupatenKotaId),
          kecamatanId: safeNumber(kecamatanId),
          alamat,
          kodePos,
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
          await createInstitusi(validData);

          router.push("/cms/institusi");
          toast.success("Berhasil menambahkan data");
        } else {
          if (defaultValues?.id) {
            await editInstitusi(validData, defaultValues.id);

            router.push("/cms/institusi");
            toast.success("Berhasil memperbaharui data");
          }
        }
      } catch (error) {
        console.error("Terjadi kesalahan saat menyimpan dokumen:", error);
        toast.error("Terjadi kesalahan saat menyimpan data");
      }
    };

    return (
      <form ref={formRef} onSubmit={handleInstitusi}>
        <Card className="border border-border p-4 mb-2 bg-card">
          <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-0">
            <div className="col-span-12 lg:col-span-6 border-r space-y-4 pl-4">
              <div className="title text-base-green flex items-center gap-1">
                <IconFrame />
                <h5 className="font-bold">Informasi</h5>
              </div>
              <InfoItem number="1" title="Nama" description="Masukkan nama resmi institusi yang berperan dalam kegiatan atau layanan terkait sistem." />
              <InfoItem number="2" title="Email" description="Alamat email institusi yang dapat dihubungi untuk keperluan komunikasi resmi atau teknis." />
              <InfoItem number="3" title="Nomor Telepon" description="Nomor telepon institusi yang aktif untuk layanan informasi, koordinasi, atau dukungan operasional." />
              <InfoItem number="4" title="Website" description="Alamat situs web resmi institusi sebagai sumber informasi tambahan mengenai profil, program, dan layanan." />
              <InfoItem
                number="5"
                title="Tipe Institusi"
                description="Klasifikasi institusi berdasarkan sifat organisasinya, seperti Pemerintah, Swasta, Lembaga Riset, atau Akademik."
              />
              <InfoItem
                number="6"
                title="Tipe Akreditasi"
                description="Status atau jenis akreditasi resmi yang dimiliki institusi, yang menunjukkan tingkat kualitas, kualifikasi, atau pengakuan lembaga oleh otoritas yang relevan."
              />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <CardContent className="space-y-4">
                  <InputField label="Nama" value={nama} onChange={(e) => setNama(e.target.value)} error={errors.nama} />
                  <InputField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
                  <InputField label="Nomor Telepon" value={nomorTelepon} onChange={(e) => setNomorTelepon(e.target.value)} error={errors.nomorTelepon} />
                  <InputField label="Website" value={website} onChange={(e) => setWebsite(e.target.value)} error={errors.website} />
                  <SelectCombobox
                    label="Tipe Institusi"
                    value={tipeInstitusiId}
                    onChange={setTipeInstitusiId}
                    options={lovList.map((lov) => ({
                      label: lov.nilai,
                      value: String(lov.id),
                    }))}
                    error={errors.tipeInstitusiId}
                  />
                  <SelectCombobox
                    label="Tipe Akreditasi"
                    value={tipeAkreditasiId}
                    onChange={setTipeAkreditasiId}
                    options={dataTipeAkreditasi.map((lov) => ({
                      label: lov.nilai,
                      value: String(lov.id),
                    }))}
                    error={errors.tipeAkreditasiId}
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
                <h5 className="font-bold">Alamat</h5>
              </div>
              <InfoItem number="1" title="Provinsi" description="Pilih nama provinsi tempat institusi tersebut berada secara administratif." />
              <InfoItem number="2" title="Kota" description="Pilih nama kota atau kabupaten yang menjadi lokasi institusi, sesuai dengan wilayah operasionalnya." />
              <InfoItem number="3" title="Kecamatan" description="Pilih nama kecamatan yang menjadi lokasi institusi" />
              <InfoItem number="4" title="Alamat" description="Tulis alamat lengkap institusi, mencakup nama jalan, nomor bangunan, dan keterangan lainnya yang relevan." />
              <InfoItem
                number="5"
                title="Kode Pos"
                description="Masukkan kode pos sesuai dengan wilayah domisili institusi untuk keperluan pengiriman surat atau keperluan administratif lainnya."
              />
              <InfoItem number="6" title="Status" description="Pilih salah satu status terkait institusi " />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <CardContent className="space-y-4">
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
                    label="Kota"
                    value={kabupatenKotaId}
                    onChange={setKabupatenKotaId}
                    options={kabupatenKotaList.map((kota) => ({
                      label: kota.kabupatenKota,
                      value: String(kota.id),
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
                  <div>
                    <Label className="text-secondary-green mb-2 font-bold">Alamat</Label>
                    <Textarea className="border-border" value={alamat} onChange={(e) => setAlamat(e.target.value)} placeholder="Masukkan alamat" />
                    {errors.alamat && <p className="text-sm text-base-destructive mt-1">{errors.alamat}</p>}
                  </div>
                  <InputField label="Kode Pos" value={kodePos} onChange={(e) => setKodePos(e.target.value)} error={errors.kodePos} />
                  <SelectCombobox
                    label="Status"
                    value={statusId}
                    onChange={setStatusiId}
                    options={dataStatus.map((lov) => ({
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
  }
);

export default FormInstitusiPage;
