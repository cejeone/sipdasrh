"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { deleteEselon1, detailEselon1 } from "../lib/action";
import { toast } from "sonner";

interface Props {
  id: number;
  mutateEselon1: () => void;
}

export default function Delete({ id, mutateEselon1 }: Props) {
  const handleDelete = async () => {
    try {
      await deleteEselon1(id);
      mutateEselon1(); // Langsung panggil mutate
      toast.success("Data berhasil dihapus");
    } catch (error) {
      console.error("Gagal menghapus dokumen:", error);
      toast.error("Gagal menghapus data");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="text-white w-full justify-start">
          <Trash2Icon className="text-white mr-2" /> Hapus
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Yakin ingin menghapus data ini?</AlertDialogTitle>
          <AlertDialogDescription>Tindakan ini tidak dapat dibatalkan. Data akan dihapus permanen.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-base-destructive text-white">
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
