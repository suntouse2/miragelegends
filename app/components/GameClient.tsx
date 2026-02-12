"use client";

import {
  Game,
  GameCredentials,
  Product,
  ProductCategory,
} from "@prisma/client";
import { useRouter } from "next/navigation";
import ProductItem from "./ProductItem";

type Props = {
  game: Game;
  products: Product[];
  categories: ProductCategory[];
  credentials: GameCredentials[];
};

export default function GameClient({ products, categories }: Props) {
  const router = useRouter();

  const receipt = (p: Product) => {
    router.push(`/receipt?productId=${p.id}`);
  };
  return (
    <>
      <section className="z-10 tablet:flex pb-20 gap-8">
        <div>
          {categories.map((c) => (
            <div key={c.id}>
              <ul className="grid mt-6 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-y-6 gap-x-4">
                {products
                  .filter((p) => p.categoryId == c.id)
                  .map((p) => (
                    <li key={p.id}>
                      <ProductItem product={p} category={c} onClick={receipt} />
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
