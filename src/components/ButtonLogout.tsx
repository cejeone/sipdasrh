"use client";

import { Button } from "@/components/ui/button";
import { deleteCookie } from "cookies-next/client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const ButtonLogout = () => {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("accessToken");
    router.push("/");
  };

  return (
    <div className="space-y-2">
      <form action={handleLogout}>
        <Button type="submit" variant={"destructive"}>
          <LogOut className="mr-2 h-4 w-full" />
          Keluar
        </Button>
      </form>
    </div>
  );
};

export default ButtonLogout;
