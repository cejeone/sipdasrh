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
import FormKonfigurasiSistemPage, { FormKonfigurasiSistemRef } from "../components/form";

const CreateKonfigurasiSistemPage = () => {
  const formRef = useRef<FormKonfigurasiSistemRef>(null);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div>
            <Breadcrumbs items={[{ label: "Konfigurasi Sistem", href: "/cms/konfigurasi-sistem" }, { label: "Buat Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <Link2 />
              <h1 className="text-2xl font-bold">Konfigurasi Sistem</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Tambah
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk membuat data konfigurasi sistem</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <ButtonSubmit onClick={() => formRef.current?.submit()} />
            <Link href="/cms/konfigurasi-sistem">
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
              <InfoItem number="1" title="Tipe" description="Pilih jenis konfigurasi atau kategori pengaturan yang digunakan dalam sistem. Ini digunakan untuk mengelompokkan konfigurasi tertentu." />
              <InfoItem number="2" title="Key" description="Masukkan kode unik sebagai identifikasi dari konfigurasi. Kode ini digunakan oleh sistem untuk memanggil atau mengatur nilai." />
              <InfoItem number="3" title="Value" description="Masukkan nilai aktual dari konfigurasi sesuai dengan tipe dan kode yang ditentukan." />
              <InfoItem number="4" title="Deskripsi" description="Masukkan penjelasan singkat mengenai fungsi dari konfigurasi ini, agar mudah dipahami oleh admin atau pengembang sistem."/>
              <InfoItem number="5" title="Status" description="Pilih salah satu status terkait data ini." />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <FormKonfigurasiSistemPage type="ADD" ref={formRef} />
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreateKonfigurasiSistemPage;
