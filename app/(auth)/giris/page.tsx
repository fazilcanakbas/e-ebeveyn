import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Giriş yap | e-ebeveyn",
};

export default function LoginPage() {
  return <LoginForm />;
}
