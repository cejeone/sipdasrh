"use client";

import { IconCircleX, IconFrame } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { List } from "lucide-react";
import InfoItem from "@/components/InfoItem";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import ButtonSubmit from "@/components/ButtonSubmit";
import { FC, use, useEffect, useRef, useState } from "react";
import FormPeranPage, { FormPeranRef } from "../../components/form";
import { AxiosInstance } from "lib/axios";
import { Peran } from "@/model/admin/manajemen-pengguna/Peran";

type Params = {
  id: string;
};

interface EditPeranPageProps {
  params: Promise<Params>;
}

const EditPeranPage: FC<EditPeranPageProps> = (props) => {
  // setupInterceptor();
  const { id } = use(props.params);

  const formRef = useRef<FormPeranRef>(null);

  const [data, setData] = useState<Peran | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get<Peran>(`/peran/${id}`);

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
            <Breadcrumbs items={[{ label: "Peran", href: "/cms/peran" }, { label: "Ubah Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <List />
              <h1 className="text-2xl font-bold">Peran</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Perbaharui
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk mengubah data list of value</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <ButtonSubmit onClick={() => formRef.current?.submit()} />
            <Link href="/cms/peran">
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
              <InfoItem number="1" title="Nama" description="Nama peran atau jabatan yang diberikan kepada pengguna." />
              <InfoItem number="2" title="Deskripsi" description="Penjelasan singkat mengenai tugas dan tanggung jawab yang terkait dengan peran ini." />
              <InfoItem number="5" title="Status" description="Status aktif atau non-aktif dari peran tersebut." />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <FormPeranPage type="EDIT" ref={formRef} defaultValues={data} />
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EditPeranPage;
