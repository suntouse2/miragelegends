type PaymentPayload = {
  orderId: string;
  amount: number;
};

export const paymentService = {
  async fetchPayment({ orderId, amount }: PaymentPayload) {
    const url = new URL("https://360payments.biz/gateway");

    url.search = new URLSearchParams({
      projectId: "2",
      amount: String(amount),
      orderId,
      domain: "miragelegends.store",
      description: "Оплата доната",
    }).toString();

    return { url: url.toString() };
  },

  async fetchPayUrl({ orderId, amount }: PaymentPayload) {
    const response = await fetch("https://core.donathub.store/api/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId: 4,
        methodId: 20,
        amount,
        description: "Оплата доната",
        orderId,
        domain: "donathub.store",
      }),
    });

    if (!response.ok) throw new Error("Failed to create payment");

    const data = await response.json();
    return {
      paymentId: data.paymentId,
      paymentUrl: data.paymentUrl,
    };
  },
};
