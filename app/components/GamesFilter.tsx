"use client";

import { useMemo } from "react";

type Game = {
  tags?: string;
};

type Props = {
  games: Game[];
  activeTag: string | null;
  setActiveTag: (v: string | null) => void;
};

export default function GamesFilter({
  games,
  activeTag,
  setActiveTag,
}: Props) {
  const tags = useMemo(() => {
    const set = new Set<string>();
    games.forEach((g) =>
      g.tags?.split(",").forEach((t) => set.add(t.trim()))
    );
    return Array.from(set).sort();
  }, [games]);

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setActiveTag(null)}
        className={`px-3 py-1 rounded-full border ${
          !activeTag ? "bg-black text-white" : ""
        }`}
      >
        All
      </button>

      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => setActiveTag(tag)}
          className={`px-3 py-1 rounded-full border ${
            activeTag === tag ? "bg-black text-white" : ""
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
