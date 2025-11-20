import { ZodError } from "zod";
import { ApiError } from "@/app/error/ApiError";
import { NextRequest, NextResponse } from "next/server";

type HttpErr = { status: number; body: Record<string, unknown> };

export function mapError(err: unknown): HttpErr {
  if (err instanceof ApiError) {
    console.log(err.message);
    const message = typeof err.message === "string" ? err.message : "Error";
    return { status: err.status, body: { message } };
  }
  if (err instanceof ZodError) {
    console.log(err.errors);
    return {
      status: 400,
      body: {
        message: "Неправильные данные",
        issues: err.errors.map((e) => ({ path: e.path, message: e.message })),
      },
    };
  }
  console.log(err);
  return { status: 500, body: { message: "Internal Server Error" } };
}

export function withErrorHandling<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  H extends (req: NextRequest, ctx?: any) => Promise<Response> | Response
>(handler: H) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (req: NextRequest, ctx?: any) => {
    try {
      return await handler(req, ctx);
    } catch (err) {
      const { status, body } = mapError(err);
      return NextResponse.json(body, { status });
    }
  };
}
