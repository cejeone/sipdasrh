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
import FormKonfigurasiSistemPage, { FormKonfigurasiSistemRef } from "../../components/form";
import { KonfigurasiSistem } from "@/model/admin/konfigurasi-sistem/KonfigurasiSistem";
import { AxiosInstance } from "lib/axios";
import { Lov, LovResponse } from "@/model/admin/lov/Lov";
import { ApiResponse } from "@/model/ApiResponse";

type Params = {
  id: string;
};

interface EditKonfigurasiSistemPageProps {
  params: Promise<Params>;
}

const EditKonfigurasiSistemPage: FC<EditKonfigurasiSistemPageProps> = (props) => {
  // setupInterceptor();
  const { id } = use(props.params);
  
    const formRef = useRef<FormKonfigurasiSistemRef>(null);
  
    const [data, setData] = useState<KonfigurasiSistem | null>(null);
    const [dataLov, setDataLov] = useState<Lov[]>([]);
  
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await AxiosInstance.get<KonfigurasiSistem>(`/konfigurasi-sistem/${id}`);
          const responseData = response.data;
          console.log(responseData);
          setData(responseData);
  
          const responseLov = await AxiosInstance.get<ApiResponse<LovResponse>>("/provinsi");
          const responseLovData = responseLov.data;
          setDataLov(responseLovData._embedded?.lovList);
  
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
            <Breadcrumbs items={[{ label: "Konfigurasi Sistem", href: "/cms/konfigurasi-sistem" }, { label: "Ubah Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <Link2 />
              <h1 className="text-2xl font-bold">Konfigurasi Sistem</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Perbaharui
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk mengubah data konfigurasi sistem</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <ButtonSubmit onClick={() => formRef.current?.submit()} />
            <Link href="/cms/konfigurasi-sistem">
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
              <InfoItem number="1" title="Tipe" description="Pilih jenis konfigurasi atau kategori pengaturan yang digunakan dalam sistem. Ini digunakan untuk mengelompokkan konfigurasi tertentu." />
              <InfoItem number="2" title="Key" description="Masukkan kode unik sebagai identifikasi dari konfigurasi. Kode ini digunakan oleh sistem untuk memanggil atau mengatur nilai." />
              <InfoItem number="3" title="Value" description="Masukkan nilai aktual dari konfigurasi sesuai dengan tipe dan kode yang ditentukan." />
              <InfoItem number="4" title="Deskripsi" description="Masukkan penjelasan singkat mengenai fungsi dari konfigurasi ini, agar mudah dipahami oleh admin atau pengembang sistem."/>
              <InfoItem number="5" title="Status" description="Pilih salah satu status terkait data ini." />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <FormKonfigurasiSistemPage type="EDIT" lovList={dataLov} ref={formRef} defaultValues={data} />
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EditKonfigurasiSistemPage;
