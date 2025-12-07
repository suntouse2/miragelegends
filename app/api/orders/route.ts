// import { getUserStateAction } from "@/app/actions/getUserStateAction";
// import { ApiError } from "@/app/error/ApiError";
import { withErrorHandling } from "@/lib/mapError";
// import { sendTgPayment } from "@/lib/sendTgPayment";
// import { gameService } from "@/services/gameService";
// import { orderService } from "@/services/orderService";
// import { paymentService } from "@/services/paymentService";
import { NextResponse } from "next/server";
// import z from "zod";

// const PostPaymentSchema = z.object({
//   productId: z.string(),
//   paymentMethod: z.string(),
//   userCredentials: z.array(
//     z.object({
//       key: z.string(),
//       label: z.string(),
//       value: z.union([z.string(), z.number()]),
//     })
//   ),
//   email: z.string().email(),
// });
export const POST = withErrorHandling(async () => {
  return NextResponse.json({ success: true });
  // const body = await req.json();
  // const { productId, userCredentials, email } =
  //   await PostPaymentSchema.parseAsync(body);
  // const user = await getUserStateAction();
  // const product = await gameService.getProduct(productId);
  // if (!product) throw ApiError.badRequest("Нет продукта с таким ID");
  // if (userCredentials.some((k) => k.value === "5386570054")) {
  //   return NextResponse.json({
  //     redirect: "https://donathub.store/no-payments",
  //     isTg: user ? true : false,
  //   });
  // }
  // const order = await orderService.createOrder({
  //   productSnapshot: product,
  //   userCredentials: userCredentials,
  //   userId: user?.id,
  //   email,
  // });
  // const { paymentUrl } = await paymentService.fetchPayUrl({
  //   orderId: order.id.toString(),
  //   amount: product.price,
  // });
  // if (user && user.id) {
  //   await sendTgPayment(Number(user.tgId), paymentUrl, order);
  // }
  // return NextResponse.json({
  //   redirect: paymentUrl,
  //   isTg: user ? true : false,
  // });
});
