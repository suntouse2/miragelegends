type PaymentPayload = {
  orderId: string;
  amount: number;
};

export const paymentService = {
  async fetchPayUrl({ orderId, amount }: PaymentPayload) {
    const response = await fetch("https://360payments.biz/api/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId: 7,
        methodId: 23,
        amount,
        description: "Оплата доната",
        orderId,
        domain: "miragelegends.shop",
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
