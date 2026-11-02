"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Field, isEmail, PasswordField, PreviewNotice, SocialLogin, SubmitButton } from "./auth-fields";

type Errors = { email?: string; password?: string };

export function LoginForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Errors = {};
    if (!isEmail(String(data.get("email")))) next.email = "Geçerli bir e-posta adresi girin.";
    if (!String(data.get("password"))) next.password = "Şifrenizi girin.";
    setErrors(next);

    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      setNotice(false);
      document.getElementById(firstInvalid)?.focus();
    } else {
      setNotice(true);
    }
  };

  return (
    <div className="auth-form flex flex-col gap-5">
      <div>
        <h1 className="text-[2.75rem] leading-[1.05] tracking-[-0.025em]">Tekrar hoş geldiniz.</h1>
        <p className="mt-2 text-lg text-ink/70">Kaldığınız yerden devam edin.</p>
      </div>

      <SocialLogin onSelect={() => setNotice(true)} />

      <form onSubmit={submit} noValidate className="flex flex-col gap-4">
        <Field
          name="email"
          label="E-posta"
          type="email"
          autoComplete="email"
          inputMode="email"
          error={errors.email}
        />
        <div>
          <PasswordField
            name="password"
            label="Şifre"
            autoComplete="current-password"
            error={errors.password}
          />
          <Link
            href="#"
            className="mt-2 inline-block text-sm font-medium underline underline-offset-4 hover:text-cobalt"
          >
            Şifremi unuttum
          </Link>
        </div>
        <SubmitButton>Giriş yap</SubmitButton>
        {notice && <PreviewNotice />}
      </form>

      <p className="text-center text-[0.9375rem]">
        Hesabınız yok mu?{" "}
        <Link href="/uye-ol" className="font-semibold underline underline-offset-4 hover:text-cobalt">
          Üye olun
        </Link>
      </p>
    </div>
  );
}
