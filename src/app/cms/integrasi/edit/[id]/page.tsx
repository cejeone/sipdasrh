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
import FormIntegrasiPage, { FormIntegrasiRef } from "../../components/form";
import { Integrasi } from "@/model/admin/integrasi/Integrasi";
import { AxiosInstancePepdas } from "lib/axios";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstancePepdas.get<Integrasi>(`/integrasi/${id}`);

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
            <Breadcrumbs items={[{ label: "Integrasi", href: "/cms/integrasi" }, { label: "Ubah Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <Link2 />
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
        <Card className="border border-border p-4 mb-2 bg-card">
          <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-0">
            <div className="col-span-12 lg:col-span-6 border-r space-y-4 pl-4">
              <div className="title text-base-green flex items-center gap-1">
                <IconFrame />
                <h5 className="font-bold">Informasi</h5>
              </div>
              <InfoItem number="1" title="URL" description="Alamat endpoint sistem atau layanan pihak ketiga yang akan dihubungkan." />
              <InfoItem number="2" title="API Key" description="Kunci otentikasi yang digunakan untuk mengakses API secara aman." />
              <InfoItem number="3" title="Tipe" description="Jenis koneksi atau layanan yang digunakan, seperti REST, Webhook, dll." />
              <InfoItem number="4" title="Deskripsi" description="Penjelasan singkat mengenai tujuan atau fungsi dari konfigurasi ini."/>
              <InfoItem number="5" title="Status" description="Menentukan status konfigurasi, misalnya Aktif atau Nonaktif." />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <FormIntegrasiPage type="EDIT" ref={formRef} defaultValues={data} />
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EditIntegrasiPage;
