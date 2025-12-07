"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Product, ProductCategory } from "@prisma/client";
import Button from "../ui/Button";

type Props = {
  product: Product;
  category: ProductCategory;
  isActive: boolean;
  onClick: (p: Product) => void;
};

export default function ProductItem({ product, isActive, onClick }: Props) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div
        onClick={() => onClick(product)}
        className={`
    group cursor-pointer relative 
    w-full p-2 aspect-square flex justify-center items-center rounded-3xl 
  transition-all
    ${isActive ? "shadow-[0_0_20px_rgba(255,0,0,0.4)]" : ""}
  `}
      >
        <div className="absolute inset-0 rounded-3xl pointer-events-none candy-border"></div>

        <Image
          priority
          src={product.imageSrc ?? ""}
          className="transition-transform scale-110 group-hover:scale-125"
          width={150}
          height={150}
          alt={product.title}
        />
      </div>

      {/* Лёгкие снежинки в углах */}

      <span className="block mt-2 text-xs text-accent-100">
        Зачисление по ID
      </span>

      <h3 className="flex gap-1 mt-1 items-center font-semibold text-[18px]">
        {product.title}
        <Image width={40} height={40} alt="UC" src="/coins/diamond.webp" />
      </h3>

      <div className="flex gap-2 items-center">
        <span className="font-semibold text-[16px]">{product.price}₽</span>
        <span className="font-semibold text-white/50 text-[14px] line-through">
          {(product.price * 1.75).toFixed()}₽
        </span>
      </div>

      <Button
        className="font-medium z-2 bg-white/10 w-full mt-1 !py-1 transition-all hover:bg-white/20 hover:scale-[1.02]"
        onClick={() => onClick(product)}
      >
        Купить
      </Button>
    </motion.div>
  );
}
