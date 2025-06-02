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
import { FormKelurahanRef } from "../../components/form";
import { AxiosInstance } from "lib/axios";
import { Kecamatan, KecamatanResponse } from "@/model/admin/struktur-wilayah/Kecamatan";
import { ApiResponse } from "@/model/ApiResponse";
import FormKelurahanPage from "../../components/form";
import { KelurahanDesa } from "@/model/admin/struktur-wilayah/KelurahanDesa";

type Params = {
  id: number;
};

interface EditKelurahanPageProps {
  params: Promise<Params>;
}

const EditKelurahanPage: FC<EditKelurahanPageProps> = (props) => {
  // setupInterceptor();
  const { id } = use(props.params);

  const formRef = useRef<FormKelurahanRef>(null);

  const [data, setData] = useState<KelurahanDesa | null>(null);
  const [dataKecamatan, setDataKecamatan] = useState<Kecamatan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get<KelurahanDesa>(`/kelurahan-desa/${id}`);
        const responseData = response.data;
        setData(responseData);

        const responseKecamatan = await AxiosInstance.get<ApiResponse<KecamatanResponse>>("/kecamatan");
        const responseKecamatanData = responseKecamatan.data;

        setDataKecamatan(responseKecamatanData._embedded?.kecamatanList);

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
                { label: "Kelurahan", href: "/cms/masterdata/struktur-wilayah/kelurahan" },
                { label: "Ubah Data" },
              ]}
            />
            <div className="flex items-center gap-2 text-secondary-green">
              <List />
              <h1 className="text-2xl font-bold">Kelurahan / Desa</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Perbaharui
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk mengubah data kelurahan / desa</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <ButtonSubmit onClick={() => formRef.current?.submit()} />
            <Link href="/cms/masterdata/struktur-wilayah/kelurahan">
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
              <InfoItem number="1" title="Kecamatan" description="Pilih nama Kecamatan dari Kelurahan/Desa terkait." />
              <InfoItem number="2" title="Kelurahan/Desa" description="Masukkan nama untuk setiap Kelurahan/Desa." />
              {/* <InfoItem number="3" title="Kode DEPDAGRI" description="Kode wilayah resmi dari Kemendagri untuk identifikasi administrasi daerah." /> */}
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <FormKelurahanPage type="EDIT" kecamatanList={dataKecamatan} ref={formRef} defaultValues={data} />
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EditKelurahanPage;
