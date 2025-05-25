"use client";

import { IconCircleX, IconFrame } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link2 } from "lucide-react";
import InfoItem from "@/components/InfoItem";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import ButtonSubmit from "@/components/ButtonSubmit";
import { FC, use, useEffect, useRef, useState } from "react";
import FormGeoservicePage, { FormGeoserviceRef } from "../../components/form";
import { Geoservice } from "@/model/pepdas/Geoservice";
import { AxiosInstancePepdas } from "lib/axios";

type Params = {
  id: string;
};

interface EditGeoservicePageProps {
  params: Promise<Params>;
}

const EditGeoservicePage: FC<EditGeoservicePageProps> = (props) => {
  // setupInterceptor();
  const { id } = use(props.params);

  const formRef = useRef<FormGeoserviceRef>(null);

  const [data, setData] = useState<Geoservice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstancePepdas.get<Geoservice>(`/geoservices/${id}`);

        const responseData = response.data;

        console.log(responseData);

        setData(responseData);
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
            <Breadcrumbs items={[{ label: "PEPDAS", href: "" }, { label: "Geoservice", href: "/cms/pepdas/geoservice" }, { label: "Ubah Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <Link2 />
              <h1 className="text-2xl font-bold">Geoservice</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Perbaharui
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk mengubah data geoservice</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <ButtonSubmit onClick={() => formRef.current?.submit()} />
            <Link href="/cms/pepdas/geoservice">
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
              <InfoItem number="1" title="Direktorat" description="Pilih Direktorat teknis yang menaungi pengelolaan dan integrasi data geospasial ini dalam sistem." />
              <InfoItem number="2" title="BPDAS" description="Pilih BPDAS (Balai Pengelolaan Daerah Aliran Sungai) yang bertanggung jawab atas layanan atau data tersebut." />
              <InfoItem number="3" title="Geoservice ID" description="Masukkan ID unik untuk geoservice yang akan diregistrasi." />
              <InfoItem
                number="4"
                title="URL"
                description="Masukkan URL endpoint dari layanan geospasial. Contoh: https://geo.example.com/wms. URL ini digunakan sistem untuk mengakses dan menampilkan data spasial."
              />
              <InfoItem
                number="5"
                title="Tipe"
                description="Pilih tipe layanan geospasial yang didaftarkan. Contoh: WMS, WFS, WMTS, atau lainnya yang sesuai dengan spesifikasi layanan."
              />
              <InfoItem number="6" title="Service" description="Masukkan nama layanan atau label yang mewakili data, institusi penyedia, atau proyek tertentu." />

              <InfoItem
                number="7"
                title="Status"
                description="Tentukan status layanan: Aktif (jika layanan tersedia dan dapat digunakan) atau Nonaktif (jika layanan belum aktif atau sedang dalam pemeliharaan)."
              />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <FormGeoservicePage type="EDIT" ref={formRef} defaultValues={data} />
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EditGeoservicePage;
