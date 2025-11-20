"use client";

import { useState } from "react";
import Card from "../ui/Card";
import AuthClient from "./AuthClient";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Button from "../ui/Button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 15,
          duration: 0.5,
        }}
        className="fixed max-w-6xl z-[30] px-4 py-4 left-1/2 -translate-x-1/2 w-full"
      >
        <Card className="flex items-center justify-between !bg-bg/50 rounded-full px-4 py-1 shadow-none border-none lg:p-3 lg:px-8 backdrop-blur-md lg:mt-2 lg:rounded-full">
          <Link href={"/"}>
            <Image
              priority
              src={"/logo.svg"}
              width={160}
              height={40}
              alt="dhcoin"
            />
          </Link>

          <div className="hidden md:flex gap-2">
            <Button>
              <a href="#faq">FAQ</a>
            </Button>
            <Button>
              {" "}
              <a href="https://vk.me/managerpodderzhk">Поддержка</a>
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-1">
            <div className="flex md:hidden">
              <Button className="!border-none" onClick={() => setOpened(true)}>
                <Menu />
              </Button>
            </div>

            <AuthClient />
          </div>
        </Card>
      </motion.header>

      <AnimatePresence>
        {opened && (
          <>
            {/* затемнение фона */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[40]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpened(false)}
            />

            {/* сам sidebar */}
            <motion.div
              className="fixed top-0 right-0 h-full w-64 bg-bg backdrop-blur-xl border-l border-white/10 z-[41] flex flex-col p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 90, damping: 20 }}
            >
              <div className="flex justify-between items-center mb-6">
                <Image src="/logo.svg" width={100} height={20} alt="dhcoin" />
                <Button
                  className="!border-none"
                  onClick={() => setOpened(false)}
                >
                  <X />
                </Button>
              </div>

              <nav className="flex flex-col gap-3">
                <Button>
                  <Link href={"/#faq"}>FAQ</Link>
                </Button>
                <Button>
                  {" "}
                  <Link href={"https://vk.me/managerpodderzhk"}>Поддержка</Link>
                </Button>
              </nav>

              <div className="mt-auto pt-8">
                <AuthClient />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
