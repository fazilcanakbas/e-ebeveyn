"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { brandIcons } from "@/lib/brand-icons";

export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  error?: string;
  hint?: string;
  trailing?: ReactNode;
};

export function Field({ name, label, error, hint, trailing, ...input }: FieldProps) {
  const describedBy = error ? `${name}-hata` : hint ? `${name}-ipucu` : undefined;

  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-[0.9375rem] font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`h-13 w-full rounded-2xl border bg-white px-4 text-base outline-none transition-[border-color,box-shadow] duration-300 focus:border-cobalt focus:shadow-[0_0_0_3px_rgb(28_60_255/0.16)] ${
            error ? "border-[#c8321c]" : "border-ink/20 hover:border-ink/40"
          } ${trailing ? "pr-13" : ""}`}
          {...input}
        />
        {trailing}
      </div>
      {error ? (
        <p id={`${name}-hata`} className="mt-1.5 text-sm font-medium text-[#c8321c]">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${name}-ipucu`} className="mt-1.5 text-sm text-ink/60">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

type PasswordFieldProps = Omit<FieldProps, "type" | "trailing">;

export function PasswordField(props: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const Icon = visible ? EyeOff : Eye;

  return (
    <Field
      {...props}
      type={visible ? "text" : "password"}
      trailing={
        <button
          type="button"
          aria-label={visible ? "Şifreyi gizle" : "Şifreyi göster"}
          aria-pressed={visible}
          onClick={() => setVisible((value) => !value)}
          className="absolute top-1/2 right-1.5 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-xl text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink"
        >
          <Icon className="size-5" aria-hidden="true" />
        </button>
      }
    />
  );
}

const providers = [
  { name: "Google", icon: brandIcons.google },
  { name: "Apple", icon: brandIcons.apple },
];

export function SocialLogin({ onSelect }: { onSelect: () => void }) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {providers.map((provider) => (
          <button
            key={provider.name}
            type="button"
            onClick={onSelect}
            className="flex h-13 cursor-pointer items-center justify-center gap-2.5 rounded-2xl border border-ink/20 font-medium transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
              <path d={provider.icon} />
            </svg>
            {provider.name}
          </button>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3 text-sm text-ink/55">
        <span className="h-px flex-1 bg-ink/15" />
        veya e-postayla
        <span className="h-px flex-1 bg-ink/15" />
      </div>
    </div>
  );
}

export function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="submit"
      className="h-13 w-full cursor-pointer rounded-full bg-cobalt font-semibold text-white transition-colors duration-300 hover:bg-ink"
    >
      {children}
    </button>
  );
}

// Üyelik sistemi bağlanana kadar kullanıcıya gerçeği söyler.
export function PreviewNotice() {
  return (
    <p role="status" className="anim-word rounded-2xl bg-ink/5 px-4 py-3 text-sm font-medium">
      Üyelik sistemi henüz bağlı değil; bu bir tasarım önizlemesi.
    </p>
  );
}
