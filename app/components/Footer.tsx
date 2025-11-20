"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer border-t border-white/10 mt-20 py-10 text-white/80">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="footer__top flex flex-col md:flex-row justify-between gap-8 md:gap-16 mb-10">
          <div className="footer__logo max-w-sm">
            <Image
              src="/logo.svg"
              width={140}
              height={40}
              alt="ElitePUBG"
              className="mb-3"
            />
            <p className="text-sm text-white/70 leading-relaxed">
              Лучшие цены на UC PUBG MOBILE. Моментальное зачисление по UID.
            </p>
          </div>

          <nav className="footer__nav flex flex-col md:flex-row md:items-center gap-3 md:gap-6 text-sm">
            <Link href="/" className="hover:text-white transition-colors">
              Главная
            </Link>
            <Link href="/#faq" className="hover:text-white transition-colors">
              FAQ
            </Link>
            <Link
              href="https://vk.me/managerpodderzhk"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Поддержка
            </Link>
          </nav>
        </div>

        <div className="footer__bottom flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/50 border-t border-white/5 pt-5">
          <div className="flex gap-4 flex-wrap justify-center md:justify-start">
            <Link
              href="/policy"
              className="hover:text-white/70 transition-colors"
            >
              Политика конфиденциальности
            </Link>
            <Link
              href="/user-agreement"
              className="hover:text-white/70 transition-colors"
            >
              Пользовательское соглашение
            </Link>
          </div>
          <span>© 2025 MirageLegends. Все права защищены.</span>
        </div>
      </div>
    </footer>
  );
}
