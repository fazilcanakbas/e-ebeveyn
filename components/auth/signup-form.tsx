"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ageStages } from "@/lib/age-stages";
import { Field, isEmail, PasswordField, PreviewNotice, SocialLogin, SubmitButton } from "./auth-fields";

type Errors = { name?: string; email?: string; password?: string; terms?: string };

const MIN_PASSWORD = 8;

export function SignupForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Errors = {};
    if (!String(data.get("name")).trim()) next.name = "Adınızı girin.";
    if (!isEmail(String(data.get("email")))) next.email = "Geçerli bir e-posta adresi girin.";
    if (String(data.get("password")).length < MIN_PASSWORD) {
      next.password = `Şifreniz en az ${MIN_PASSWORD} karakter olmalı.`;
    }
    if (!data.get("terms")) next.terms = "Devam etmek için onaylamanız gerekiyor.";
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
        <h1 className="text-[2.75rem] leading-[1.05] tracking-[-0.025em]">Hesabınızı oluşturun.</h1>
        <p className="mt-2 text-lg text-ink/70">Temel kullanım ücretsiz.</p>
      </div>

      <SocialLogin onSelect={() => setNotice(true)} />

      <form onSubmit={submit} noValidate className="flex flex-col gap-4">
        <Field name="name" label="Adınız" autoComplete="name" error={errors.name} />
        <Field
          name="email"
          label="E-posta"
          type="email"
          autoComplete="email"
          inputMode="email"
          error={errors.email}
        />
        <PasswordField
          name="password"
          label="Şifre"
          autoComplete="new-password"
          hint={`En az ${MIN_PASSWORD} karakter`}
          error={errors.password}
        />

        <fieldset>
          <legend className="mb-1.5 text-[0.9375rem] font-medium">
            Bebeğiniz kaç aylık? <span className="font-normal text-ink/55">(isteğe bağlı)</span>
          </legend>
          <div className="flex flex-wrap gap-1.5">
            {ageStages.map((stage) => (
              <label key={stage.id} className="cursor-pointer">
                <input type="radio" name="age" value={stage.id} className="peer sr-only" />
                <span className="block rounded-full border border-ink/20 px-3.5 py-2 text-sm font-medium transition-colors duration-300 peer-checked:border-cobalt peer-checked:bg-cobalt peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 hover:border-ink/50">
                  {stage.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          {/* Hukuki metin taslaktır; yayından önce KVKK danışmanına onaylatılmalı. */}
          <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-snug">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              aria-invalid={Boolean(errors.terms)}
              aria-describedby={errors.terms ? "terms-hata" : undefined}
              className="mt-0.5 size-[1.125rem] shrink-0 cursor-pointer accent-cobalt"
            />
            <span>
              <Link href="#" className="underline underline-offset-2 hover:text-cobalt">
                Kullanım Koşulları
              </Link>
              &apos;nı ve{" "}
              <Link href="#" className="underline underline-offset-2 hover:text-cobalt">
                KVKK Aydınlatma Metni
              </Link>
              &apos;ni okudum, kabul ediyorum.
            </span>
          </label>
          {errors.terms && (
            <p id="terms-hata" className="mt-1.5 text-sm font-medium text-[#c8321c]">
              {errors.terms}
            </p>
          )}
        </div>

        <SubmitButton>Üye ol</SubmitButton>
        {notice && <PreviewNotice />}
      </form>

      <p className="text-center text-[0.9375rem]">
        Zaten hesabınız var mı?{" "}
        <Link href="/giris" className="font-semibold underline underline-offset-4 hover:text-cobalt">
          Giriş yapın
        </Link>
      </p>
    </div>
  );
}
