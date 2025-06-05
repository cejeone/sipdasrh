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
import FormMonevPusatPage, { FormMonevPusatRef } from "../../components/form";
import { MonevPusat } from "@/model/rh/MonevPusat";
import { AxiosInstance } from "lib/axios";
import { Provinsi, ProvinsiResponse } from "@/model/admin/struktur-wilayah/Provinsi";
import { ApiResponse } from "@/model/ApiResponse";
import { KabupatenKota, KabupatenKotaResponse } from "@/model/admin/struktur-wilayah/KabupatenKota";
import { Kecamatan, KecamatanResponse } from "@/model/admin/struktur-wilayah/Kecamatan";
import { KelurahanDesa, KelurahanDesaResponse } from "@/model/admin/struktur-wilayah/KelurahanDesa";
import { Lov, LovResponse } from "@/model/admin/Lov";
import { Bpdas, BpdasResponse } from "@/model/admin/organisasi/Bpdas";

type Params = {
  id: number;
};

interface EditMonevPusatPageProps {
  params: Promise<Params>;
}

const EditMonevPusatPage: FC<EditMonevPusatPageProps> = (props) => {
  // setupInterceptor();
  const { id } = use(props.params);

  const formRef = useRef<FormMonevPusatRef>(null);
  const [dataBpdas, setBpdas] = useState<Bpdas[]>([]);

  const [data, setData] = useState<MonevPusat | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get<MonevPusat>(`/monev-pusat/${id}`);
        const responseData = response.data;
        console.log(responseData);
        setData(responseData);

        const responseBpdas = await AxiosInstance.get<ApiResponse<BpdasResponse>>("/bpdas");
        const responseDataBpdas = responseBpdas.data;
        setBpdas(responseDataBpdas._embedded?.bpdasList);

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
            <Breadcrumbs items={[{ label: "Rencana Kerja RH", href: "" }, { label: "Monev Pusat", href: "/cms/masterdata/monev-pusat" }, { label: "Ubah Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <Building />
              <h1 className="text-2xl font-bold">Monitoring & Evaluasi Program</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Perbaharui
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk mengubah data monev pusat</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <ButtonSubmit onClick={() => formRef.current?.submit()} />
            <Link href="/cms/rh/rencana-kerja/monev-pusat">
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
        <FormMonevPusatPage type="EDIT" bpdasList={dataBpdas} ref={formRef} defaultValues={data} />
      </main>
    </div>
  );
};

export default EditMonevPusatPage;
