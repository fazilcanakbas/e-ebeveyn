"use client";

import type Matter from "matter-js";
import { useEffect, useRef } from "react";

type Block = {
  label?: string;
  shape: "rect" | "circle" | "triangle";
  width: number;
  height: number;
  background: string;
  color: string;
};

const blocks: Block[] = [
  { label: "Uyku", shape: "circle", width: 200, height: 200, background: "#2f49ff", color: "#fff" },
  { label: "Beslenme", shape: "rect", width: 260, height: 130, background: "#16b56f", color: "#141414" },
  { label: "Gelişim", shape: "rect", width: 150, height: 210, background: "#ff5a36", color: "#141414" },
  { label: "Aktiviteler", shape: "rect", width: 270, height: 120, background: "#ff8fd0", color: "#141414" },
  { label: "Doktorlar", shape: "circle", width: 180, height: 180, background: "#fff", color: "#141414" },
  { label: "Forum", shape: "rect", width: 170, height: 170, background: "#8b5cff", color: "#fff" },
  { label: "AI Asistan", shape: "rect", width: 220, height: 110, background: "#141414", color: "#fff" },
  { shape: "triangle", width: 150, height: 150, background: "#ff5a36", color: "#141414" },
  { shape: "circle", width: 84, height: 84, background: "#16b56f", color: "#141414" },
  { shape: "rect", width: 90, height: 90, background: "#fff", color: "#141414" },
];

const WALL = 200;

function run(stage: HTMLElement, elements: (HTMLElement | null)[], engineLib: typeof Matter) {
  const { Bodies, Body, Composite, Constraint, Engine, Sleeping } = engineLib;
  const engine = Engine.create({ enableSleeping: true });
  const listeners = new AbortController();

  let width = stage.clientWidth;
  let height = stage.clientHeight;
  const scale = Math.max(0.5, Math.min(1.1, Math.min(width / 1360, height / 760)));

  const wallOptions = { isStatic: true, friction: 0.8 };
  const floor = Bodies.rectangle(width / 2, height + WALL / 2, width * 4, WALL, wallOptions);
  const left = Bodies.rectangle(-WALL / 2, 0, WALL, height * 12, wallOptions);
  const right = Bodies.rectangle(width + WALL / 2, 0, WALL, height * 12, wallOptions);
  Composite.add(engine.world, [floor, left, right]);

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = blocks.flatMap((block, index) => {
    const element = elements[index];
    if (!element) return [];
    const w = block.width * scale;
    const h = block.height * scale;
    // Sırayla yukarıdan bırakılır; x konumu ekrana yayılsın diye altın oranla dağılır.
    const x = width * (0.12 + 0.76 * ((index * 0.618) % 1));
    const y = -h - index * 190 * scale;
    const options = { restitution: 0.32, friction: 0.55, angle: (index % 5) * 0.35 - 0.7 };

    let body: Matter.Body;
    if (block.shape === "circle") {
      body = Bodies.circle(x, y, w / 2, options);
    } else if (block.shape === "triangle") {
      body = Bodies.polygon(x, y, 3, w / 2, { ...options, angle: 0 });
      const polygon = element.querySelector("polygon");
      polygon?.setAttribute(
        "points",
        body.vertices
          .map((vertex) => `${vertex.x - body.position.x + w / 2},${vertex.y - body.position.y + h / 2}`)
          .join(" "),
      );
      element.querySelector("svg")?.setAttribute("viewBox", `0 0 ${w} ${h}`);
    } else {
      body = Bodies.rectangle(x, y, w, h, { ...options, chamfer: { radius: 14 * scale } });
    }

    element.style.width = `${w}px`;
    element.style.height = `${h}px`;
    element.style.fontSize = `${Math.max(14, 25 * scale)}px`;
    if (block.shape === "rect") element.style.borderRadius = `${14 * scale}px`;
    return [{ element, body, w, h }];
  });
  Composite.add(engine.world, items.map((item) => item.body));

  items.forEach(({ element, body }) => {
    let drag: Matter.Constraint | null = null;
    let moved = false;
    let start = { x: 0, y: 0 };

    const pointer = (event: PointerEvent) => {
      const box = stage.getBoundingClientRect();
      return { x: event.clientX - box.left, y: event.clientY - box.top };
    };

    element.addEventListener(
      "pointerdown",
      (event) => {
        start = pointer(event);
        moved = false;
        Sleeping.set(body, false);
        element.setPointerCapture(event.pointerId);
        drag = Constraint.create({
          pointA: start,
          bodyB: body,
          pointB: { x: start.x - body.position.x, y: start.y - body.position.y },
          stiffness: 0.12,
          damping: 0.08,
          length: 0,
        });
        Composite.add(engine.world, drag);
      },
      { signal: listeners.signal },
    );
    element.addEventListener(
      "pointermove",
      (event) => {
        if (!drag) return;
        const now = pointer(event);
        drag.pointA = now;
        if (Math.hypot(now.x - start.x, now.y - start.y) > 6) moved = true;
      },
      { signal: listeners.signal },
    );
    const drop = () => {
      if (drag) Composite.remove(engine.world, drag);
      drag = null;
    };
    element.addEventListener("pointerup", drop, { signal: listeners.signal });
    element.addEventListener("pointercancel", drop, { signal: listeners.signal });
    // Sürükleme bittiğinde bağlantı açılmasın.
    element.addEventListener(
      "click",
      (event) => {
        if (moved) event.preventDefault();
      },
      { signal: listeners.signal },
    );
  });

  const place = () => {
    items.forEach(({ element, body, w, h }) => {
      element.style.transform = `translate(${body.position.x - w / 2}px, ${body.position.y - h / 2}px) rotate(${body.angle}rad)`;
    });
  };

  const resize = new ResizeObserver(() => {
    width = stage.clientWidth;
    height = stage.clientHeight;
    Body.setPosition(floor, { x: width / 2, y: height + WALL / 2 });
    Body.setPosition(right, { x: width + WALL / 2, y: 0 });
    items.forEach(({ body, w }) => {
      Sleeping.set(body, false);
      if (body.position.x > width - w / 2) {
        Body.setPosition(body, { x: width - w / 2, y: body.position.y });
      }
    });
  });
  resize.observe(stage);

  let frame = 0;
  if (reduced) {
    // Hareket azaltma açıksa bloklar düşmeden yerinde başlar.
    for (let step = 0; step < 900; step += 1) Engine.update(engine, 1000 / 60);
    place();
  } else {
    const tick = () => {
      Engine.update(engine, 1000 / 60);
      place();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  }

  return () => {
    cancelAnimationFrame(frame);
    resize.disconnect();
    listeners.abort();
    Engine.clear(engine);
  };
}

export function BlockPile() {
  const stage = useRef<HTMLDivElement>(null);
  const elements = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    let stop: (() => void) | undefined;
    let cancelled = false;
    import("matter-js").then(({ default: engineLib }) => {
      if (!cancelled && stage.current) stop = run(stage.current, elements.current, engineLib);
    });
    return () => {
      cancelled = true;
      stop?.();
    };
  }, []);

  return (
    <div ref={stage} className="absolute inset-0 overflow-hidden">
      {blocks.map((block, index) => {
        const shared = {
          ref: (node: HTMLElement | null) => {
            elements.current[index] = node;
          },
          style: {
            transform: "translateY(-200vh)",
            background: block.shape === "triangle" ? "transparent" : block.background,
            color: block.color,
          },
          className: `absolute top-0 left-0 grid cursor-grab touch-none place-items-center leading-none font-extrabold tracking-[-0.02em] select-none active:cursor-grabbing ${
            block.shape === "triangle" ? "" : "border-[3px] border-[#141414]"
          } ${block.shape === "circle" ? "rounded-full" : ""}`,
        };

        if (block.label) {
          return (
            <a key={block.label} href="#" draggable={false} {...shared}>
              {block.label}
            </a>
          );
        }
        return (
          <div key={index} aria-hidden="true" {...shared}>
            {block.shape === "triangle" && (
              <svg className="absolute inset-0 size-full overflow-visible">
                <polygon fill={block.background} stroke="#141414" strokeWidth="3" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}
