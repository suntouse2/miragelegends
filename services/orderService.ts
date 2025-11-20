import prisma from "@/lib/prisma";
import { OrderStatus, Prisma } from "@prisma/client";
import { User } from "@telegram-apps/init-data-node";

type CreateOrderType = {
  userId?: User["id"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  productSnapshot: Record<string, any>;
  userCredentials: { key: string; label: string; value: string | number }[];
  email: string;
};

export const orderService = {
  async getUserOrders(id: User["id"]) {
    return prisma.order.findMany({
      where: { userId: id },
      orderBy: { createdAt: "desc" },
    });
  },
  async createOrder(
    input: CreateOrderType,
    client: Prisma.TransactionClient = prisma
  ) {
    const order = await client.order.create({ data: { ...input } });
    return order;
  },

  async updateMail(id: number, mailId: string) {
    return prisma.order.update({ where: { id }, data: { mailId } });
  },
  async updateStatus(id: number, status: OrderStatus) {
    return prisma.order.update({ where: { id }, data: { status } });
  },
  async getOrder(id: number) {
    return prisma.order.findUnique({
      where: {
        id,
      },
    });
  },
};
