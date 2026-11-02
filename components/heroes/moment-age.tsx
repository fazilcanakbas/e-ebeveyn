"use client";

import { useState } from "react";
import { ageStages } from "@/lib/age-stages";

export function MomentAge() {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        aria-expanded={false}
        onClick={() => setOpen(true)}
        className="cursor-pointer rounded-full bg-[#1c3cff] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white hover:text-[#1c3cff] lg:px-8 lg:py-4 lg:text-lg"
      >
        Bebeğiniz kaç aylık?
      </button>
    );
  }

  return (
    <ul aria-label="Bebeğinizin yaşı" className="anim-word flex flex-wrap gap-1.5 lg:gap-2">
      {ageStages.map((stage, index) => (
        <li key={stage.id}>
          <a
            href={`#donem-${stage.id}`}
            autoFocus={index === 0}
            className="block rounded-full bg-[#1c3cff] px-4 py-3 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-white hover:text-[#1c3cff] lg:px-6 lg:py-4 lg:text-lg"
          >
            {stage.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
