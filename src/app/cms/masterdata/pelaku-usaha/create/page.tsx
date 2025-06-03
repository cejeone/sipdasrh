"use client";

import { IconCircleX } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import ButtonSubmit from "@/components/ButtonSubmit";
import { useEffect, useRef, useState } from "react";
import FormPelakuUsahaPage, { FormPelakuUsahaRef } from "../components/form";
import { ApiResponse } from "@/model/ApiResponse";
import { AxiosInstance } from "lib/axios";
import { Lov, LovResponse } from "@/model/admin/Lov";

const CreatePelakuUsahaPage = () => {
  const [dataKategoriPelakuUsaha, setKategoriPelakuUsaha] = useState<Lov[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseLov = await AxiosInstance.get<ApiResponse<LovResponse>>("/lovs?namaKategori=PELAKU_USAHA");
        const responseDataLov = responseLov.data;
        setKategoriPelakuUsaha(responseDataLov._embedded?.lovList);

        // console.log(responseData);
      } catch (error: any) {
        setError(error?.message || "Gagal mendapatkan data");
        console.error("Fetch provinsi gagal:", error);
      }
    };

    fetchData();
  }, []);

  const formRef = useRef<FormPelakuUsahaRef>(null);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div>
            <Breadcrumbs items={[{ label: "Masterdata", href: "" }, { label: "Pelaku Usaha", href: "/cms/masterdata/pelaku-usaha" }, { label: "Buat Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <Building2 />
              <h1 className="text-2xl font-bold">Pelaku Usaha</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Tambah
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk membuat data pelaku usaha</p>
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
        <FormPelakuUsahaPage type="ADD" lovList={dataKategoriPelakuUsaha} ref={formRef} />
      </main>
    </div>
  );
};

export default CreatePelakuUsahaPage;
