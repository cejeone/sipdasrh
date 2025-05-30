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
import FormMonevPage, { FormMonevRef } from "../components/form";

const CreateMonevPage = () => {
  const formRef = useRef<FormMonevRef>(null);
  const formRef2 = useRef<FormMonevRef>(null);
  const formRef3 = useRef<FormMonevRef>(null);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div>
            <Breadcrumbs items={[{ label: "PEPDAS", href: "" }, { label: "Monev", href: "/cms/rh/monev" }, { label: "Buat Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <Link2 />
              <h1 className="text-2xl font-bold">Monitoring & Evaluasi Program</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Tambah
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk membuat data monev pusat</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <ButtonSubmit onClick={() => {
              formRef.current?.submit();
              formRef2.current?.submit();
              formRef3.current?.submit();
            }} />
              
            <Link href="/cms/rh/monev">
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
                <h5 className="font-bold">Informasi Umum</h5>
              </div>
              <InfoItem number="1" title="ID" description="Terisi oleh sistem sebagai identifikasi unik untuk setiap kegiatan." />
              <InfoItem number="2" title="Program" description="Pilih program yang dijalankan." />
              <InfoItem number="3" title="BPDAS" description="Pilih Balai Pengelolaan Daerah Aliran Sungai (BPDAS) yang menaungi wilayah kegiatan dari daftar yang tersedia." />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <FormMonevPage type="ADD" ref={formRef} />
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border p-4 mb-2 bg-card">
          <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-0">
            <div className="col-span-12 lg:col-span-6 border-r space-y-4 pl-4">
              <div className="title text-base-green flex items-center gap-1">
                <IconFrame />
                <h5 className="font-bold">Target Kegiatan</h5>
              </div>
              <InfoItem number="1" title="Luas Total" description="Masukkan jumlah capaian yang direncanakan sejak awal." />
              <InfoItem number="2" title="T-1" description="Masukkan target dan realiasasi luas kegiatan pada tahap perencanaan (T-1)." />
              <InfoItem number="3" title="P-0" description="Masukkan target dan realiasasi luas kegiatan pada tahap penanaman (P-0)." />
              <InfoItem number="4" title="P-1" description="Masukkan target dan realiasasi luas kegiatan pada tahap pemeliharaan pertama (P-1)." />
              <InfoItem number="5" title="P-2" description="Masukkan target dan realiasasi luas kegiatan pada tahap pemeliharaan kedua (P-2)." />
              <InfoItem number="6" title="BAST" description="Masukkan target dan realiasasi luas kegiatan pada tahap serah terima." />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <FormMonevPage type="ADD" ref={formRef2} />
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border p-4 mb-2 bg-card">
          <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-0">
            <div className="col-span-12 lg:col-span-6 border-r space-y-4 pl-4">
              <div className="title text-base-green flex items-center gap-1">
                <IconFrame />
                <h5 className="font-bold">Keterangan</h5>
              </div>
              <InfoItem number="1" title="Keterangan" description="Catatan tambahan atau penjelasan kegiatan." />
            </div>

            <div className="col-span-12 lg:col-span-6">
              <Card>
                <FormMonevPage type="ADD" ref={formRef3} />
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreateMonevPage;
