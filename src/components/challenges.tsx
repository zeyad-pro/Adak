import { CircleX } from "lucide-react";
import { format } from "date-fns";
import React, { useEffect } from "react";

export interface ChallengeItem {
  id: number | string;
  name: string;
  color: string;
  date: string;
}

function formatCountdown(diffMs: number) {
  const isFuture = diffMs < 0;
  const abs = Math.abs(diffMs);

  if (abs < 60_000) return { text: "Now", isFuture };

  const days = Math.floor(abs / 86_400_000);
  const hours = Math.floor((abs / 3_600_000) % 24);
  const minutes = Math.floor((abs / 60_000) % 60);

  const parts = [
    days > 0 && `${days}d`,
    hours > 0 && `${hours}h`,
    minutes > 0 && `${minutes}m`,
  ].filter(Boolean);

  return { text: parts.join(" "), isFuture };
}

function loadChallenges(): ChallengeItem[] {
  try {
    const savedData = localStorage.getItem("challenges");
    return savedData ? (JSON.parse(savedData) as ChallengeItem[]) : [];
  } catch (e) {
    console.error("Error parsing localStorage", e);
    return [];
  }
}

function Challenges() {
  const [now, setNow] = React.useState(Date.now());
  const [data, setData] = React.useState<ChallengeItem[]>(loadChallenges);

  useEffect(() => {
    setNow(Date.now());
    const msToNextMinute = 60_000 - (Date.now() % 60_000);

    let intervalId: ReturnType<typeof setInterval>;
    const timeoutId = setTimeout(() => {
      setNow(Date.now());
      intervalId = setInterval(() => setNow(Date.now()), 60_000);
    }, msToNextMinute);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const handleUpdate = () => setData(loadChallenges());

    window.addEventListener("challengesUpdated", handleUpdate);
    window.addEventListener("storage", handleUpdate);


   return () => {
    window.removeEventListener("challengesUpdated", handleUpdate);
    window.removeEventListener("storage", handleUpdate);
  };
  }, []);

  useEffect(() => {
    localStorage.setItem("challenges", JSON.stringify(data));
  }, [data]);

  const handleDelete = (idToDelete: number | string) => {
    setData((prev) => prev.filter((item) => item.id !== idToDelete));
  };

  if (data.length === 0) {
    return (
      <div className="mx-2 my-2 md:px-10">
        <div className="flex h-[calc(100vh-265px)] w-full items-center justify-center">
          <div className="rounded-3xl  px-8 py-6 text-xl text-muted-foreground">
            (no data found yet)
          </div>
        </div>
      </div>
    );
  }

  const gridCols =
    data.length === 1
      ? "md:grid-cols-1"
      : data.length === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-2 xl:grid-cols-3";

  return (
    <div className={`mx-2 my-2 grid grid-cols-1 gap-4 md:px-10 ${gridCols}`}>
      {data.map((item) => (
        <ChallengeCard
          key={item.id}
          item={item}
          now={now}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

interface ChallengeCardProps {
  item: ChallengeItem;
  now: number;
  onDelete: (id: number | string) => void;
}

function ChallengeCard({ item, now, onDelete }: ChallengeCardProps) {
  const diffMs = now - new Date(item.date).getTime();
  const { text, isFuture } = formatCountdown(diffMs);

  return (
    <div className="group relative rounded-[28px] p-6 transition-all isolate">
      <div className="absolute inset-0 -z-10 rounded-[28px] border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:border-white/20 group-hover:bg-slate-900/80" />

      <button
        onClick={() => onDelete(item.id)}
        aria-label="Delete challenge"
        className="absolute right-4 top-4 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-all duration-200 hover:text-red-500 active:scale-90"
      >
        <CircleX className="h-6 w-6" />
      </button>

      <div className="relative z-10 flex h-52 flex-col md:h-64">
        <h2 className="font-enm text-2xl font-bold tracking-tight text-foreground">
          {item.name}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {format(new Date(item.date), "dd MMM yyyy · hh:mm a")}
        </p>

        <div className="mt-auto flex items-end justify-between">
          <p className="font-end text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {text}
          </p>
          <p className="pb-1.5 text-sm uppercase tracking-widest text-white/90">
            {isFuture ? "remaining" : "ago"}
          </p>
        </div>

        <div
          className="mt-4 h-1 w-full rounded-full"
          style={{
            background: `linear-gradient(to right, ${item.color}, transparent)`,
          }}
        />
      </div>
    </div>
  );
}

export default Challenges;