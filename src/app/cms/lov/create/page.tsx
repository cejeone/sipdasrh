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
import { useRef } from "react";
import FormLovPage, { FormLovRef } from "../components/form";

const CreateLovPage = () => {
  const formRef = useRef<FormLovRef>(null);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div>
            <Breadcrumbs items={[{ label: "Lov", href: "/cms/lov" }, { label: "Buat Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <Link2 />
              <h1 className="text-2xl font-bold">Lov</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Tambah
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk membuat data lov</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <ButtonSubmit onClick={() => formRef.current?.submit()} />
            <Link href="/cms/lov">
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
              <InfoItem number="1" title="Nama Kategori" description="Nama daftar LOV yang akan digunakan sebagai referensi di form lain." />
              <InfoItem number="2" title="Nilai" description="Nilai teknis yang akan disimpan di database (biasanya dikirim ke backend)." />
              <InfoItem number="3" title="Kelas" description="Pengelompokan LOV berdasarkan tipe/kategori sistem (bisa digunakan untuk filtering)." />
              <InfoItem number="4" title="Deskripsi" description="Penjelasan tambahan tentang penggunaan nilai dalam konteks bisnis/proses."/>
              <InfoItem number="5" title="Status" description="Menentukan apakah item LOV ditampilkan di form (Aktif) atau disembunyikan (Nonaktif)." />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <FormLovPage type="ADD" ref={formRef} />
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreateLovPage;
