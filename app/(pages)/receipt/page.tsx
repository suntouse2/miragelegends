import Receipt from "@/app/components/Receipt";
import Container from "@/app/ui/Container";
import { gameService } from "@/services/gameService";
import { notFound } from "next/navigation";

export default async function ReceiptPage({
  searchParams,
}: {
  searchParams?: Promise<{ productId?: string }>;
}) {
  const params = await searchParams; // дождись Promise
  const productId = params?.productId;

  if (!productId) return notFound();

  const product = await gameService.getProduct(productId);
  if (!product) return notFound();

  const game = await gameService.getGameBySlug(product.category.game.slug);
  if (!game) return notFound();

  return (
    <Container className="max-w-xl!">
      <Receipt
        product={product}
        category={product.category}
        game={game}
        credentials={game.credentials}
      />
    </Container>
  );
}
