import Image from "next/image";

export default function Logo() {
  return (
    <picture>
      <source
        srcSet="/dropzone.svg"
        width={150}
        height={31}
        media="(min-width: 768px)"
      />
      <Image
        src="/dz.svg"
        priority
        width={40}
        height={27}
        alt="MirageLegends"
      />
    </picture>
  );
}
