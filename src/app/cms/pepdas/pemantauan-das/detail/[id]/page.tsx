"use client";

import { IconCircleX, IconFrame } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Link2 } from "lucide-react";
import InfoItem from "@/components/InfoItem";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import ButtonSubmit from "@/components/ButtonSubmit";
import { FC, use, useEffect, useRef, useState } from "react";
import FormPemantauanDASPage, { FormPemantauanDASRef } from "../../components/form";
import { PemantauanDAS } from "@/model/pepdas/PemantauanDAS";
import { AxiosInstancePepdas } from "lib/axios";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Params = {
  id: string;
};

interface DetailPemantauanDASPageProps {
  params: Promise<Params>;
}

const DetailPemantauanDASPage: FC<DetailPemantauanDASPageProps> = (props) => {
  // setupInterceptor();
  const { id } = use(props.params);

  const formRef = useRef<FormPemantauanDASRef>(null);

  const [data, setData] = useState<PemantauanDAS | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstancePepdas.get<PemantauanDAS>(`/pemantauan-das/${id}`);

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
            <Breadcrumbs items={[{ label: "PEPDAS", href: "" }, { label: "PemantauanDAS", href: "/cms/pepdas/pemantauan-das" }, { label: "Lihat Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <Link2 />
              <h1 className="text-2xl font-bold">PemantauanDAS</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Detail
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk melihat data pemantauan das</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Link href="/cms/pepdas/pemantauan-das">
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
        <Card className="border border-border p-4 mb-2 bg-card">
          <CardContent className=" gap-4 p-0">
            {loading ? (
              <p className="col-span-12">Memuat data...</p>
            ) : error ? (
              <p className="col-span-12 text-base-destructive">{error}</p>
            ) : data ? (
              <div className="informasi">
                <h5 className="text-md font-bold mb-3">Informasi</h5>
                <hr className="mb-3" />

                <table className="text-left">
                  <tbody>
                    <tr>
                      <td className="p-2 min-w-[200px] font-semibold text-base-green text-sm">BPDAS</td>
                      <td className="p-2 text-sm">{data.bpdas}</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-base-green text-sm">DAS</td>
                      <td className="p-2 text-sm">{data.das}</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-base-green text-sm">SPAS ID</td>
                      <td className="p-2 text-sm">{data.spasId}</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-base-green text-sm">Tanggal & Waktu</td>
                      <td className="p-2 text-sm">{data.tanggalWaktu}</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-base-green text-sm">Nilai Tinggi Muka Air (mm)</td>
                      <td className="p-2 text-sm">{data.nilaiTma}</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-base-green text-sm">Nilai Curah Hujan</td>
                      <td className="p-2 text-sm">{data.nilaiCurahHujan}</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-base-green text-sm">Tegangan Baterai</td>
                      <td className="p-2 text-sm">{data.teganganBaterai}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DetailPemantauanDASPage;
