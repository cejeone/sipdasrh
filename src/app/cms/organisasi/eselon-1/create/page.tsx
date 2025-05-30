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
import FormEselon1Page, { FormEselon1Ref } from "../components/form";

const CreateEselon1Page = () => {
  const formRef = useRef<FormEselon1Ref>(null);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div>
            <Breadcrumbs items={[
              { label: "Master Data", href: "" },
              { label: "Organisasi", href: "" }, 
              { label: "Eselon I", href: "/cms/organisasi/eselon-1" }, 
              { label: "Buat Data" }
            ]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <Link2 />
              <h1 className="text-2xl font-bold">Eselon I</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Tambah
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk membuat data eselon I</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <ButtonSubmit onClick={() => formRef.current?.submit()} />
            <Link href="/cms/organisasi/eselon-1">
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
              <InfoItem number="1" title="ID" description="ID unik yang dibuat otomatis oleh sistem untuk mengidentifikasi Eselon I." />
              <InfoItem number="2" title="Nama" description="Masukkan nama resmi unit organisasi Eselon I sesuai struktur kelembagaan." />
              <InfoItem number="3" title="Pejabat" description="Masukkan nama pejabat yang menjabat sebagai pimpinan Eselon I tersebut." />
              <InfoItem number="4" title="Tugas dan Fungsi" description="Masukkan uraian lengkap mengenai tugas pokok dan fungsi dari Eselon I."/>
              <InfoItem number="5" title="Keterangan" description="Tambahan informasi jika ada, misalnya status aktif/nonaktif atau catatan lain."/>
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <FormEselon1Page type="ADD" ref={formRef} />
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreateEselon1Page;
