import { Button } from "./ui/button";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useFormStatus } from "react-dom";
import { ButtonHTMLAttributes } from "react";

interface ButtonSubmitProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export default function ButtonSubmit({ onClick, label = "Simpan", ...props }: ButtonSubmitProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" onClick={onClick} disabled={pending} variant="green" {...props}>
      <IconDeviceFloppy className="mr-2" />
      {label}
    </Button>
  );
}
