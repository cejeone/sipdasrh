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
import FormEselon3Page, { FormEselon3Ref } from "../../components/form";
import { Eselon3 } from "@/model/admin/organisasi/Eselon3";
import { AxiosInstance } from "lib/axios";
import { Eselon2, Eselon2Response } from "@/model/admin/organisasi/Eselon2";
import { ApiResponse } from "@/model/ApiResponse";

type Params = {
  id: number;
};

interface EditEselon3PageProps {
  params: Promise<Params>;
}

const EditEselon2Page: FC<EditEselon3PageProps> = (props) => {
  // setupInterceptor();
  const { id } = use(props.params);

  const formRef = useRef<FormEselon3Ref>(null);

  const [data, setData] = useState<Eselon3 | null>(null);
  const [dataEselon2, setDataEselon2] = useState<Eselon2[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get<Eselon3>(`/eselon3/${id}`);
        const responseData = response.data;
        console.log(responseData);
        setData(responseData);

        const responseEselon2 = await AxiosInstance.get<ApiResponse<Eselon2Response>>("/eselon2");
        const responseEselon2Data = responseEselon2.data;
        setDataEselon2(responseEselon2Data._embedded?.eselon2List);

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
            <Breadcrumbs
              items={[{ label: "Masterdata", href: "" }, { label: "Organisasi", href: "" }, { label: "Eselon III", href: "/cms/organisasi/eselon-3" }, { label: "Ubah Data" }]}
            />
            <div className="flex items-center gap-2 text-secondary-green">
              <Building />
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
              <InfoItem number="1" title="Eselon II" description="Pilih organisasi Eselon II sesuai struktur kelembagaan." />
              <InfoItem number="2" title="Nama" description="Masukkan nama resmi unit organisasi Eselon I sesuai struktur kelembagaan." />
              <InfoItem number="3" title="Pejabat" description="Masukkan nama pejabat yang menjabat sebagai pimpinan Eselon I tersebut." />
              <InfoItem number="4" title="Tugas dan Fungsi" description="Masukkan uraian lengkap mengenai tugas pokok dan fungsi dari Eselon I." />
              <InfoItem number="5" title="Keterangan" description="Tambahan informasi jika ada, misalnya status aktif/nonaktif atau catatan lain." />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <FormEselon3Page type="EDIT" eselon2List={dataEselon2} ref={formRef} defaultValues={data} />
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EditEselon2Page;
