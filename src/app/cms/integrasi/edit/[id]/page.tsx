"use client";

import { IconCircleX } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import ButtonSubmit from "@/components/ButtonSubmit";
import { FC, use, useEffect, useRef, useState } from "react";
import FormIntegrasiPage, { FormIntegrasiRef } from "../../components/form";
import { Integrasi } from "@/model/admin/Integrasi";
import { AxiosInstance } from "lib/axios";
import { ApiResponse } from "@/model/ApiResponse";
import { Lov, LovResponse } from "@/model/admin/Lov";

type Params = {
  id: string;
};

interface EditIntegrasiPageProps {
  params: Promise<Params>;
}

const EditIntegrasiPage: FC<EditIntegrasiPageProps> = (props) => {
  // setupInterceptor();
  const { id } = use(props.params);

  const formRef = useRef<FormIntegrasiRef>(null);

  const [data, setData] = useState<Integrasi | null>(null);
  const [dataStatus, setStatus] = useState<Lov[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get<Integrasi>(`/integrasi/${id}`);
        const responseData = response.data;
        console.log(responseData);
        setData(responseData);

        const responseLov = await AxiosInstance.get<ApiResponse<LovResponse>>("/lovs?namaKategori=STATUS");
        const responseDataLov = responseLov.data;
        setStatus(responseDataLov._embedded?.lovList);

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
            <Breadcrumbs items={[{ label: "Integrasi", href: "/cms/integrasi" }, { label: "Ubah Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <LinkIcon />
              <h1 className="text-2xl font-bold">Integrasi</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Perbaharui
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk mengubah data integrasi</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <ButtonSubmit onClick={() => formRef.current?.submit()} />
            <Link href="/cms/integrasi">
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
        <FormIntegrasiPage type="EDIT" dataStatus={dataStatus} ref={formRef} defaultValues={data} />
      </main>
    </div>
  );
};

export default EditIntegrasiPage;
