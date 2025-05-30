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
import FormEselon3Page, { FormEselon3Ref } from "../../components/form";
import { Eselon3 } from "@/model/organisasi/Eselon3";
import { AxiosInstancePepdas } from "lib/axios";

type Params = {
  id: string;
};

interface EditEselon3PageProps {
  params: Promise<Params>;
}

const EditEselon3Page: FC<EditEselon3PageProps> = (props) => {
  // setupInterceptor();
  const { id } = use(props.params);

  const formRef = useRef<FormEselon3Ref>(null);

  const [data, setData] = useState<Eselon3 | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstancePepdas.get<Eselon3>(`/eselon-3/${id}`);

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
            <Breadcrumbs items={[
              { label: "Masterdata", href: "" }, 
              { label: "Organisasi", href: "" }, 
              { label: "Eselon3", href: "/cms/organisasi/eselon-3" }, 
              { label: "Ubah Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <Link2 />
              <h1 className="text-2xl font-bold">Eselon III</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Perbaharui
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk mengubah data eselon III</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <ButtonSubmit onClick={() => formRef.current?.submit()} />
            <Link href="/cms/organisasi/eselon-3">
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
                <InfoItem number="1" title="ID" description="ID unik yang dibuat otomatis oleh sistem untuk mengidentifikasi Eselon II." />
                  <InfoItem number="2" title="Eselon II" description="Pilih organisasi Eselon II sesuai struktur kelembagaan." />
                  <InfoItem number="3" title="Nama" description="Masukkan nama resmi unit organisasi Eselon II sesuai struktur kelembagaan." />
                  <InfoItem number="4" title="Pejabat" description="Masukkan nama pejabat yang menjabat sebagai pimpinan Eselon II tersebut." />
                  <InfoItem number="5" title="Tugas dan Fungsi" description="Masukkan uraian lengkap mengenai tugas pokok dan fungsi dari Eselon II."/>
                  <InfoItem number="6" title="Keterangan" description="Tambahan informasi jika ada, misalnya status aktif/nonaktif atau catatan lain."/>
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <FormEselon3Page type="EDIT" ref={formRef} defaultValues={data} />
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EditEselon3Page;
