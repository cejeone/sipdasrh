"use client";

import { IconCircleX, IconFrame } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building, Link2 } from "lucide-react";
import InfoItem from "@/components/InfoItem";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import ButtonSubmit from "@/components/ButtonSubmit";
import { useEffect, useRef, useState } from "react";
import FormEselon2Page, { FormEselon2Ref } from "../components/form";
import { Eselon1, Eselon1Response } from "@/model/admin/organisasi/Eselon1";
import { ApiResponse } from "@/model/ApiResponse";
import { AxiosInstance } from "lib/axios";

const CreateEselon2Page = () => {
  const [dataEselon1, setDataEselon1] = useState<Eselon1[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get<ApiResponse<Eselon1Response>>("/eselon1");
        const responseData = response.data;

        setDataEselon1(responseData._embedded?.eselon1List);
        console.log(responseData);
      } catch (error: any) {
        setError(error?.message || "Gagal mendapatkan data");
        console.error("Fetch provinsi gagal:", error);
      }
    };

    fetchData();
  }, []);

  const formRef = useRef<FormEselon2Ref>(null);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div>
            <Breadcrumbs
              items={[{ label: "Masterdata", href: "" }, { label: "Organisasi", href: "" }, { label: "Eselon II", href: "/cms/organisasi/eselon-2" }, { label: "Buat Data" }]}
            />
            <div className="flex items-center gap-2 text-secondary-green">
              <Building />
              <h1 className="text-2xl font-bold">Eselon II</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Tambah
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk membuat data eselon II</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <ButtonSubmit onClick={() => formRef.current?.submit()} />
            <Link href="/cms/organisasi/eselon-2">
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
              <InfoItem number="1" title="Eselon I" description="Pilih organisasi Eselon I sesuai struktur kelembagaan." />
              <InfoItem number="2" title="Nama" description="Masukkan nama resmi unit organisasi Eselon I sesuai struktur kelembagaan." />
              <InfoItem number="3" title="Pejabat" description="Masukkan nama pejabat yang menjabat sebagai pimpinan Eselon I tersebut." />
              <InfoItem number="4" title="Tugas dan Fungsi" description="Masukkan uraian lengkap mengenai tugas pokok dan fungsi dari Eselon I." />
              <InfoItem number="5" title="Keterangan" description="Tambahan informasi jika ada, misalnya status aktif/nonaktif atau catatan lain." />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <FormEselon2Page type="ADD" eselon1List={dataEselon1} ref={formRef} />
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreateEselon2Page;
