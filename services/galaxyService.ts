// galaxyService.ts

import crypto from "crypto";

const API_BASE = "https://en.galaxylink.gg/api";
const CLIENT_ID = Number(process.env.GALAXY_CLIENT_ID);
const API_KEY = process.env.GALAXY_API_KEY!;

let tokenCache: { token: string; expires: number } | null = null;

async function getToken(): Promise<string> {
  const now = Date.now() / 1000;
  if (tokenCache && tokenCache.expires > now + 60) return tokenCache.token;

  const timestamp = Math.floor(now);
  const sign = crypto
    .createHash("sha256")
    .update(API_KEY + timestamp)
    .digest("hex");

  const res = await fetch(`${API_BASE}/v1/apilogin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ client_id: CLIENT_ID, timestamp, sign }),
  });

  const data = await res.json();
  if (data.retval !== 0 || !data.token)
    throw new Error(`Auth failed: ${data.desc}`);

  const expires = Math.floor(new Date(data.valid_thru).getTime() / 1000);
  tokenCache = { token: data.token, expires };
  console.log(tokenCache);

  return data.token;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function request(path: string, payload: any): Promise<any> {
  const token = await getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": token,
    },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (json.status === "failed" || json.retval === -1)
    throw new Error(`${json.message || json.desc || "API Error"}`);
  return json.data || json;
}

// ------------------- API METHODS -------------------

export const galaxyService = {
  /** Получить новый токен вручную */
  async login() {
    return await getToken();
  },

  /** Получить детали заказа */
  async getOrderDetail(order_id: number | string) {
    return await request("/v1/orders/detail", { order_id });
  },

  /** Создать заказ */
  async createOrder(params: {
    category: number;
    product_id: number | string;
    quantity: number;
    user_id: string;
    user_field: string;
    server_id?: string;
    server_field?: string;
    partner_order_id: string;
  }) {
    return await request("/v1/orders/create", params);
  },

  /** Получить заказ по partner_order_id */
  async getPartnerOrder(partner_order_id: string) {
    return await request("/v1/orders/partner_detail", { partner_order_id });
  },

  /** Получить список продуктов по категории */
  async getProductList(category_id: number) {
    return await request("/v1/products/list", { category_id });
  },

  /** Получить детали продукта (вариации, поля) */
  async getProductInfo(product_id: number) {
    return await request("/v1/products/info", { product_id });
  },

  /** Получить список серверов продукта */
  async getProductServers(product_id: number) {
    return await request("/v1/products/servers", { product_id });
  },

  /** Проверить валидность пользователя / аккаунта */
  async validateProduct(params: {
    product_id: number;
    user_field: string;
    user_id: string;
    server_field?: string;
    server_id?: string;
  }) {
    return await request("/v1/products/validate", params);
  },
};

export default galaxyService;
