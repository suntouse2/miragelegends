"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  href: string;
};

export default function Slider({ href }: Props) {
  return (
    <div className="w-full">
      <Link href={href}>
        <Image
          src={"/ml.png"}
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
