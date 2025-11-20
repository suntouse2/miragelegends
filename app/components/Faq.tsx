"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowBigDown, ArrowDown, ChevronRight, MoveRight } from "lucide-react";

const faqData = [
  {
    q: "🛒 Как работает покупка?",
    a: "После оплаты вы получите Алмазы по вашему Player ID. Вводите ID, подтверждаете оплату и получаете Алмазы на свой аккаунт.",
  },
  {
    q: "⏳ Сколько времени занимает доставка Алмазы?",
    a: "В среднем пополнение занимает 1–10 минут. В редких случаях при сбоях MLBB — до 24 часов.",
  },
  {
    q: "💸 Как оформить заказ?",
    a: "Выберите количество Алмазы, укажите игровой ID и Zone ID, подтвердите оплату.",
  },
  {
    q: "📩 Где проверить статус заказа?",
    a: "После оплаты Алмазы автоматически приходят на ваш аккаунт. Если задержка — подождите до 10 минут.",
  },
  {
    q: "😭 Не открывается страница оплаты. Что делать?",
    a: "Попробуйте другой браузер или отключите блокировку всплывающих окон. Если проблема остаётся — выберите другой метод оплаты.",
  },
  {
    q: "💰 Где найти Player ID и Zone ID?",
    a: "В Mobile Legends откройте аватар в левом верхнем углу. Player ID и Zone ID указаны в профиле.",
  },
  {
    q: "⏰ Почему заказ может задержаться?",
    a: "Иногда сервера Mobile Legends работают нестабильно. Если Алмазы не пришли в течение 24 часов — напишите в поддержку.",
  },
  {
    q: "🔄 Возможен ли возврат средств?",
    a: "Да. Если Алмазы не были доставлены в течение 24 часов, оформим возврат. Обратитесь в поддержку Mirage Legends.",
  },
  {
    q: "🎁 Можно ли получить скидку?",
    a: "Подпишитесь на наш Telegram-канал Mirage Legends, участвуйте в розыгрышах и получайте промокоды.",
  },
  {
    q: "🌟 Безопасно ли покупать в Mirage Legends?",
    a: "Да. Мы используем официальные и безопасные методы, никаких данных аккаунта не требуется — только Player ID и Zone ID.",
  },
];

export default function Faq() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="faq" className="faq mx-auto px-4 py-16">
      <h2 className="faq__title text-3xl font-bold text-center mb-10">
        Часто задаваемые вопросы
      </h2>
      <ul className="faq__questions space-y-3">
        {faqData.map((item, i) => {
          const isOpen = active === i;
          return (
            <li
              key={i}
              className="faq__question border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm bg-white/5"
            >
              <button
                className="faq__question-title flex justify-between items-center w-full text-left p-4 text-lg font-medium select-none"
                onClick={() => setActive(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <motion.div
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronRight />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="faq__question-content overflow-hidden"
                  >
                    <div className="p-4 pt-0 text-base text-white/80">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
