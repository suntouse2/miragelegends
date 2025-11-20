import { OrderStatus } from "@prisma/client";

const TG_USER = "podddopzona";

function buildTelegramUrl(username: string, text: string) {
  return `https://t.me/${username}?text=${encodeURIComponent(text)}`;
}

const TIMEOUT = 15000;

export const paymentService = {
  timeout: TIMEOUT,

  async getPaymentUrl(
    orderId: string,
    amount: number,
    description: string
  ): Promise<{ id: string; redirect: string | null }> {
    const message = `Хочу оплатить товар: ${description}. Выдайте реквизиты на сумму = ${amount} рублей`;
    const tgUrl = buildTelegramUrl(TG_USER, message);

    return {
      id: orderId,
      redirect: tgUrl,
    };
  },
  async parseCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    req: Request
  ): Promise<null | {
    id: string | number;
    status: OrderStatus;
    uuid?: string;
  }> {
    return null;
  },
};
