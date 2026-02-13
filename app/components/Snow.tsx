"use client";

import { PropsWithChildren } from "react";
import Snowfall from "react-snowfall";

export default function SnowWrapper({ children }: PropsWithChildren) {
  return (
    <>
      <Snowfall
        color="white"
        snowflakeCount={30}
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
