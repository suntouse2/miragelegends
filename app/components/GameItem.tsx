import Image from "next/image";
import Link from "next/link";
import { Game } from "@prisma/client";

type Props = {
  game: Game;
  index: number;
};

export default function GameItem({ game }: Props) {
  return (
    <div>
      <Link href={`/${game.slug}`}>
        <div className="relative overflow-hidden group">
          <div className="relative h-[200px] rounded-xl overflow-hidden">
            <Image
              src={game.imageSrc ?? ""}
              fill
              quality={50}
              priority
              className="w-full object-center transform object-cover transition-transform duration-300 h-full group-hover:scale-110"
              alt={game.title}
            />
          </div>
          <span className="block font-montserrat text-sm mt-2 font-semibold">
            {game.title}
          </span>
        </div>
      </Link>
    </div>
  );
}
