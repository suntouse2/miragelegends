import { ApiError } from "@/app/error/ApiError";
import { orderHTML } from "@/app/templates/caseOpenedHTML";
import { tovarHTML } from "@/app/templates/tovarHTML";
import { withErrorHandling } from "@/lib/mapError";
import galaxyService from "@/services/galaxyService";
import { mailService } from "@/services/mailService";
import { orderService } from "@/services/orderService";
import { Product } from "@prisma/client";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import z from "zod";
const CallbackSchema = z.object({
  orderId: z.coerce.number(),
});

const B2BOrderSchema = z.object({
  category: z.number(),
  product_id: z.union([z.number(), z.string()]),
  quantity: z.number(),
  user_id: z.string(),
  user_field: z.string(),
  server_id: z.string().optional(),
  server_field: z.string().optional(),
  partner_order_id: z.coerce.string(),
});

const CALLBACK_SECRET = process.env.CALLBACK_SECRET;

if (!CALLBACK_SECRET) throw Error(".env missing a key CALLBACK_SECRET");

export const POST = withErrorHandling(async (req) => {
  const body = await req.json();
  const secret = z
    .string()
    .nonempty()
    .parse(req.nextUrl.searchParams.get("secret"));

  if (secret !== CALLBACK_SECRET) throw ApiError.unauthorized("Invalid secret");

  const { orderId } = CallbackSchema.parse(body);
  const order = await orderService.getOrder(orderId);

  if (!order) throw ApiError.badRequest("No order found with this id");

  if (!order.userCredentials)
    throw ApiError.badRequest("No user credentials provided");

  if (order.status === "PAID")
    throw ApiError.badRequest("Order is already payed");

  const product = order.productSnapshot as object as Product;

  const credentials = order.userCredentials as { key: string; value: string }[];

  const creds = Object.fromEntries(
    credentials.map(({ key, value }) => [key, value])
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const product_data: any = product.data;

  const galaxy_payload = B2BOrderSchema.parse({
    ...product_data,
    ...creds,
    partner_order_id: nanoid(64),
  });

  await orderService.updateStatus(order.id, "PAID");

  await galaxyService.createOrder(galaxy_payload);

  await orderService.updateStatus(order.id, "DONE");

  const mail = await mailService.sendMail(
    order.email,
    `MirageLegends | Заказ ${order.id}`,
    product.title === "60" ? await tovarHTML(order) : await orderHTML(order)
  );

  await orderService.updateMail(order.id, mail.messageId);

  return NextResponse.json({ success: true });
});
