"use client";

import { IconCircleX, IconFrame } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { List } from "lucide-react";
import InfoItem from "@/components/InfoItem";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import ButtonSubmit from "@/components/ButtonSubmit";
import { FC, use, useEffect, useRef, useState } from "react";
import FormKabupatenPage, { FormKecamatanRef } from "../../components/form";
import { AxiosInstance } from "lib/axios";
import { KabupatenKota, KabupatenKotaResponse } from "@/model/admin/struktur-wilayah/KabupatenKota";
import { ApiResponse } from "@/model/ApiResponse";
import { Kecamatan } from "@/model/admin/struktur-wilayah/Kecamatan";

type Params = {
  id: number;
};

interface EditKecamatanPageProps {
  params: Promise<Params>;
}

const EditKecamatanPage: FC<EditKecamatanPageProps> = (props) => {
  // setupInterceptor();
  const { id } = use(props.params);

  const formRef = useRef<FormKecamatanRef>(null);

  const [data, setData] = useState<Kecamatan | null>(null);
  const [dataKabupatenKota, setDataKabupatenKota] = useState<KabupatenKota[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get<Kecamatan>(`/kecamatan/${id}`);
        const responseData = response.data;
        setData(responseData);

        const responseKabupatenKota = await AxiosInstance.get<ApiResponse<KabupatenKotaResponse>>("/kabupaten-kota");
        const responseKabupatenKotaData = responseKabupatenKota.data;

        setDataKabupatenKota(responseKabupatenKotaData._embedded?.kabupatenKotaList);

        console.log(responseData);
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
            <Breadcrumbs
              items={[
                { label: "Masterdata", href: "" },
                { label: "Struktur Wilayah", href: "" },
                { label: "Kecamatan", href: "/cms/masterdata/struktur-wilayah/kecamatan" },
                { label: "Ubah Data" },
              ]}
            />
            <div className="flex items-center gap-2 text-secondary-green">
              <List />
              <h1 className="text-2xl font-bold">Kecamatan</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Perbaharui
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk mengubah data kecamatan</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <ButtonSubmit onClick={() => formRef.current?.submit()} />
            <Link href="/cms/masterdata/struktur-wilayah/kecamatan">
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
              <InfoItem number="1" title="Kabupaten" description="Pilih nama  Kabupaten / Kota dari Kecamatan terkait." />
              <InfoItem number="2" title="Kecamatan" description="Masukkan nama untuk setiap Kecamatan." />
              <InfoItem number="3" title="Kode DEPDAGRI" description="Kode wilayah resmi dari Kemendagri untuk identifikasi administrasi daerah." />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <FormKabupatenPage type="EDIT" kabupatenKotaList={dataKabupatenKota} ref={formRef} defaultValues={data} />
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EditKecamatanPage;
