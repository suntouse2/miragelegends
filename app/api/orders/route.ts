import { ApiError } from "@/app/error/ApiError";
import { withErrorHandling } from "@/lib/mapError";
import { gameService } from "@/services/gameService";
import { orderService } from "@/services/orderService";
import { paymentService } from "@/services/paymentService";
import { NextResponse } from "next/server";
import z from "zod";

const PostPaymentSchema = z.object({
  productId: z.string(),
  paymentMethod: z.string(),
  userCredentials: z.array(
    z.object({
      key: z.string(),
      label: z.string(),
      value: z.union([z.string(), z.number()]),
    })
  ),
  email: z.string().email(),
});
export const POST = withErrorHandling(async (req) => {
  const body = await req.json();
  const { productId, userCredentials, email } =
    await PostPaymentSchema.parseAsync(body);

  const product = await gameService.getProduct(productId);
  if (!product) throw ApiError.badRequest("Нет продукта с таким ID");

  const order = await orderService.createOrder({
    productSnapshot: product,
    userCredentials: userCredentials,
    email,
  });

  const { url } = await paymentService.fetchPayment({
    orderId: order.id.toString(),
    amount: product.price,
  });

  return NextResponse.json({
    redirect: url,
  });
});
