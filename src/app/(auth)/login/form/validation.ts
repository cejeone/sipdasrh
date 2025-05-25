import { z } from "zod";

export const formSchema = z.object({
  email: z.string({ required_error: "email harus diisi" }).email({ message: "Email tidak valid" }),
  password: z.string({ required_error: "Sandi harus diisi" }),
});
