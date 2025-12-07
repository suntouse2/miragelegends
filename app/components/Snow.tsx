"use client";

import { PropsWithChildren } from "react";
import Snowfall from "react-snowfall";

export default function Snow({ children }: PropsWithChildren) {
  return (
    <div>
      <Snowfall />
      {children}
    </div>
  );
}
