"use client";

import { use, FC, useEffect, useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dokumen } from "@/model/pepdas/Dokumen";
import { AxiosInstancePepdas, setupInterceptor } from "lib/axios";
import { Calendar, ChevronLeft, FileText, Tag } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { downloadDokumenFile } from "../../lib/action";
import dayjs from "dayjs";
import "dayjs/locale/id";

type Params = {
  id: string;
};

interface DetailDokumenPageProps {
  params: Promise<Params>;
}

const DetailDokumenPage: FC<DetailDokumenPageProps> = (props) => {
  // setupInterceptor();
  const { id } = use(props.params);

  const [data, setData] = useState<Dokumen | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstancePepdas.get<Dokumen>(`/dokumen/${id}`);

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
            <Breadcrumbs items={[{ label: "PEPDAS", href: "" }, { label: "Dokumen", href: "/cms/pepdas/dokumen" }, { label: "Lihat Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <FileText />
              <h1 className="text-2xl font-bold">Dokumen</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Detail
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk melihat data dokumen</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Link href="/cms/pepdas/dokumen">
              <Button variant="outline">
                <ChevronLeft /> Kembali
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <hr className="mb-2" />

      {/* Form Section */}
      <main className="overflow-auto h-full">
        <Card className="border border-border p-4 mb-2 bg-card dark:bg-accent">
          <CardContent className="w-f gap-4 p-0">
            {loading ? (
              <p className="col-span-12">Memuat data...</p>
            ) : error ? (
              <p className="col-span-12 text-base-destructive">{error}</p>
            ) : data ? (
              <>
                <div className="content">
                  <h1 className="text-2xl font-bold text-center mb-5">{data.namaDokumen}</h1>

                  <div className="info flex gap-5 text-base-gray my-5">
                    <div className="tanggal flex gap-2 items-center">
                      <Calendar size={15} />
                      {dayjs(data?.uploadedAt).locale("id").format("D MMMM YYYY, HH:mm")}
                    </div>
                    <div className="tipe flex gap-2 items-center">
                      <Tag size={15} />
                      {data.tipe}
                    </div>
                  </div>
                  <div className="keterangan mb-3">
                    <p>{data.keterangan}</p>
                  </div>

                  <div className="viewer">
                    <iframe src=""></iframe>
                  </div>

                  <div className="col-span-12">
                    <h4 className="">Daftar Dokumen yang diuggah:</h4>
                    {data.files.length === 0 ? (
                      <p>Tidak ada dokumen.</p>
                    ) : (
                      <ul className="list-disc list-inside">
                        {data.files.map((file) => (
                          <li key={file.id}>
                            <div className="flex justify-between items-center">
                              <span>
                                {file.namaAsli} ({file.ukuranMb} MB)
                              </span>
                              <Button onClick={() => downloadDokumenFile(data.id, file.id)}>Download</Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </>
            ) : null}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DetailDokumenPage;
