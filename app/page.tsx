"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Clock } from "./components/clock";

type WorkspaceId = 1 | 2 | 3;

const workspaces: { id: WorkspaceId; label: string }[] = [
  { id: 1, label: "home" },
  { id: 2, label: "projects" },
  { id: 3, label: "contact" },
];

export default function Home() {
  const [active, setActive] = useState<WorkspaceId>(1);
  const [prefix, setPrefix] = useState(false);

  const select = useCallback((id: WorkspaceId) => {
    setActive(id);
    setPrefix(false);
  }, []);

  useEffect(() => {
    let prefixTimer: ReturnType<typeof setTimeout> | undefined;

    const onKey = (e: KeyboardEvent) => {
      if (prefix) {
        if (e.key === "1" || e.key === "2" || e.key === "3") {
          e.preventDefault();
          select(Number(e.key) as WorkspaceId);
          return;
        }
        if (e.key === "Escape") {
          setPrefix(false);
          return;
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setPrefix(true);
        clearTimeout(prefixTimer);
        prefixTimer = setTimeout(() => setPrefix(false), 2500);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(prefixTimer);
    };
  }, [prefix, select]);

  return (
    <div className="flex min-h-svh flex-col bg-black p-1.5 text-zinc-300 font-mono sm:p-2.5">
      <div className="flex flex-1 flex-col overflow-hidden rounded-md border border-phosphor/40 shadow-[0_0_80px_rgba(95,255,135,0.08)]">
        <Bar active={active} onSelect={select} />
        <main className="flex-1 overflow-y-auto px-4 py-5 text-[13px] leading-relaxed sm:px-8 sm:py-7 sm:text-[14px] md:px-12 md:py-10 md:text-[15px]">
          <div key={active} className="space-y-1">
            {active === 1 && <HomeWorkspace />}
            {active === 2 && <ProjectsWorkspace />}
            {active === 3 && <ContactWorkspace />}
            <CursorLine />
          </div>
        </main>
        <StatusBar prefix={prefix} />
      </div>
    </div>
  );
}

function HomeWorkspace() {
  return (
    <>
      <Line delay={0}>
        <Prompt /> <span className="text-zinc-100">whoami</span>
      </Line>
      <Block delay={1}>
        <p className="text-zinc-100">Sergei Kartsev</p>
        <p>&nbsp;</p>
        <p>Software engineer — full-stack.</p>
        <p>&nbsp;</p>
        <p>
          Frontend by trade. Backend in{" "}
          <span className="text-phosphor">Rust</span> — by love.
        </p>
        <p>&nbsp;</p>
        <p>Building fast, end-to-end systems.</p>
      </Block>
    </>
  );
}

function ProjectsWorkspace() {
  return (
    <>
      <Line delay={0}>
        <Prompt /> <span className="text-zinc-100">ls projects/</span>
      </Line>
      <Block delay={1}>
        <p>
          <span className="text-phosphor">omb</span>{" "}
          <span className="text-zinc-500">·</span> SSH-based blog platform
          written in Rust
        </p>
        <p>&nbsp;</p>
        <p>
          <Link
            href="https://github.com/arracacha/omb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 underline-offset-4 hover:text-phosphor hover:underline"
          >
            github.com/arracacha/omb
          </Link>
        </p>
        <p>&nbsp;</p>
        <p className="text-zinc-500">
          try it:{" "}
          <span className="text-zinc-300">$ ssh blog.kartsev.dev</span>
        </p>
      </Block>
    </>
  );
}

function ContactWorkspace() {
  return (
    <>
      <Line delay={0}>
        <Prompt /> <span className="text-zinc-100">cat contact</span>
      </Line>
      <Block delay={1}>
        <ContactRow label="email">
          <a
            href="mailto:kartsevsb@gmail.com"
            className="break-all hover:text-phosphor"
          >
            kartsevsb@gmail.com
          </a>
        </ContactRow>
        <ContactRow label="github">
          <a
            href="https://github.com/kmpeeduwee"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-phosphor"
          >
            kmpeeduwee
          </a>
        </ContactRow>
        <ContactRow label="phone">
          <a href="tel:+19518423253" className="hover:text-phosphor">
            +1 951 842 3253
          </a>
          <span className="px-2 text-zinc-600">·</span>
          <a href="tel:+381621826916" className="hover:text-phosphor">
            +381 62 182 6916
          </a>
        </ContactRow>
      </Block>
    </>
  );
}

function Bar({
  active,
  onSelect,
}: {
  active: WorkspaceId;
  onSelect: (id: WorkspaceId) => void;
}) {
  return (
    <header className="flex shrink-0 items-center justify-between border-b border-phosphor/20 bg-black px-3 py-2 text-[11px] sm:px-5 sm:text-xs">
      <div className="flex items-center gap-1.5 sm:gap-2">
        {workspaces.map((w) => {
          const isActive = w.id === active;
          return (
            <button
              key={w.id}
              type="button"
              onClick={() => onSelect(w.id)}
              className={
                isActive
                  ? "rounded-sm border border-phosphor/60 px-1.5 py-px text-phosphor"
                  : "rounded-sm border border-zinc-800 px-1.5 py-px text-zinc-500 transition hover:border-zinc-600 hover:text-zinc-300"
              }
            >
              <span className="hidden sm:inline">
                {w.id}: {w.label}
              </span>
              <span className="sm:hidden">{w.id}</span>
            </button>
          );
        })}
      </div>
      <div className="hidden text-zinc-500 sm:block">
        <span className="text-phosphor">kartsev</span>
        <span>@</span>
        <span>dev</span>
      </div>
      <div className="flex items-center gap-3 text-zinc-500">
        <span className="hidden md:inline">★ rust</span>
        <Clock />
      </div>
    </header>
  );
}

function StatusBar({ prefix }: { prefix: boolean }) {
  return (
    <footer className="flex shrink-0 items-center justify-between border-t border-phosphor/20 bg-black px-3 py-1.5 text-[10px] text-zinc-600 sm:px-5 sm:text-[11px]">
      <span>
        {prefix ? (
          <span className="text-phosphor">[PREFIX]</span>
        ) : (
          <>
            <span className="text-phosphor">●</span> online
          </>
        )}
      </span>
      <span className="hidden sm:inline">
        <kbd className="rounded border border-zinc-700 px-1 text-zinc-400">Ctrl</kbd>
        <span className="px-0.5">+</span>
        <kbd className="rounded border border-zinc-700 px-1 text-zinc-400">B</kbd>
        <span className="px-1.5 text-zinc-600">then</span>
        <kbd className="rounded border border-zinc-700 px-1 text-zinc-400">1</kbd>
        <kbd className="ml-0.5 rounded border border-zinc-700 px-1 text-zinc-400">2</kbd>
        <kbd className="ml-0.5 rounded border border-zinc-700 px-1 text-zinc-400">3</kbd>
      </span>
      <span>kartsev.dev</span>
    </footer>
  );
}

function Prompt() {
  return (
    <span className="text-zinc-500">
      <span className="text-phosphor">kartsev</span>
      <span>@</span>
      <span>dev</span>
      <span>:~$</span>
    </span>
  );
}

function Line({
  delay,
  children,
}: { delay: number; children: React.ReactNode }) {
  return (
    <div
      className="animate-line opacity-0"
      style={{ animationDelay: `${delay * 0.25}s` }}
    >
      {children}
    </div>
  );
}

function Block({
  delay,
  children,
}: { delay: number; children: React.ReactNode }) {
  return (
    <div
      className="animate-line space-y-0 py-2 opacity-0"
      style={{ animationDelay: `${delay * 0.25}s` }}
    >
      {children}
    </div>
  );
}

function CursorLine() {
  return (
    <Line delay={2}>
      <Prompt />{" "}
      <span className="inline-block h-[1em] w-[0.55em] translate-y-[2px] animate-cursor bg-phosphor align-middle" />
    </Line>
  );
}

function ContactRow({
  label,
  children,
}: { label: string; children: React.ReactNode }) {
  return (
    <p className="flex flex-wrap items-baseline">
      <span className="inline-block w-16 shrink-0 text-zinc-500 sm:w-20">
        {label}
      </span>
      <span className="min-w-0 break-words">{children}</span>
    </p>
  );
}
