import { Order } from "@prisma/client";
import axios from "axios";

export async function sendTgPayment(tgId: number, url: string, order: Order) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const apiUrl = `https://api.telegram.org/bot${token}/sendMessage`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const snapshot: any = order.productSnapshot;

  const game = snapshot?.category?.game?.title;
  const title = snapshot?.title ?? "Товар";
  const price = snapshot?.price ?? "—";
  const email = order.email;

  console.log(email);

  const caption = [
    "🧾 *Чек на оплату*",
    "",
    `📦 _Товар:_ *${game ? game + " " : ""}${title}*`,
    `💵 _Сумма:_ *${price}₽*`,
    `📧 _Почта:_ *${email}*`,
    "",
    "Нажмите кнопку ниже, чтобы завершить оплату 👇",
  ].join("\n");

  const { data } = await axios.post(apiUrl, {
    chat_id: tgId,
    text: caption,
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [[{ text: "💳 Оплатить", url }]],
    },
  });
}
