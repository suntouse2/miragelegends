import Container from "@/app/ui/Container";
import { gameService } from "@/services/gameService";
import { notFound } from "next/navigation";
import GameClient from "@/app/components/GameClient";
import Image from "next/image";

export const revalidate = false;

export async function generateStaticParams() {
  const games = await gameService.getGames();
  return games.map((g) => ({
    slug: g.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = await gameService.getGameBySlug(slug);
  if (!game) notFound();

  const categories = game.categories;
  const products = game.categories.flatMap((c) => c.products);
  const credentials = game.credentials;

  return (
    <Container>
      <div className="flex flex-col md:flex-row font-montserrat gap-4 py-5">
        <div className="flex  items-center md:items-start gap-2 ">
          <div className="relative w-20 h-20 overflow-hidden bg-gray-300 rounded-lg">
            <Image
              src={game.imageSrc ?? ""}
              alt={game.title}
              fill
              className=" shadow-md object-cover"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">
              {game.title}
            </h1>
            <p className="hidden md:block text-sm sm:text-md max-w-[600px] text-white/50 font-semibold">
              {game.description}
            </p>
          </div>
        </div>
        <p className="md:hidden text-sm sm:text-md max-w-[600px] text-white/50 font-semibold">
          {game.description}
        </p>
      </div>
      <GameClient
        game={game}
        categories={categories}
        products={products}
        credentials={credentials}
      />
    </Container>
  );
}
