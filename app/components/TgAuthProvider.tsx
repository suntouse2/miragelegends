"use client";

import { useEffect, useState, ReactNode } from "react";
import { ApiError } from "../error/ApiError";
import toast from "react-hot-toast";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useWebApp } from "../hooks/useWebApp";

export function TgAuthProvider({ children }: { children: ReactNode }) {
  const webApp = useWebApp();
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    if (!webApp) return;

    const init = async () => {
      try {
        webApp.expand();
        if (!webApp.initData) return;
        await axios.post("/api/auth", { initData: webApp.initData });

        setLoadingState(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        const message = err?.response?.data?.message || err?.message;
        toast.error(message ?? "Ошибка авторизации");
      } finally {
        setLoadingState(true);
      }
    };

    init();
  }, [webApp]);

  if (!loadingState) {
    return (
      <div className="w-dvw h-dvh flex flex-col items-center justify-center gap-2">
        <Image
          src="/logo.svg"
          className="animate-scale"
          width={200}
          height={20}
          alt="dhcoin"
        />
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return <>{children}</>;
}
