"use client";

import { IconCircleX, IconFrame } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, List } from "lucide-react";
import InfoItem from "@/components/InfoItem";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import ButtonSubmit from "@/components/ButtonSubmit";
import FormDokumenPage, { FormDokumenRef } from "../components/form";
import { useRef } from "react";

const CreateDokumenPage = () => {
  const formRef = useRef<FormDokumenRef>(null);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div>
            <Breadcrumbs items={[{ label: "RH", href: "" }, { label: "Dokumen", href: "/cms/rh/dokumen" }, { label: "Buat Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <FileText />
              <h1 className="text-2xl font-bold">Dokumen</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Tambah
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk membuat data dokumen</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <ButtonSubmit onClick={() => formRef.current?.submit()} />
            <Link href="/cms/rh/dokumen">
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
              <InfoItem number="3" title="Unggah Dokumen" description="TUnggah file dokumen yang dimaksud. Pastikan format file sesuai dengan tipe dokumen yang dipilih." />
              <InfoItem
                number="4"
                title="Ukuran Dokumen"
                description="Ukuran file akan ditampilkan otomatis setelah pengguna mengunggah dokumen. Ukuran ini dalam satuan MB dan akan muncul setelah dokumen diunggah"
              />
              <InfoItem number="5" title="Status" description="Pilih status untuk menentukan apakah dokumen dipublikasikan ke publik." />
              <InfoItem number="6" title="Keterangan" description="Masukkan keterangan yang berkaitan dengan dokumen yang di unggah." />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <FormDokumenPage type="ADD" ref={formRef} />
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreateDokumenPage;
