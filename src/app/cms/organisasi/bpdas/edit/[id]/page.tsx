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
import { FC, use, useEffect, useRef, useState } from "react";
import FormBpdasPage, { FormBpdasRef } from "../../components/form";
import { Bpdas } from "@/model/admin/organisasi/Bpdas";
import { AxiosInstance } from "lib/axios";
import { Provinsi, ProvinsiResponse } from "@/model/admin/struktur-wilayah/Provinsi";
import { ApiResponse } from "@/model/ApiResponse";

type Params = {
  id: number;
};

interface EditBpdasPageProps {
  params: Promise<Params>;
}

const EditBpdasPage: FC<EditBpdasPageProps> = (props) => {
  // setupInterceptor();
  const { id } = use(props.params);

  const formRef = useRef<FormBpdasRef>(null);

  const [data, setData] = useState<Bpdas | null>(null);
  const [dataProvinsi, setDataProvinsi] = useState<Provinsi[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get<Bpdas>(`/bpdas/${id}`);
        const responseData = response.data;
        console.log(responseData);
        setData(responseData);

        const responseProvinsi = await AxiosInstance.get<ApiResponse<ProvinsiResponse>>("/provinsi");
        const responseProvinsiData = responseProvinsi.data;
        setDataProvinsi(responseProvinsiData._embedded?.provinsiList);

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
              items={[{ label: "Organisasi", href: "" }, { label: "BPDAS", href: "/cms/organisasi/bpdas" }, { label: "Ubah Data" }]}
            />
            <div className="flex items-center gap-2 text-secondary-green">
              <Building />
              <h1 className="text-2xl font-bold">BPDAS</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Perbaharui
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk mengubah data BPDAS</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <ButtonSubmit onClick={() => formRef.current?.submit()} />
            <Link href="/cms/organisasi/bpdas">
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
              <InfoItem number="1" title="Kode BPDAS" description="Masukkan kode Balai Pengelolaan Daerah Aliran Sungai dan Hutan Lindung (BPDAS) yang sesuai." />
              <InfoItem number="2" title="Nama BPDAS" description="Masukkan Nama Balai Pengelolaan Daerah Aliran Sungai dan Hutan Lindung (BPDAS) yang sesuai." />
              <InfoItem number="3" title="Provinsi" description="Pilih nama provinsi tempat BPDAS berada." />
              <InfoItem number="4" title="Alamat" description="Masukkan alamat lengkap UPTD." />
              <InfoItem number="5" title="Telepon" description="Masukkan nomor telepon yang dapat dihubungi untuk keperluan administrasi." />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <FormBpdasPage type="EDIT" provinsiList={dataProvinsi} ref={formRef} defaultValues={data} />
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EditBpdasPage;
