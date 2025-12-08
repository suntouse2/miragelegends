"use client";

import Image from "next/image";
import Link from "next/link";

export default function Slider() {
  return (
    <div className="w-full">
      <Link href={"/receipt?productId=cmhkodcd40007crx5e070iqva"}>
        <Image
          src={"/pp.png"}
          alt={`poster`}
          width={2000}
          height={2000}
          className="w-full rounded-3xl h-auto object-cover"
          priority
        />
      </Link>
    </div>
  );
}
