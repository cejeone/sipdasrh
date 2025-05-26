"use client";

import { use, FC, useEffect, useRef, useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import ButtonSubmit from "@/components/ButtonSubmit";
import InfoItem from "@/components/InfoItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dokumen } from "@/model/pepdas/Dokumen";
import { IconCircleX, IconFrame } from "@tabler/icons-react";
import { AxiosInstancePepdas, setupInterceptor } from "lib/axios";
import { FileText } from "lucide-react";
import Link from "next/link";
import FormDokumenPage, { FormDokumenRef } from "../../components/form";
import { Badge } from "@/components/ui/badge";

type Params = {
  id: string;
};

interface EditDokumenPageProps {
  params: Promise<Params>;
}

const EditDokumenPage: FC<EditDokumenPageProps> = (props) => {
  // setupInterceptor();
  const { id } = use(props.params);

  const formRef = useRef<FormDokumenRef>(null);

  const [data, setData] = useState<Dokumen | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstancePepdas.get<Dokumen>(`/dokumen/${id}`);

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
            <Breadcrumbs items={[{ label: "PEPDAS", href: "" }, { label: "Dokumen", href: "/cms/pepdas/dokumen" }, { label: "Ubah Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <FileText />
              <h1 className="text-2xl font-bold">Dokumen</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Perbaharui
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk mengubah data dokumen</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <ButtonSubmit onClick={() => formRef.current?.submit()} />
            <Link href="/cms/pepdas/dokumen">
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
              <InfoItem number="1" title="Tipe" description="Pilih jenis file yang diunggah." />
              <InfoItem number="2" title="Nama Dokumen" description="Masukkan judul atau nama lengkap dokumen sesuai isi atau fungsinya." />
              <InfoItem number="3" title="Unggah Dokumen" description="Unggah file dokumen yang dimaksud. Pastikan format file sesuai dengan tipe dokumen yang dipilih." />
              <InfoItem
                number="4"
                title="Ukuran Dokumen"
                description="Ukuran file akan ditampilkan otomatis setelah pengguna mengunggah dokumen. Ukuran ini dalam satuan MB dan akan muncul setelah dokumen diunggah"
              />
              <InfoItem number="5" title="Status" description="Pilih status untuk menentukan apakah dokumen dipublikasikan ke publik." />
              <InfoItem number="6" title="Keterangan" description="Masukkan keterangan yang berkaitan dengan dokumen yang diunggah." />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <FormDokumenPage type="EDIT" ref={formRef} defaultValues={data} />
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EditDokumenPage;
