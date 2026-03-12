async function getGames() {
  const res = await fetch(
    "https://www.onlinegames.io/media/plugins/genGames/embed.json",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch games");
  }

  return res.json();
}

export default async function GamePage({
  params,
}: {
  params: { id: string };
}) {

  const games = await getGames();
  const index = Number(params.id);
  const game = games[index];

  if (!game) {
    return <div className="p-6">Game not found</div>;
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">{game.title}</h1>

      <div className="aspect-video w-full rounded overflow-hidden">
        <iframe
          src={game.embed}
          className="w-full h-full border-0"
          allowFullScreen
        />
      </div>
    </main>
  );
}


