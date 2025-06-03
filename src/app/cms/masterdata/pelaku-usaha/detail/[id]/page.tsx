"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, UserSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FC, use, useEffect, useRef, useState } from "react";
import { FormPelakuUsahaRef } from "../../components/form";
import { PelakuUsaha } from "@/model/admin/masterdata/PelakuUsaha";
import { AxiosInstance } from "lib/axios";

type Params = {
  id: string;
};

interface DetailPelakuUsahaPageProps {
  params: Promise<Params>;
}

const DetailPelakuUsahaPage: FC<DetailPelakuUsahaPageProps> = (props) => {
  // setupInterceptor();
  const { id } = use(props.params);

  const formRef = useRef<FormPelakuUsahaRef>(null);

  const [data, setData] = useState<PelakuUsaha | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get<PelakuUsaha>(`/pelaku-usaha/${id}`);

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
            <Breadcrumbs items={[{ label: "Masterdata", href: "" }, { label: "Pelaku Usaha", href: "/cms/masterdata/pelaku-usaha" }, { label: "Lihat Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <UserSquare />
              <h1 className="text-2xl font-bold">Pelaku Usaha</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Detail
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk melihat data pelaku usaha</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Link href="/cms/masterdata/pelaku-usaha">
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
                      <td className="min-w-[300px] p-2 font-semibold text-base-green text-sm">Kategori Pelaku Usaha</td>
                      <td className="p-2 text-sm">{data.kategoriPelakuUsaha?.nilai}</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-base-green text-sm">Nama Badan Usaha</td>
                      <td className="p-2 text-sm">{data.namaBadanUsaha}</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-base-green text-sm">Nomor Induk Berusaha (NIB)</td>
                      <td className="p-2 text-sm">{data.nomorIndukBerusahaNib}</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-base-green text-sm">Ruang Lingkup Usaha</td>
                      <td className="p-2 text-sm">{data.ruangLingkupUsaha}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card className="border border-border p-4 mb-2 bg-card">
          <CardContent className=" gap-4 p-0">
            {loading ? (
              <p className="col-span-12">Memuat data...</p>
            ) : error ? (
              <p className="col-span-12 text-base-destructive">{error}</p>
            ) : data ? (
              <div className="informasi">
                <h5 className="text-md font-bold mb-3">Kontak</h5>
                <hr className="mb-3" />

                <table className="text-left">
                  <tbody>
                    <tr>
                      <td className="min-w-[300px] p-2 font-semibold text-base-green text-sm">Nama Direktur</td>
                      <td className="p-2 text-sm">{data.namaDirektur}</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-base-green text-sm">Nomor HP</td>
                      <td className="p-2 text-sm">{data.nomorHpDirektur}</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-base-green text-sm">Alamat</td>
                      <td className="p-2 text-sm">{data.alamat}</td>
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

export default DetailPelakuUsahaPage;
