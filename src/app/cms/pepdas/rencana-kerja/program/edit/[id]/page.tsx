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
import FormGeoservicePage, { FormProgramRef } from "../../components/form";
import { AxiosInstancePepdas } from "lib/axios";
import { Program } from "@/model/pepdas/Program";

type Params = {
  id: string;
};

interface EditProgramPageProps {
  params: Promise<Params>;
}

const EditProgramPage: FC<EditProgramPageProps> = (props) => {
  // setupInterceptor();
  const { id } = use(props.params);

  const formRef = useRef<FormProgramRef>(null);

  const [data, setData] = useState<Program | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstancePepdas.get<Program>(`/programs/${id}`);

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
            <Breadcrumbs items={[{ label: "PEPDAS", href: "" }, { label: "Program", href: "/cms/pepdas/rencana-kerja/program" }, { label: "Ubah Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <Link2 />
              <h1 className="text-2xl font-bold">Program</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Perbaharui
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk mengubah data program</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <ButtonSubmit onClick={() => formRef.current?.submit()} />
            <Link href="/cms/pepdas/rencana-kerja/program">
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

              <InfoItem number="1" title="Direktorat" description="Pilih Direktorat." />
              <InfoItem number="2" title="Kategori" description="Pilih jenis program yang akan dijalankan." />
              <InfoItem number="3" title="Nama" description="Tulis nama program sesuai dokumen rencana kerja atau surat tugas." />
              <InfoItem number="4" title="Tahun Rencana" description="Masukkan tahun kapan program akan dilaksanakan. Ditulis dalam format tahun (YYYY)." />
              <InfoItem number="5" title="Total Anggaran" description="Pilih atau isi sumber dana yang digunakan untuk program." />
              <InfoItem number="6" title="Status" description="Status dari program (aktif, selesai, atau tertunda)." />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <FormGeoservicePage type="EDIT" ref={formRef} defaultValues={data} />
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EditProgramPage;
