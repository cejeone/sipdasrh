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
import FormPelakuUsahaPage, { FormPelakuUsahaRef } from "../../components/form";
import { PelakuUsaha } from "@/model/admin/masterdata/PelakuUsaha";
import { AxiosInstance } from "lib/axios";
import { Provinsi, ProvinsiResponse } from "@/model/admin/struktur-wilayah/Provinsi";
import { ApiResponse } from "@/model/ApiResponse";
import { KabupatenKota, KabupatenKotaResponse } from "@/model/admin/struktur-wilayah/KabupatenKota";
import { Kecamatan, KecamatanResponse } from "@/model/admin/struktur-wilayah/Kecamatan";
import { KelurahanDesa, KelurahanDesaResponse } from "@/model/admin/struktur-wilayah/KelurahanDesa";
import { Lov, LovResponse } from "@/model/admin/Lov";

type Params = {
  id: number;
};

interface EditPelakuUsahaPageProps {
  params: Promise<Params>;
}

const EditPelakuUsahaPage: FC<EditPelakuUsahaPageProps> = (props) => {
  // setupInterceptor();
  const { id } = use(props.params);

  const formRef = useRef<FormPelakuUsahaRef>(null);
  const [dataKategoriPelakuUsaha, setKategoriPelakuUsaha] = useState<Lov[]>([]);

  const [data, setData] = useState<PelakuUsaha | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get<PelakuUsaha>(`/pelaku-usaha/${id}`);
        const responseData = response.data;
        console.log(responseData);
        setData(responseData);

        const responseLov = await AxiosInstance.get<ApiResponse<LovResponse>>("/lovs?namaKategori=PELAKU_USAHA");
        const responseDataLov = responseLov.data;
        setKategoriPelakuUsaha(responseDataLov._embedded?.lovList);

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
            <Breadcrumbs items={[{ label: "Masterdata", href: "" }, { label: "Pelaku Usaha", href: "/cms/masterdata/pelaku-usaha" }, { label: "Ubah Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <Building />
              <h1 className="text-2xl font-bold">Pelaku Usaha</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Perbaharui
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk mengubah data pelaku usaha</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <ButtonSubmit onClick={() => formRef.current?.submit()} />
            <Link href="/cms/masterdata/pelaku-usaha">
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
        <FormPelakuUsahaPage type="EDIT" lovList={dataKategoriPelakuUsaha} ref={formRef} defaultValues={data} />
      </main>
    </div>
  );
};

export default EditPelakuUsahaPage;
