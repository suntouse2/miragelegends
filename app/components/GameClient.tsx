"use client";

import {
  Game,
  GameCredentials,
  Product,
  ProductCategory,
} from "@prisma/client";
import { useState } from "react";
import ProductItem from "./ProductItem";
import Tooltip from "../ui/Tooltip";
import Receipt from "./Receipt";
import { useRouter } from "next/navigation";

type Props = {
  game: Game;
  products: Product[];
  categories: ProductCategory[];
  credentials: GameCredentials[];
};

export default function GameClient({
  game,
  products,
  categories,
  credentials,
}: Props) {
  const router = useRouter();

  const [activeProduct] = useState<Product | null>(null);
  const activeCategory =
    categories.find((c) => c.id == activeProduct?.categoryId) ?? null;

  const [receiptState, setReceiptState] = useState<boolean>(false);

  const hideReceipt = () => setReceiptState(false);

  const receipt = (p: Product) => {
    router.push(`/receipt?productId=${p.id}`);
  };

  return (
    <section className="tablet:flex pb-20 gap-8">
      <div>
        {categories.map((c) => (
          <div key={c.id}>
            <ul className="grid mt-6 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-y-6 gap-x-4">
              {products
                .filter((p) => p.categoryId == c.id)
                .map((p) => (
                  <li key={p.id}>
                    <ProductItem
                      product={p}
                      category={c}
                      isActive={activeProduct?.id === p.id}
                      onClick={receipt}
                    />
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      <Tooltip
        closeOutside={true}
        showClose={false}
        onClose={hideReceipt}
        className="!bg-bg/80 border w-full !left-0 !right-0 md:!left-auto !bottom-0"
        open={receiptState}
      >
        <Receipt
          game={game}
          category={activeCategory}
          credentials={credentials}
          product={activeProduct}
        />
      </Tooltip>
    </section>
  );
}
