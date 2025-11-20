"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowBigDown, ArrowDown, ChevronRight, MoveRight } from "lucide-react";

const faqData = [
  {
    q: "🛒 Как работает покупка?",
    a: "После оплаты вы получите UC по ID. Вводите ID, подтверждаете оплату и получаете UC на свой аккаунт.",
  },
  {
    q: "⏳ Сколько времени занимает доставка UC?",
    a: "Ожидание составляет до 1 часа, при сбоях в серверах PUBG — до 24 часов.",
  },
  {
    q: "💸 Как оформить заказ?",
    a: "Выбери номинал UC, введи игровой ID, подтверди оплату.",
  },
  {
    q: "📩 Где проверить статус заказа?",
    a: "После оплаты UC приходят в течение 10 минут.",
  },
  {
    q: "😭 Не открывается страница оплаты. Что делать?",
    a: "Попробуй другой браузер или отключи блокировку всплывающих окон, потом повтори оплату или выбери другой способ оплаты.",
  },
  {
    q: "💰 Где найти игровой ID?",
    a: "Открой PUBG Mobile и нажми на аватарку в правом верхнем углу — Player ID под ником.",
  },
  {
    q: "⏰ Почему заказ может задержаться?",
    a: "Иногда бывают сбои в игровых серверах. Если UC не пришли за 24 часа — обратись в поддержку.",
  },
  {
    q: "🔄 Возможен ли возврат средств?",
    a: "Да, через 24 часа, если заказ не подтвердился. Пиши в поддержку для возврата.",
  },
  {
    q: "🎁 Можно ли купить UC со скидкой?",
    a: "Подпишись на наш Telegram-канал, участвуй в конкурсах и лови промокоды.",
  },
  {
    q: "🌟 Безопасно ли покупать UC на DONATHUB?",
    a: "Да, используем официальные методы. Никаких данных аккаунта — только Player ID.",
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
