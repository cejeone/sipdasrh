"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { formSchema } from "./validation";
import { AxiosInstance } from "lib/axios";

import { setCookie } from "cookies-next/client";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" className="w-full bg-secondary-green hover:bg-hover-base-green text-white">
      {pending ? "Memuat..." : "Masuk"}
    </Button>
  );
};

const FormSignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError([]);

    const validation = formSchema.safeParse({
      email,
      password,
    });

    if (!validation.success) {
      const errorMessage = validation.error.issues.map((issue) => issue.message);
      setError(errorMessage);
      return;
    }

    await AxiosInstance.post("/login", { email: email, password: password })
      .then((response) => {
        setCookie("accessToken", response.data.access_token);
        router.push("/cms");
      })
      .catch((error) => {
        setError(["Gagal masuk. Periksa email dan sandi Anda."]);
        return;
      });
  };

  return (
    <div className="min-h-screen flex">
      {/* Kiri: Gambar */}
      <div className="w-[80%] relative hidden md:block">
        <Image src="/img/login.png" alt="login" layout="fill" objectFit="cover" />
      </div>

      {/* Kanan: Form Login */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-bg-card px-8 py-12">
        <div className="w-full max-w-md space-y-6 border rounded-sm p-8">
          {/* Logo dan Judul */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image src="/KEMENHUT.svg" alt="Logo" width={40} height={40} className="object-contain" />
            <h1 className="text-2xl font-semibold text-secondary-green">SSO PDASRH</h1>
          </div>

          {error.length > 0 && (
            <div>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                {/* <AlertTitle>Error</AlertTitle> */}
                <AlertDescription>
                  <ul>
                    {error?.map((value, index) => (
                      <li key={index}>{value}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
          )}
          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="" className="mt-1" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-medium">Kata Sandi</label>
              <div className="relative mt-1">
                <Input type={showPassword ? "text" : "password"} placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} required />
                {/* Ikon Eye diklik untuk toggle */}
                <div className="absolute right-3 top-2.5 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-gray-500" />}
                </div>
              </div>
            </div>

            <SubmitButton />
          </form>

          {/* Garis dan Teks "atau" */}
          <div className="flex items-center gap-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="text-sm text-base-green">atau</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* Tombol Google dan Registrasi */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full font-semibold text-base-green">
              Masuk dengan Google
            </Button>
            <p className="text-sm text-gray-600 text-center">
              Tidak punya akun?{" "}
              <a href="#" className="text-secondary-green font-medium underline">
                Registrasi
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSignIn;
