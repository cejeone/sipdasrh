"use client";

import { IconCircleX } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import ButtonSubmit from "@/components/ButtonSubmit";
import { useEffect, useRef, useState } from "react";
import FormProgramPage, { FormProgramRef } from "../components/form";
import { ApiResponse } from "@/model/ApiResponse";
import { AxiosInstance } from "lib/axios";
import { Lov, LovResponse } from "@/model/admin/Lov";
import { Eselon2, Eselon2Response } from "@/model/admin/organisasi/Eselon2";

const CreateProgramPage = () => {
  const [dataLov, setLov] = useState<Lov[]>([]);
  const [dataEselon2, setEselon2] = useState<Eselon2[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseLov = await AxiosInstance.get<ApiResponse<LovResponse>>("/lov");
        const responseDataLov = responseLov.data;
        setLov(responseDataLov._embedded?.lovList);
        
        const responseEselon2 = await AxiosInstance.get<ApiResponse<Eselon2Response>>("/eselon2");
        const responseDataEselon2 = responseEselon2.data;
        setEselon2(responseDataEselon2._embedded?.eselon2List);

        // console.log(responseData);
      } catch (error: any) {
        setError(error?.message || "Gagal mendapatkan data");
        console.error("Fetch provinsi gagal:", error);
      }
    };

    fetchData();
  }, []);

  const formRef = useRef<FormProgramRef>(null);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div>
            <Breadcrumbs items={[{ label: "Rencana Kerja", href: "" }, { label: "Program", href: "/cms/rh/rencana-kerja/program" }, { label: "Buat Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <Building2 />
              <h1 className="text-2xl font-bold">Program</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Tambah
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk membuat data monev program</p>
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
        <FormProgramPage type="ADD" lovList={dataLov} eselon2List={dataEselon2} ref={formRef} />
      </main>
    </div>
  );
};

export default CreateProgramPage;
