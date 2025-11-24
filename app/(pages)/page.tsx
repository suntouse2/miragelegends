import Container from "@/app/ui/Container";
import { gameService } from "@/services/gameService";
import { notFound } from "next/navigation";
import GameClient from "@/app/components/GameClient";
import Faq from "../components/Faq";
import Slider from "../components/Slider";

export const revalidate = false;

export default async function Page() {
  const game = await gameService.getGameBySlug("mobile-legends");
  if (!game) notFound();

  const categories = game.categories;
  const products = game.categories.flatMap((c) => c.products);
  const credentials = game.credentials;

  return (
    <Container>
      <Slider />
      <GameClient
        game={game}
        categories={categories}
        products={products}
        credentials={credentials}
      />
      <Faq />
    </Container>
  );
}
