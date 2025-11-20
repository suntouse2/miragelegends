"use client";

import {
  Game,
  GameCredentials,
  Product,
  ProductCategory,
} from "@prisma/client";
import { useCallback, useState } from "react";
import BackButton from "./BackButton";
import { redirect, useRouter } from "next/navigation";
import ProductItem from "./ProductItem";
import Tooltip from "../ui/Tooltip";
import Receipt from "./Receipt";
import MiniReceipt from "./MiniReceipt";

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

  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const activeCategory =
    categories.find((c) => c.id == activeProduct?.categoryId) ?? null;

  const clearActiveProduct = () => setActiveProduct(null);

  const [receiptState, setReceiptState] = useState<boolean>(false);
  const showReceipt = () => setReceiptState(true);
  const hideReceipt = () => setReceiptState(false);

  const receipt = (p: Product) => {
    redirect(`/receipt?productId=${p.id}`);
  };

  const backAction = useCallback(() => {
    if (receiptState) return hideReceipt();
    if (activeProduct) return clearActiveProduct();

    router.back();
  }, [activeProduct, router, receiptState]);

  return (
    <section className="tablet:flex pb-20 gap-8">
      <BackButton onClick={backAction} />
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
