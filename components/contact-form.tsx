"use client";

import { useState, type FormEvent } from "react";
import { Field, isEmail, SubmitButton } from "./auth/auth-fields";

const subjects = ["Genel soru", "İçerik hatası", "Üyelik", "Reklam ve iş birliği", "KVKK başvurusu"];

type Errors = { name?: string; email?: string; message?: string };

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Errors = {};
    if (!String(data.get("name")).trim()) next.name = "Adınızı yazın.";
    if (!isEmail(String(data.get("email")))) next.email = "Geçerli bir e-posta adresi girin.";
    if (!String(data.get("message")).trim()) next.message = "Mesajınızı yazın.";
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
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      <fieldset>
        <legend className="mb-1.5 text-[0.9375rem] font-medium">Konu</legend>
        <div className="flex flex-wrap gap-1.5">
          {subjects.map((subject, index) => (
            <label key={subject} className="relative cursor-pointer">
              <input
                type="radio"
                name="subject"
                value={subject}
                defaultChecked={index === 0}
                className="peer sr-only"
              />
              <span className="block rounded-full border border-ink/20 px-3.5 py-2 text-sm font-medium transition-colors duration-300 peer-checked:border-cobalt peer-checked:bg-cobalt peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 hover:border-ink/50">
                {subject}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Adınız" autoComplete="name" error={errors.name} />
        <Field name="email" label="E-posta" type="email" autoComplete="email" inputMode="email" error={errors.email} />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-[0.9375rem] font-medium">
          Mesajınız
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-hata" : undefined}
          className={`block w-full resize-y rounded-2xl border bg-white px-4 py-3 text-base outline-none transition-[border-color,box-shadow] duration-300 focus:border-cobalt focus:shadow-[0_0_0_3px_rgb(28_60_255/0.16)] ${
            errors.message ? "border-[#c8321c]" : "border-ink/20 hover:border-ink/40"
          }`}
        />
        {errors.message && (
          <p id="message-hata" className="mt-1.5 text-sm font-medium text-[#c8321c]">
            {errors.message}
          </p>
        )}
      </div>

      <SubmitButton>Gönder</SubmitButton>

      {/* Sunucu bağlanana kadar kullanıcıya gerçeği söyler. */}
      {notice && (
        <p role="status" className="anim-word rounded-2xl bg-ink/5 px-4 py-3 text-sm font-medium">
          İletişim formu henüz bağlı değil; mesajınız gönderilmedi.
        </p>
      )}
    </form>
  );
}
