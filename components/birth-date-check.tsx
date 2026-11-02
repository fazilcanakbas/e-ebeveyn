"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { ageStages, pregnancyStage, type AgeStage } from "@/lib/age-stages";
import { DatePicker } from "./date-picker";

type Result = { title: string; text: string; stage?: AgeStage };

// Tahmini doğum tarihi ortalama gebelik süresiyle sınırlı: 40 hafta.
const PREGNANCY_DAYS = 280;

const idle: Result = {
  title: "Bebeğiniz ne zaman doğdu?",
  text: "Hangi dönemde olduğunu gösterelim. Henüz doğmadıysa tahmini doğum tarihini seçin. Tarih kaydedilmez.",
};

// 31'inde doğan bebek için kısa aylarda ayın son gününü alır.
function addMonths(date: Date, months: number) {
  const target = new Date(date.getFullYear(), date.getMonth() + months, 1);
  const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  target.setDate(Math.min(date.getDate(), lastDay));
  return target;
}

function daysBetween(from: Date, to: Date) {
  return Math.round((to.getTime() - from.getTime()) / 86_400_000);
}

function ageTitle(months: number, days: number) {
  if (months === 0) return days === 0 ? "Bugün doğdu." : `${days} günlük.`;
  if (months < 12) return days === 0 ? `${months} aylık.` : `${months} ay ${days} günlük.`;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return rest === 0 ? `${years} yaşında.` : `${years} yaş ${rest} aylık.`;
}

function describe(birth: Date, now: Date): Result {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (birth > today) {
    const left = daysBetween(today, birth);
    const week = Math.max(1, Math.floor((PREGNANCY_DAYS - left) / 7));
    return {
      title: `${week}. hafta.`,
      text: `Hamilelik dönemindesiniz; tahmini doğuma ${left} gün kaldı.`,
      stage: pregnancyStage,
    };
  }

  let months = (today.getFullYear() - birth.getFullYear()) * 12 + today.getMonth() - birth.getMonth();
  if (addMonths(birth, months) > today) months -= 1;
  const title = ageTitle(months, daysBetween(addMonths(birth, months), today));

  const index = ageStages.findIndex((stage) => months < stage.untilMonth);
  if (index < 0) return { title, text: "Rehberlerimiz şimdilik 3 yaşa kadar." };

  const stage = ageStages[index];
  const next = ageStages[index + 1];
  const left = daysBetween(today, addMonths(birth, stage.untilMonth));
  return {
    title,
    text: `${stage.label} dönemindesiniz; ${next ? `${next.label}a` : "3 yaşına"} ${left} gün kaldı.`,
    stage,
  };
}

export function BirthDateCheck() {
  const [birth, setBirth] = useState<Date | null>(null);
  const [result, setResult] = useState(idle);

  return (
    <div>
      {/* Sonuç kısa da olsa yükseklik sabit: tarih seçilince alan zıplamasın. */}
      <div role="status">
        <p
          key={result.title}
          className="anim-word flex min-h-[2.04em] max-w-[14ch] items-end text-[clamp(2.75rem,5vw,5.25rem)] leading-[1.02] tracking-[-0.025em]"
        >
          {result.title}
        </p>
        <p className="mt-4 min-h-12 max-w-[26rem] text-ink/70">{result.text}</p>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-3">
        <DatePicker
          value={birth}
          label="Doğum tarihi"
          yearsBack={6}
          daysAhead={PREGNANCY_DAYS}
          note="Bugünden sonraki günler tahmini doğum tarihi sayılır."
          onChange={(date) => {
            setBirth(date);
            setResult(describe(date, new Date()));
          }}
        />
        {/* Dönem kartları hashchange dinler; Link bu olayı tetiklemediği için düz bağlantı. */}
        {result.stage && (
          <a
            href={`/#donem-${result.stage.id}`}
            className="inline-flex items-center gap-2 rounded-full bg-cobalt px-5 py-3 font-semibold text-white transition-colors duration-300 hover:bg-ink"
          >
            {result.stage.label} rehberi
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
}
