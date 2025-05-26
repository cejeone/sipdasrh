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
import FormPemantauanDASPage, { FormPemantauanDASRef } from "../components/form";

const CreatePemantauanDASPage = () => {
  const formRef = useRef<FormPemantauanDASRef>(null);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div>
            <Breadcrumbs items={[{ label: "PEPDAS", href: "" }, { label: "PemantauanDAS", href: "/cms/pepdas/pemantauan-das" }, { label: "Buat Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <Link2 />
              <h1 className="text-2xl font-bold">PemantauanDAS</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Tambah
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk membuat data pemantauan das</p>
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
                <FormPemantauanDASPage type="ADD" ref={formRef} />
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreatePemantauanDASPage;
