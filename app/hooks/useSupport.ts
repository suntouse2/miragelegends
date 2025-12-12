import getSupport from "@/services/supportService";
import { useEffect, useState } from "react";

let cachedSupport: string | null = null;

export default function useSupport() {
  const [support, setSupport] = useState<string | null>(cachedSupport);

  useEffect(() => {
    if (cachedSupport) return;

    getSupport().then((url) => {
      cachedSupport = url;
      setSupport(url);
    });
  }, []);

  return { support };
}
