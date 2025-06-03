"use client";

import { IconCircleX, IconFrame } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import ButtonSubmit from "@/components/ButtonSubmit";
import { useEffect, useRef, useState } from "react";
import FormIntegrasiPage, { FormIntegrasiRef } from "../components/form";
import { Lov, LovResponse } from "@/model/admin/Lov";
import { AxiosInstance } from "lib/axios";
import { ApiResponse } from "@/model/ApiResponse";

const CreateIntegrasiPage = () => {
  const [dataStatus, setStatus] = useState<Lov[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseLov = await AxiosInstance.get<ApiResponse<LovResponse>>("/lovs?namaKategori=STATUS");
        const responseDataLov = responseLov.data;
        setStatus(responseDataLov._embedded?.lovList);
        // console.log(responseData);
      } catch (error: any) {
        setError(error?.message || "Gagal mendapatkan data");
        console.error("Fetch provinsi gagal:", error);
      }
    };

    fetchData();
  }, []);

  const formRef = useRef<FormIntegrasiRef>(null);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div>
            <Breadcrumbs items={[{ label: "Integrasi", href: "/cms/integrasi" }, { label: "Buat Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <LinkIcon />
              <h1 className="text-2xl font-bold">Integrasi</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Tambah
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk membuat data integrasi</p>
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
        <FormIntegrasiPage type="ADD" dataStatus={dataStatus} ref={formRef} />
      </main>
    </div>
  );
};

export default CreateIntegrasiPage;
