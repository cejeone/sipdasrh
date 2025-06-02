"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, List } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FC, use, useEffect, useRef, useState } from "react";
import { FormKelurahanRef } from "../../components/form";
import { AxiosInstance } from "lib/axios";
import { KelurahanDesa } from "@/model/admin/struktur-wilayah/KelurahanDesa";

type Params = {
  id: number;
};

interface DetailKelurahanPageProps {
  params: Promise<Params>;
}

const DetailKelurahanPage: FC<DetailKelurahanPageProps> = (props) => {
  // setupInterceptor();
  const { id } = use(props.params);

  const formRef = useRef<FormKelurahanRef>(null);

  const [data, setData] = useState<KelurahanDesa | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get<KelurahanDesa>(`/kelurahan-desa/${id}`);

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
            <Breadcrumbs
              items={[
                { label: "Masterdata", href: "" },
                { label: "Struktur Wilayah", href: "" },
                { label: "Kelurahan", href: "/cms/masterdata/struktur-wilayah/kelurahan" },
                { label: "Lihat Data" },
              ]}
            />
            <div className="flex items-center gap-2 text-secondary-green">
              <List />
              <h1 className="text-2xl font-bold">Kelurahan / Desa</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Detail
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk melihat data kelurahan / desa</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Link href="/cms/masterdata/struktur-wilayah/kelurahan">
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
                      <td className="p-2 min-w-[200px] font-semibold text-base-green text-sm">Kabupaten / Kota</td>
                      <td className="p-2 text-sm">{data.kecamatan?.kecamatan}</td>
                    </tr>
                    <tr>
                      <td className="p-2 min-w-[200px] font-semibold text-base-green text-sm">Nama Kecamatan</td>
                      <td className="p-2 text-sm">{data.kelurahan}</td>
                    </tr>
                    {/* <tr>
                      <td className="p-2 font-semibold text-base-green text-sm">Kode DEPDAGRI</td>
                      <td className="p-2 text-sm">{data.kodeDepdagri}</td>
                    </tr> */}
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

export default DetailKelurahanPage;
