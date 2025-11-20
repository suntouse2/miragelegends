"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Product, ProductCategory } from "@prisma/client";
import { Check } from "lucide-react";
import Button from "../ui/Button";

type Props = {
  product: Product;
  category: ProductCategory;
  isActive: boolean;
  onClick: (p: Product) => void;
};

export default function ProductItem({
  product,
  category,
  isActive,
  onClick,
}: Props) {
  return (
    <div className="relative">
      <div
        onClick={() => onClick(product)}
        className={`w-full group cursor-pointer overflow-hidden p-2 border border-white/10 aspect-square bg-accent-200
        } rounded-3xl flex justify-center items-center ${
          isActive && "border border-bg"
        }`}
      >
        <Image
          priority
          src={product.imageSrc ?? ""}
          className="transition-transform group-hover:scale-110"
          width={150}
          height={150}
          alt={product.title}
        />
      </div>
      <span className="block mt-2 text-xs text-accent-100">
        Зачисление по UID
      </span>
      <h3 className="flex gap-1 mt-1 items-center font-semibold text-[18px]">
        {product.title}{" "}
        <Image width={40} height={40} alt="UC" src={"/coins/diamond.webp"} />
      </h3>
      <div className="flex gap-2 items-center">
        <span className="font-semibold text-[16px] ">{product.price}₽</span>
        <span className="font-semibold text-white/50 text-[14px] line-through ">
          {(product.price * 1.75).toFixed()}₽
        </span>
      </div>
      <Button
        className=" font-medium bg-white/2 w-full mt-2 transition-transform"
        onClick={() => onClick(product)}
      >
        Купить
      </Button>
    </div>
  );
}
