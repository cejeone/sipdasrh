"use client";

import { IconCircleX, IconFrame } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link2, List } from "lucide-react";
import InfoItem from "@/components/InfoItem";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import ButtonSubmit from "@/components/ButtonSubmit";
import { FC, use, useEffect, useRef, useState } from "react";
import FormKabupatenPage, { FormKabupatenRef } from "../../components/form";
import { AxiosInstance } from "lib/axios";
import { KabupatenKota } from "@/model/admin/struktur-wilayah/KabupatenKota";
import { Provinsi, ProvinsiResponse } from "@/model/admin/struktur-wilayah/Provinsi";
import { ApiResponse } from "@/model/ApiResponse";

type Params = {
  id: number;
};

interface EditKabupatenPageProps {
  params: Promise<Params>;
}

const EditKabupatenPage: FC<EditKabupatenPageProps> = (props) => {
  // setupInterceptor();
  const { id } = use(props.params);

  const formRef = useRef<FormKabupatenRef>(null);

  const [data, setData] = useState<KabupatenKota | null>(null);
  const [dataProvinsi, setDataProvinsi] = useState<Provinsi[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get<KabupatenKota>(`/kabupaten-kota/${id}`);
        const responseData = response.data;
        setData(responseData);

        const responseProvinsi = await AxiosInstance.get<ApiResponse<ProvinsiResponse>>("/provinsi");
        const responseProvinsiData = responseProvinsi.data;

        setDataProvinsi(responseProvinsiData._embedded?.provinsiList);

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
                { label: "Kabupaten", href: "/cms/masterdata/struktur-wilayah/kabupaten" },
                { label: "Ubah Data" },
              ]}
            />
            <div className="flex items-center gap-2 text-secondary-green">
              <List />
              <h1 className="text-2xl font-bold">Kabupaten / Kota</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Perbaharui
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk mengubah data kabupaten / kota</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <ButtonSubmit onClick={() => formRef.current?.submit()} />
            <Link href="/cms/masterdata/struktur-wilayah/kabupaten">
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
              <InfoItem number="1" title="Provinsi" description="Pilih nama  provinsi dari kabupaten / kota terkait." />
              <InfoItem number="2" title="Kabupaten / Kota" description="Masukkan nama untuk setiap kab/kota." />
              <InfoItem number="3" title="Kode DEPDAGRI" description="Kode wilayah resmi dari Kemendagri untuk identifikasi administrasi daerah." />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <FormKabupatenPage type="EDIT" provinsiList={dataProvinsi} ref={formRef} defaultValues={data} />
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EditKabupatenPage;
