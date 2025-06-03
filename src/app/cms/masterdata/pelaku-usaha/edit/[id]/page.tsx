"use client";

import { IconCircleX, IconFrame } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building } from "lucide-react";
import InfoItem from "@/components/InfoItem";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import ButtonSubmit from "@/components/ButtonSubmit";
import { FC, use, useEffect, useRef, useState } from "react";
import FormKelompokMasyarakatPage, { FormKelompokMasyarakatRef } from "../../components/form";
import { KelompokMasyarakat } from "@/model/admin/masterdata/KelompokMasyarakat";
import { AxiosInstance } from "lib/axios";
import { Provinsi, ProvinsiResponse } from "@/model/admin/struktur-wilayah/Provinsi";
import { ApiResponse } from "@/model/ApiResponse";
import { KabupatenKota, KabupatenKotaResponse } from "@/model/admin/struktur-wilayah/KabupatenKota";
import { Kecamatan, KecamatanResponse } from "@/model/admin/struktur-wilayah/Kecamatan";
import { KelurahanDesa, KelurahanDesaResponse } from "@/model/admin/struktur-wilayah/KelurahanDesa";

type Params = {
  id: number;
};

interface EditKelompokMasyarakatPageProps {
  params: Promise<Params>;
}

const EditKelompokMasyarakatPage: FC<EditKelompokMasyarakatPageProps> = (props) => {
  // setupInterceptor();
  const { id } = use(props.params);

  const formRef = useRef<FormKelompokMasyarakatRef>(null);
  const [dataProvinsi, setDataProvinsi] = useState<Provinsi[]>([]);
  const [dataKabupatenKota, setDataKabupatenKota] = useState<KabupatenKota[]>([]);
  const [dataKecamatan, setDataKecamatan] = useState<Kecamatan[]>([]);
  const [dataKelurahanDesa, setDataKelurahanDesa] = useState<KelurahanDesa[]>([]);
  const [data, setData] = useState<KelompokMasyarakat | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get<KelompokMasyarakat>(`/kelompok-masyarakat/${id}`);
        const responseData = response.data;
        console.log(responseData);
        setData(responseData);

        const responseProv = await AxiosInstance.get<ApiResponse<ProvinsiResponse>>("/provinsi");
        const responseDataProv = responseProv.data;
        setDataProvinsi(responseDataProv._embedded?.provinsiList);

        const responseKab = await AxiosInstance.get<ApiResponse<KabupatenKotaResponse>>("/kabupaten-kota");
        const responseDataKab = responseKab.data;
        setDataKabupatenKota(responseDataKab._embedded?.kabupatenKotaList);

        const responseKec = await AxiosInstance.get<ApiResponse<KecamatanResponse>>("/kecamatan");
        const responseDataKec = responseKec.data;
        setDataKecamatan(responseDataKec._embedded?.kecamatanList);

        const responseKel = await AxiosInstance.get<ApiResponse<KelurahanDesaResponse>>("/kelurahan-desa");
        const responseDataKel = responseKel.data;
        setDataKelurahanDesa(responseDataKel._embedded?.kelurahanDesaList);

        setLoading(false);
      } catch (error: any) {
        setError(error.message || "Gagal mendapatkan data");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div>
            <Breadcrumbs items={[{ label: "Masterdata", href: "" }, { label: "Kelompok Masyarakat", href: "/cms/masterdata/kelompok-masyarakat" }, { label: "Ubah Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <Building />
              <h1 className="text-2xl font-bold">Kelompok Masyarakat</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Perbaharui
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk mengubah data kelompok masyarakat</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <ButtonSubmit onClick={() => formRef.current?.submit()} />
            <Link href="/cms/masterdata/kelompok-masyarakat">
              <Button variant="outline">
                <IconCircleX /> Batal
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <hr className="mb-2" />

      {/* Form Section */}
      <main className="overflow-auto h-full">
        <Card className="border border-border p-4 mb-2 bg-card">
          <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-0">
            <div className="col-span-12 lg:col-span-6 border-r space-y-4 pl-4">
              <div className="title text-base-green flex items-center gap-1">
                <IconFrame />
                <h5 className="font-bold">Informasi</h5>
              </div>
              <InfoItem number="3" title="Tanggal SK Penetapan" description="Pilih tanggal diterbitkannya Surat Keputusan (SK) penetapan kelompok masyarakat." />
              <InfoItem number="4" title="Provinsi" description="Pilih nama provinsi tempat kelompok tani berlokasi." />
              <InfoItem number="5" title="Kabupaten/Kota" description="Pilih nama kabupaten atau kota tempat kelompok tani berada dari daftar yang tersedia." />
              <InfoItem number="6" title="Kecamatan" description="Pilih nama kecamatan tempat kelompok tani berada dari daftar yang tersedia." />
              <InfoItem number="7" title="Kelurahan/Desa" description="Pilih nama kelurahan atau desa tempat kelompok tani berada dari daftar yang tersedia." />
              <InfoItem number="8" title="Alamat" description="Masukkan alamat lengkap lokasi kelompok masyarakat." />
              <InfoItem number="9" title="Telepon" description="Masukkan nomor telepon yang dapat dihubungi terkait kelompok masyarakat." />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <FormKelompokMasyarakatPage
                  type="EDIT"
                  provinsiList={dataProvinsi}
                  kabupatenKotaList={dataKabupatenKota}
                  kecamatanList={dataKecamatan}
                  kelurahanDesaList={dataKelurahanDesa}
                  ref={formRef}
                  defaultValues={data}
                />
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EditKelompokMasyarakatPage;
