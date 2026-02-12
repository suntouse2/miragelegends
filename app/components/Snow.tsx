"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import Snowfall from "react-snowfall";

export default function SnowWrapper({ children }: PropsWithChildren) {
  const [snowflakeImages, setSnowflakeImages] = useState<HTMLImageElement[]>(
    []
  );

  useEffect(() => {
    const snowflake = new Image();
    snowflake.src = "/heart.svg";

    snowflake.onload = () => {
      setSnowflakeImages([snowflake]);
    };
  }, []);

  return (
    <>
      <Snowfall
        images={snowflakeImages}
        color="white"
        snowflakeCount={10}
        radius={[5, 20]}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      {children}
    </>
  );
}
