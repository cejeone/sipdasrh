"use client";

import { Dokumen } from "@/model/rh/Dokumen";
import { setupInterceptor } from "lib/axios";
import { useRouter } from "next/navigation";
import { dokumenFormSchema } from "../lib/validation";
import { createDokumen, deleteDokumenFiles, editDokumen, uploadFilesToDokumen } from "../lib/action";
import { FC, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { CardContent } from "@/components/ui/card";
import InputField from "@/components/InputField";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import InputFile from "@/components/InputFile";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface FormDokumenProps {
  type?: "ADD" | "EDIT";
  defaultValues?: Dokumen | null;
}

export interface FormDokumenRef {
  submit: () => void;
}

const FormDokumenPage = forwardRef<FormDokumenRef, FormDokumenProps>(({ type, defaultValues }, ref) => {
  setupInterceptor();
  const router = useRouter();

  const [tipe, setTipe] = useState("");
  const [namaDokumen, setNamaDokumen] = useState("");
  const [status, setStatus] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [existingFiles, setExistingFiles] = useState<Dokumen["files"]>([]);
  const [deletedFileIds, setDeletedFileIds] = useState<string[]>([]);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (type == "EDIT" && defaultValues) {
      setTipe(defaultValues.tipe || "");
      setNamaDokumen(defaultValues.namaDokumen || "");
      setStatus(defaultValues.status || "");
      setKeterangan(defaultValues.keterangan || "");
      setExistingFiles(defaultValues.files || []);
    }
  }, [type, defaultValues]);

  // delete file tertentu
  const handleDeleteExistingFile = (fileId: string) => {
    setDeletedFileIds((prev) => [...prev, fileId]);
    setExistingFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  // btn submit
  useImperativeHandle(ref, () => ({
    submit: () => {
      formRef.current?.requestSubmit();
    },
  }));

  useImperativeHandle(ref, () => ({
    submit: () => {
      formRef.current?.requestSubmit();
    },
  }));
  // btn submit

  const handleDokumen = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validation = dokumenFormSchema.safeParse({
        tipe,
        namaDokumen,
        status,
        keterangan,
        files,
      });

      if (!validation.success) {
        const fieldErrors: Record<string, string> = {};
        validation.error.issues.forEach((issue) => {
          const field = issue.path[0] as string;
          fieldErrors[field] = issue.message;
        });
        setErrors(fieldErrors);
        return;
      }

      const validData = validation.data;

      if (type == "ADD") {
        const dokumen = await createDokumen(validData);

        // Upload file jika ada
        if (files.length > 0) {
          await uploadFilesToDokumen(dokumen.id, files);
          toast.success("File berhasil diunggah");
        }

        router.push("/cms/rh/dokumen");
        toast.success("Berhasil menambahkan data");
      } else {
        if (defaultValues?.id) {
          await editDokumen(validData, defaultValues.id);

          // Hapus file yang ditandai
          if (deletedFileIds.length > 0) {
            try {
              await deleteDokumenFiles(defaultValues.id, deletedFileIds);
              toast.success("File lama berhasil dihapus");
            } catch (err) {
              console.error("Gagal menghapus file:", err);
              toast.error("Gagal menghapus file lama");
            }
          }

          // Upload file baru jika ada
          if (files.length > 0) {
            await uploadFilesToDokumen(defaultValues.id, files);
            toast.success("File baru berhasil diunggah");
          }

          router.push("/cms/rh/dokumen");
          toast.success("Berhasil memperbaharui data");
        }
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menyimpan dokumen:", error);
      toast.error("Terjadi kesalahan saat menyimpan data");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleDokumen}>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-secondary-green mb-2 font-bold">Tipe</Label>
          <Select value={tipe} onValueChange={setTipe}>
            <SelectTrigger className="w-full border-border">
              <SelectValue placeholder="Pilih salah satu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UNDANG-UNDANG">UNDANG - UNDANG</SelectItem>
              <SelectItem value="PERATURAN PRESIDEN">PERATURAN PRESIDEN</SelectItem>
              <SelectItem value="PERATURAN PEMERINTAH">PERATURAN PEMERINTAH</SelectItem>
              <SelectItem value="PETA CETAK">PETA CETAK</SelectItem>
            </SelectContent>
          </Select>
          {errors.tipe && <p className="text-sm text-base-destructive mt-1">{errors.tipe}</p>}
        </div>

        <InputField label="Nama Dokumen" value={namaDokumen} onChange={(e) => setNamaDokumen(e.target.value)} error={errors.namaDokumen} />

        <div>
          {/* Input file baru */}
          <InputFile
            id="files"
            name="files"
            label="Unggah File Baru"
            multiple={true}
            accept={{ "application/pdf": [".pdf"] }}
            maxSize={5 * 1024 * 1024}
            onChange={(files) => setFiles(files)}
          />
          {/* File lama */}
          {type === "EDIT" && existingFiles.length > 0 && (
            <ul className="mt-2 space-y-2">
              {existingFiles.map((file) => (
                <li key={file.id} className="flex items-center justify-between bg-gray-100 rounded-md px-4 py-2">
                  <span>{file.namaAsli}</span>
                  <button type="button" onClick={() => handleDeleteExistingFile(file.id)} className="text-sm text-red-600 hover:underline hover:cursor-pointer">
                    Hapus
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <Label className="text-secondary-green mb-2 font-bold">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full border-border">
              <SelectValue placeholder="Pilih salah satu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Publikasi">Publikasi</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && <p className="text-sm text-base-destructive mt-1">{errors.status}</p>}
        </div>

        <div>
          <Label className="text-secondary-green mb-2 font-bold">Keterangan</Label>
          <Textarea className="border-border" value={keterangan} onChange={(e) => setKeterangan(e.target.value)} placeholder="Masukkan Keterangan" />
          {errors.keterangan && <p className="text-sm text-base-destructive mt-1">{errors.keterangan}</p>}
        </div>
      </CardContent>
    </form>
  );
});

export default FormDokumenPage;
