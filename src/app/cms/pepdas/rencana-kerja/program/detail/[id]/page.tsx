"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ClipboardList, Link2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FC, use, useEffect, useRef, useState } from "react";
import { FormProgramRef } from "../../components/form";
import { AxiosInstancePepdas } from "lib/axios";
import { Program, ProgramPagu } from "@/model/pepdas/Program";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";

type Params = {
  id: string;
};

interface DetailProgramPageProps {
  params: Promise<Params>;
}

const DetailProgramPage: FC<DetailProgramPageProps> = (props) => {
  // setupInterceptor();
  const { id } = use(props.params);

  const formRef = useRef<FormProgramRef>(null);

  const [data, setData] = useState<Program | null>(null);
  const [dataPagu, setDataPagu] = useState<ProgramPagu[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstancePepdas.get<Program>(`/programs/${id}`);
        const responseData = response.data;
        console.log(responseData);
        setData(responseData);

        const responsePagu = await AxiosInstancePepdas.get<ProgramPagu[]>(`/pagu-anggaran/program/${id}`);
        const responseDataPagu = responsePagu.data;
        console.log(responseDataPagu);
        setDataPagu(responseDataPagu);

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
            <Breadcrumbs items={[{ label: "PEPDAS", href: "" }, { label: "Program", href: "/cms/pepdas/rencana-kerja/program" }, { label: "Lihat Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <ClipboardList />
              <h1 className="text-2xl font-bold">Program</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Detail
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk melihat data program</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Link href="/cms/pepdas/rencana-kerja/program">
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
        {/* program */}
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
                      <td className="p-2 min-w-[200px] font-semibold text-base-green text-sm">Direktorat</td>
                      <td className="p-2 text-sm">{data.direktorat}</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-base-green text-sm">Kategori</td>
                      <td className="p-2 text-sm">{data.kategori}</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-base-green text-sm">Nama</td>
                      <td className="p-2 text-sm">{data.nama}</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-base-green text-sm">Tahun Rencana</td>
                      <td className="p-2 text-sm">{data.tahunRencana}</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-base-green text-sm">Total Anggaran</td>
                      <td className="p-2 text-sm">{data.totalAnggaran}</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-base-green text-sm">Status</td>
                      <td className="p-2 text-sm">{data.status}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* pagu anggaran */}
        <Card className="border border-border p-4 mb-2 bg-card">
          <CardContent className="gap-4 p-0">
            {loading ? (
              <p className="col-span-12">Memuat data...</p>
            ) : error ? (
              <p className="col-span-12 text-base-destructive">{error}</p>
            ) : dataPagu && dataPagu.length > 0 ? (
              <>
                <h5 className="text-md font-bold mb-3">Pagu Anggaran</h5>
                <hr className="mb-3" />
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>KATEGORI</TableHead>
                        <TableHead>SUMBER ANGGARAN</TableHead>
                        <TableHead>TAHUN ANGGARAN</TableHead>
                        <TableHead>PAGU</TableHead>
                        <TableHead>STATUS</TableHead>
                        <TableHead>KETERANGAN</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dataPagu.map((item: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{item.kategori}</TableCell>
                          <TableCell>{item.sumberAnggaran}</TableCell>
                          <TableCell>{item.tahunAnggaran}</TableCell>
                          <TableCell>{item.pagu}</TableCell>
                          <TableCell>
                            <Badge
                              className={cn(
                                "rounded-full px-3 py-1 text-xs font-semibold capitalize",
                                item.status === "Disetujui" && "bg-secondary-green text-white",
                                item.status === "Dalam Proses" && "bg-orange-400 text-white",
                                item.status === "Ditunda" && "bg-red-500 text-white"
                              )}>
                              {item.status}
                            </Badge>
                          </TableCell>

                          <TableCell>{item.keterangan}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Tidak ada data.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DetailProgramPage;
