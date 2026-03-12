"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import GamesFilter from "./GamesFilter";
import GamesPagination from "./GamesPagination";

type Game = {
  title: string;
  image: string;
  embed: string;
  tags?: string;
};

const ITEMS_PER_PAGE = 12;

export default function GamesClient({ games }: { games: Game[] }) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  // 🔹 Filter games
  const filteredGames = useMemo(() => {
    setPage(1); // reset page on filter/search change

    return games.filter((game) => {
      const matchesSearch = game.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesTag =
        !activeTag ||
        game.tags?.split(",").map(t => t.trim()).includes(activeTag); 
      return matchesSearch && matchesTag;
    });
  }, [games, search, activeTag]);

  // 🔹 Pagination logic
  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);

  const paginatedGames = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredGames.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredGames, page]);

  return (
    <div className="space-y-6">
      {/* 🔍 Search + Filters toggle */}
      <div className="flex gap-3 items-center">
        <input
          type="text"
          placeholder="Search games..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 border rounded-lg"
        />

        <button
          onClick={() => setShowFilters((v) => !v)}
          className="px-4 py-2 border rounded-lg"
        >
          Filters
        </button>
      </div>

      {/* 🏷️ Hidden Filters */}
      {showFilters && (
        <GamesFilter
          games={games}
          activeTag={activeTag}
          setActiveTag={setActiveTag}
        />
      )}

      {/* 🎮 Games Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {paginatedGames.map((game, index) => (
          <Link key={index} href={game.embed} target="_blank">
            <div className="border rounded-lg overflow-hidden hover:scale-105 transition cursor-pointer">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-2 text-center font-semibold">
                {game.title}
              </div>
            </div>
          </Link>
        ))}

        {paginatedGames.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No games found
          </p>
        )}
      </div>

      {/* 📄 Pagination */}
      <GamesPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}


