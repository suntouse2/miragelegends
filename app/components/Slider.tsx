"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import Link from "next/link";

export default function Slider() {
  const slides = ["/poster1.png"];

  return (
    <div className="w-full">
      <Link href={"/receipt?productId=cmhkodcd40007crx5e070iqva"}>
        <Image
          src={"/poster1.png"}
          alt={`poster`}
          width={1920}
          height={600}
          className="w-full rounded-3xl h-auto object-cover"
          priority
        />
      </Link>
    </div>
  );
}
