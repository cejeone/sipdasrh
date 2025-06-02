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
import FormBpthPage, { FormBpthRef } from "../components/form";
import { Provinsi, ProvinsiResponse } from "@/model/admin/struktur-wilayah/Provinsi";
import { ApiResponse } from "@/model/ApiResponse";
import { AxiosInstance } from "lib/axios";

const CreateBpthPage = () => {
  const [dataProvinsi, setDataProvinsi] = useState<Provinsi[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get<ApiResponse<ProvinsiResponse>>("/provinsi");
        const responseData = response.data;

        setDataProvinsi(responseData._embedded?.provinsiList);
        console.log(responseData);
      } catch (error: any) {
        setError(error?.message || "Gagal mendapatkan data");
        console.error("Fetch provinsi gagal:", error);
      }
    };

    fetchData();
  }, []);

  const formRef = useRef<FormBpthRef>(null);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div>
            <Breadcrumbs
              items={[{ label: "Organisasi", href: "" }, { label: "BDAS", href: "/cms/organisasi/bpth" }, { label: "Buat Data" }]}
            />
            <div className="flex items-center gap-2 text-secondary-green">
              <Building />
              <h1 className="text-2xl font-bold">BPTH</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Tambah
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk membuat data BPTH</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <ButtonSubmit onClick={() => formRef.current?.submit()} />
            <Link href="/cms/organisasi/bpth">
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
              <InfoItem number="1" title="Kode BPTH" description="Masukkan kode Balai Pengelolaan Tanaman Hutan yang sesuai." />
              <InfoItem number="2" title="Nama BPTH" description="Masukkan Nama Balai Pengelolaan Tanaman Hutan yang sesuai." />
              <InfoItem number="3" title="Provinsi" description="Pilih nama provinsi tempat BPTH berada." />
              <InfoItem number="4" title="Alamat" description="Masukkan alamat lengkap UPTD." />
              <InfoItem number="5" title="Telepon" description="Masukkan nomor telepon yang dapat dihubungi untuk keperluan administrasi." />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <FormBpthPage type="ADD" provinsiList={dataProvinsi} ref={formRef} />
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreateBpthPage;
