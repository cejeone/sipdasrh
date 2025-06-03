"use client";

import { IconCircleX } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import ButtonSubmit from "@/components/ButtonSubmit";
import { useEffect, useRef, useState } from "react";
import FormInstitusiPage, { FormInstitusiRef } from "../components/form";
import { ApiResponse } from "@/model/ApiResponse";
import { AxiosInstance } from "lib/axios";
import { Lov, LovResponse } from "@/model/admin/Lov";
import { Provinsi, ProvinsiResponse } from "@/model/admin/struktur-wilayah/Provinsi";
import { KabupatenKota, KabupatenKotaResponse } from "@/model/admin/struktur-wilayah/KabupatenKota";
import { Kecamatan, KecamatanResponse } from "@/model/admin/struktur-wilayah/Kecamatan";

const CreateInstitusiPage = () => {
  const [dataTipeInstitusi, setTipeInstitusi] = useState<Lov[]>([]);
  const [dataTipeAkreditasi, setTipeAkreditasi] = useState<Lov[]>([]);
  const [dataStatus, setStatus] = useState<Lov[]>([]);
  const [dataProvinsi, setDataProvinsi] = useState<Provinsi[]>([]);
  const [dataKabupatenKota, setDataKabupatenKota] = useState<KabupatenKota[]>([]);
  const [dataKecamatan, setDataKecamatan] = useState<Kecamatan[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseLov = await AxiosInstance.get<ApiResponse<LovResponse>>("/lovs?namaKategori=INSTITUSI");
        const responseDataLov = responseLov.data;
        setTipeInstitusi(responseDataLov._embedded?.lovList);

        const responseLov2 = await AxiosInstance.get<ApiResponse<LovResponse>>("/lovs?namaKategori=AKREDITASI");
        const responseDataLov2 = responseLov2.data;
        setTipeAkreditasi(responseDataLov2._embedded?.lovList);

        const responseLov3 = await AxiosInstance.get<ApiResponse<LovResponse>>("/lovs?namaKategori=STATUS");
        const responseDataLov3 = responseLov3.data;
        setStatus(responseDataLov3._embedded?.lovList);

        const responseProv = await AxiosInstance.get<ApiResponse<ProvinsiResponse>>("/provinsi");
        const responseDataProv = responseProv.data;
        setDataProvinsi(responseDataProv._embedded?.provinsiList);

        const responseKab = await AxiosInstance.get<ApiResponse<KabupatenKotaResponse>>("/kabupaten-kota");
        const responseDataKab = responseKab.data;
        setDataKabupatenKota(responseDataKab._embedded?.kabupatenKotaList);

        const responseKec = await AxiosInstance.get<ApiResponse<KecamatanResponse>>("/kecamatan");
        const responseDataKec = responseKec.data;
        setDataKecamatan(responseDataKec._embedded?.kecamatanList);

        // console.log(responseData);
      } catch (error: any) {
        setError(error?.message || "Gagal mendapatkan data");
        console.error("Fetch provinsi gagal:", error);
      }
    };

    fetchData();
  }, []);

  const formRef = useRef<FormInstitusiRef>(null);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div>
            <Breadcrumbs items={[{ label: "Institusi", href: "/cms/institusi" }, { label: "Buat Data" }]} />
            <div className="flex items-center gap-2 text-secondary-green">
              <Building2 />
              <h1 className="text-2xl font-bold">Institusi</h1>
              <Badge variant="secondary" className="rounded-full px-4 text-base-gray">
                Tambah
              </Badge>
            </div>
            <p className="text-sm text-base-gray">Form untuk membuat data institusi</p>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <ButtonSubmit onClick={() => formRef.current?.submit()} />
            <Link href="/cms/institusi">
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
        <FormInstitusiPage type="ADD" lovList={dataTipeInstitusi} dataTipeAkreditasi={dataTipeAkreditasi}
                  dataStatus={dataStatus} provinsiList={dataProvinsi}
                  kabupatenKotaList={dataKabupatenKota}
                  kecamatanList={dataKecamatan} ref={formRef} />
      </main>
    </div>
  );
};

export default CreateInstitusiPage;
