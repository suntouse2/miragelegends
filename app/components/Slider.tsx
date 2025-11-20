"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";

export default function Slider() {
  const slides = ["/poster1-2.png"];

  return (
    <div className="w-full">
      <Splide
        options={{
          type: "loop",
          perPage: 1,
          autoplay: true,
          interval: 4000,
          arrows: true,
          pagination: true,
        }}
        className="w-full"
      >
        {slides.map((src, i) => (
          <SplideSlide key={i}>
            <Image
              src={src}
              alt={`poster-${i + 1}`}
              width={1920}
              height={600}
              className="w-full rounded-3xl h-auto object-cover"
              priority
            />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
