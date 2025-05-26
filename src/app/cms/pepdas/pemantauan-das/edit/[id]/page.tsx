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
import FormPemantauanDASPage, { FormPemantauanDASRef } from "../../components/form";
import { PemantauanDAS } from "@/model/pepdas/PemantauanDAS";
import { AxiosInstancePepdas } from "lib/axios";

type Params = {
  id: string;
};

interface EditPemantauanDASPageProps {
  params: Promise<Params>;
}

const EditPemantauanDASPage: FC<EditPemantauanDASPageProps> = (props) => {
  // setupInterceptor();
  const { id } = use(props.params);

  const formRef = useRef<FormPemantauanDASRef>(null);

  const [data, setData] = useState<PemantauanDAS | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstancePepdas.get<PemantauanDAS>(`/pemantauan-das/${id}`);

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
            <Breadcrumbs items={[{ label: "PEPDAS", href: "" }, { label: "PemantauanDAS", href: "/cms/pepdas/pemantauan-das" }, { label: "Ubah Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <Link2 />
              <h1 className="text-2xl font-bold">Pemantauan DAS</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Perbaharui
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk mengubah data pemantauan das</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <ButtonSubmit onClick={() => formRef.current?.submit()} />
            <Link href="/cms/pepdas/pemantauan-das">
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
                <InfoItem number="1" title="BPDAS" description="Pilih nama Balai Pengelolaan Daerah Aliran Sungai." />
                <InfoItem number="2" title="DAS" description="Pilih nama Daerah Aliran Sungai." />
                <InfoItem number="3" title="SPAS Id" description="Pilih ID SPAS (Sistem Pemantauan Air dan Sumberdaya) yang tersedia dalam daftar sistem terdaftar." />
                <InfoItem number="4" title="Tanggal & Waktu" description="Masukkan tanggal dan waktu pencatatan data log secara tepat."
                />
                <InfoItem number="5" title="Nilai TMA" description="Masukkan nilai Tinggi Muka Air (TMA) dalam satuan meter (m), hasil dari pengukuran sensor."
                />
                <InfoItem number="6" title="Nilai Curah Hujan" description="Masukkan nilai curah hujan yang tercatat saat itu, dalam satuan milimeter (mm)." />

                <InfoItem number="7" title="Tegangan Baterai" description="Tentukan status layanan: Aktif (jika layanan tersedia dan dapat digunakan) atau Nonaktif (jika layanan belum aktif atau sedang dalam pemeliharaan)."
                />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <FormPemantauanDASPage type="EDIT" ref={formRef} defaultValues={data} />
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EditPemantauanDASPage;
