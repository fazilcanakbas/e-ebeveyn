"use client";

import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

const months = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];
const weekdays = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

const arrowSteps: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };

const arrow =
  "grid size-10 cursor-pointer place-items-center rounded-full transition-colors duration-200 hover:bg-ink/5 aria-disabled:cursor-default aria-disabled:opacity-25 aria-disabled:hover:bg-transparent";

function formatDate(date: Date) {
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function sameDay(a: Date, b: Date) {
  return a.getTime() === b.getTime();
}

type CalendarProps = {
  today: Date;
  value: Date | null;
  min: Date;
  max: Date;
  note?: string;
  closing: boolean;
  onSelect: (date: Date) => void;
};

function Calendar({ today, value, min, max, note, closing, onSelect }: CalendarProps) {
  const [cursor, setCursor] = useState(value ?? today);
  const [view, setView] = useState({ year: cursor.getFullYear(), month: cursor.getMonth() });
  const [mode, setMode] = useState<"days" | "months">("days");
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [focusTick, setFocusTick] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);

  // Alçak ekranda takvim ekranın altına taşmasın.
  useEffect(() => {
    panel.current?.scrollIntoView({ block: "nearest" });
  }, []);

  // Klavyeyle gezerken odak seçili güne taşınır; ay değişince günler yeniden oluşur.
  useEffect(() => {
    grid.current?.querySelector<HTMLButtonElement>('button[tabindex="0"]')?.focus({ preventScroll: true });
  }, [focusTick]);

  const canGoBack =
    mode === "days" ? new Date(view.year, view.month, 0) >= min : new Date(view.year, 0, 0) >= min;
  const canGoForward =
    mode === "days" ? new Date(view.year, view.month + 1, 1) <= max : new Date(view.year + 1, 0, 1) <= max;

  const step = (delta: number) => {
    if (delta > 0 ? !canGoForward : !canGoBack) return;
    setDirection(delta > 0 ? "next" : "prev");
    if (mode === "months") {
      setView({ ...view, year: view.year + delta });
      return;
    }
    const target = new Date(view.year, view.month + delta, 1);
    setView({ year: target.getFullYear(), month: target.getMonth() });
  };

  const moveCursor = (event: KeyboardEvent) => {
    const delta = arrowSteps[event.key];
    if (!delta) return;
    event.preventDefault();
    const target = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + delta);
    if (target < min || target > max) return;
    const sameMonth = target.getMonth() === view.month && target.getFullYear() === view.year;
    if (!sameMonth) {
      setDirection(delta > 0 ? "next" : "prev");
      setView({ year: target.getFullYear(), month: target.getMonth() });
    }
    setCursor(target);
    setFocusTick((tick) => tick + 1);
  };

  const pickMonth = (month: number) => {
    const first = new Date(view.year, month, 1);
    const target = first < min ? min : first;
    setView({ ...view, month });
    setCursor(target);
    setMode("days");
    setFocusTick((tick) => tick + 1);
  };

  const firstOfMonth = new Date(view.year, view.month, 1);
  const blanks = (firstOfMonth.getDay() + 6) % 7;
  const dayCount = new Date(view.year, view.month + 1, 0).getDate();
  const days = Array.from({ length: dayCount }, (_, index) => new Date(view.year, view.month, index + 1));
  const inRange = (date: Date) => date >= min && date <= max;
  const tabbable = days.find((day) => sameDay(day, cursor)) ?? days.find(inRange);

  return (
    <div
      ref={panel}
      data-state={closing ? "closing" : "open"}
      role="dialog"
      aria-label="Tarih seçin"
      className="date-picker absolute top-full left-0 z-30 mt-2 w-[min(21rem,calc(100vw-2rem))] origin-top-left scroll-mb-8 rounded-[1.75rem] border border-ink/10 bg-white p-3 text-ink shadow-soft"
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label={mode === "days" ? "Önceki ay" : "Önceki yıl"}
          aria-disabled={!canGoBack}
          onClick={() => step(-1)}
          className={arrow}
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-expanded={mode === "months"}
          onClick={() => setMode(mode === "days" ? "months" : "days")}
          className="cursor-pointer rounded-full px-4 py-2 text-lg tracking-[-0.01em] transition-colors duration-200 hover:bg-ink/5"
        >
          {mode === "days" ? `${months[view.month]} ${view.year}` : view.year}
        </button>
        <button
          type="button"
          aria-label={mode === "days" ? "Sonraki ay" : "Sonraki yıl"}
          aria-disabled={!canGoForward}
          onClick={() => step(1)}
          className={arrow}
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>

      {mode === "days" ? (
        <div key={`${view.year}-${view.month}`} ref={grid} onKeyDown={moveCursor} className={`picker-${direction} mt-1`}>
          <div aria-hidden="true" className="grid grid-cols-7 text-center text-xs text-ink/50">
            {weekdays.map((weekday) => (
              <span key={weekday} className="py-1.5">
                {weekday}
              </span>
            ))}
          </div>
          {/* Her ay altı satır: ay değişince takvimin yüksekliği oynamasın. */}
          <div className="grid h-[15rem] grid-cols-7 grid-rows-6">
            {Array.from({ length: blanks }, (_, index) => (
              <span key={index} />
            ))}
            {days.map((day) => {
              const selected = value !== null && sameDay(day, value);
              const isToday = sameDay(day, today);
              return (
                <button
                  key={day.getDate()}
                  type="button"
                  disabled={!inRange(day)}
                  tabIndex={tabbable && sameDay(day, tabbable) ? 0 : -1}
                  aria-label={formatDate(day)}
                  aria-pressed={selected}
                  aria-current={isToday ? "date" : undefined}
                  onClick={() => onSelect(day)}
                  className={`mx-auto size-10 cursor-pointer rounded-full text-[0.9375rem] transition-colors duration-200 disabled:cursor-default disabled:text-ink/25 disabled:hover:bg-transparent ${
                    selected ? "bg-cobalt font-semibold text-white" : "hover:bg-ink/5"
                  } ${isToday && !selected ? "font-semibold ring-1 ring-ink/30 ring-inset" : ""}`}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div key={view.year} className={`picker-${direction} mt-1 grid h-[16.625rem] grid-cols-3 grid-rows-4 gap-1`}>
          {months.map((name, month) => {
            const enabled = new Date(view.year, month + 1, 0) >= min && new Date(view.year, month, 1) <= max;
            const current = month === view.month;
            return (
              <button
                key={name}
                type="button"
                disabled={!enabled}
                aria-pressed={current}
                onClick={() => pickMonth(month)}
                className={`cursor-pointer rounded-2xl text-[0.9375rem] transition-colors duration-200 disabled:cursor-default disabled:text-ink/25 disabled:hover:bg-transparent ${
                  current ? "bg-ink/5 font-semibold" : "hover:bg-ink/5"
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>
      )}

      {note && <p className="mt-2 border-t border-ink/10 px-2 pt-2.5 pb-1 text-xs leading-snug text-ink/60">{note}</p>}
    </div>
  );
}

type DatePickerProps = {
  value: Date | null;
  onChange: (date: Date) => void;
  label: string;
  yearsBack: number;
  daysAhead: number;
  note?: string;
};

export function DatePicker({ value, onChange, label, yearsBack, daysAhead, note }: DatePickerProps) {
  // Bugün yalnızca takvim açıkken bilinir; açık/kapalı durumunu da bu değer belirler.
  const [today, setToday] = useState<Date | null>(null);
  const [closing, setClosing] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const close = (returnFocus: boolean) => {
    setClosing(true);
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setToday(null);
      setClosing(false);
    }, 170);
    if (returnFocus) trigger.current?.focus();
  };

  const open = () => {
    window.clearTimeout(closeTimer.current);
    const now = new Date();
    setToday(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
    setClosing(false);
  };

  const isOpen = today !== null && !closing;

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) close(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isOpen]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  return (
    <div
      ref={root}
      className="relative"
      onKeyDown={(event) => {
        if (event.key === "Escape" && isOpen) close(true);
      }}
      onBlur={(event) => {
        if (isOpen && event.relatedTarget && !root.current?.contains(event.relatedTarget)) close(false);
      }}
    >
      <button
        ref={trigger}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label={value ? `${label}: ${formatDate(value)}` : label}
        onClick={() => (isOpen ? close(false) : open())}
        className="flex cursor-pointer items-center gap-2.5 rounded-full border border-ink/20 py-3 pr-5 pl-4 font-medium transition-colors duration-300 hover:border-ink aria-expanded:border-ink"
      >
        <CalendarDays className="size-5" aria-hidden="true" />
        {value ? formatDate(value) : "Tarih seçin"}
      </button>

      {today && (
        <Calendar
          today={today}
          value={value}
          min={new Date(today.getFullYear() - yearsBack, today.getMonth(), today.getDate())}
          max={new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysAhead)}
          note={note}
          closing={closing}
          onSelect={(date) => {
            onChange(date);
            close(true);
          }}
        />
      )}
    </div>
  );
}
