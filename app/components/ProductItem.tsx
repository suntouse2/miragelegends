"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Product, ProductCategory } from "@prisma/client";
import Button from "../ui/Button";

type Props = {
  product: Product;
  category: ProductCategory;
  onClick: (p: Product) => void;
};

export default function ProductItem({ product, onClick }: Props) {
  return (
    <motion.div className="relative">
      <div
        onClick={() => onClick(product)}
        className={
          "group cursor-pointer relative  w-full p-2 aspect-square flex justify-center items-center rounded-3xl  transition-all"
        }
      >
        <div className="absolute inset-0 rounded-3xl pointer-events-none border text-pink-400"></div>
        <div className="absolute left-1 -top-[6.5px] z-2">
          {/* <Image src={"/snow.svg"} alt="snow" width={140} height={140} /> */}
        </div>
        <div className="absolute right-[-5px] -bottom-2 z-2">
          {/* <Image
            src={"/snow.svg"}
            alt="snow"
            className="scale-[0.9]"
            width={140}
            height={140}
          /> */}
        </div>
        <Image
          priority
          src={product.imageSrc ?? ""}
          className="transition-transform scale-110 group-hover:scale-125"
          width={150}
          height={150}
          alt={product.title}
        />
      </div>
      <h3 className="flex gap-1 mt-3 items-center font-bold text-[18px]">
        {product.title}
        <Image width={40} height={40} alt="UC" src="/coins/diamond.webp" />
        <span className="hidden md:flex bg-pink-400 text-black px-2 rounded-sm font-bold text-sm">
          -70%
        </span>
      </h3>

      <div className="flex gap-2 items-center">
        <span className="font-bold text-[16px]">{product.price}₽</span>

        <span className="font-bold text-white/50 text-[14px] line-through">
          {(product.price / 0.3).toFixed()}₽
        </span>
      </div>
      <span className="inline md:hidden bg-pink-200 text-black px-2 rounded-sm font-bold text-sm">
        Скидка 70%
      </span>
      <Button
        onClick={() => onClick(product)}
        className="w-full mt-2 bg-pink-300! text-black"
      >
        Купить
      </Button>
    </motion.div>
  );
}
