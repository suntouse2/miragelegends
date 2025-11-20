import { Bot, Context, InlineKeyboard, session, SessionFlavor } from "grammy";
import { conversations, ConversationFlavor } from "@grammyjs/conversations";
import { gameService } from "@/services/gameService";

// --- Обновленный интерфейс сессии ---
interface SessionData {
  productId: string;
  // userId: number; // Больше не нужен, так как храним его в поле 'id'
  awaiting: "none" | "id" | "email"; // Новое поле для отслеживания текущего шага
  tempId: number | null; // Временное хранилище для полученного ID
}
// ------------------------------------

export type MyContext = Context &
  SessionFlavor<SessionData> &
  ConversationFlavor<Context & SessionFlavor<SessionData>>;

const bot = new Bot<MyContext>(process.env.TELEGRAM_BOT_TOKEN!);

bot.use(
  // Обновлена функция initial для нового интерфейса
  session({
    initial: (): SessionData => ({
      productId: "",
      awaiting: "none",
      tempId: null,
    }),
  })
);
bot.use(conversations());

// --- старт ---
bot.command("start", async (ctx) => {
  // Сброс состояния при старте
  ctx.session = { productId: "", awaiting: "none", tempId: null };
  const kb = new InlineKeyboard()
    .text("🎮 Товары PUBG Mobile", "tovari")
    .row()
    .text("ℹ️ Инфо", "info");

  await ctx.replyWithPhoto("https://i.ibb.co/dsgdgmxS/Screenshot-1-1.png", {
    caption: "👋 Добро пожаловать! Выберите действие:",
    parse_mode: "Markdown",
    reply_markup: kb,
  });
});

bot.callbackQuery("start", async (ctx) => {
  // Сброс состояния при старте
  ctx.session = { productId: "", awaiting: "none", tempId: null };
  await ctx.answerCallbackQuery();
  const kb = new InlineKeyboard()
    .text("🎮 Товары PUBG Mobile", "tovari")
    .row()
    .text("ℹ️ Инфо", "info");

  await ctx.replyWithPhoto("https://i.ibb.co/dsgdgmxS/Screenshot-1-1.png", {
    caption: "👋 Добро пожаловать! Выберите действие:",
    parse_mode: "Markdown",
    reply_markup: kb,
  });
});

// --- инфо ---
bot.callbackQuery("info", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("ℹ️ Здесь будет информация о магазине.", {
    reply_markup: new InlineKeyboard().text("⬅️ Назад", "start"),
  });
});

// --- товары ---
bot.callbackQuery("tovari", async (ctx) => {
  await ctx.answerCallbackQuery();
  const game = await gameService.getGameBySlug("pubg-mobile");
  if (!game) return ctx.reply("Ошибка: игра не найдена.");

  const kb = new InlineKeyboard();
  let counter = 0;

  game.categories.forEach((cat) => {
    cat.products.forEach((p) => {
      kb.text(`${p.title} UC - ${p.price} ₽`, `product-${p.id}`);
      counter++;
      if (counter % 2 === 0) kb.row();
    });
  });

  kb.row().text("⬅️ Назад", "start");

  await ctx.editMessageCaption({
    caption: "Выберите нужное количество UC: 👇",
    reply_markup: kb,
  });
});

// --- выбор продукта ---
bot.on("callback_query:data", async (ctx) => {
  const data = ctx.callbackQuery.data;
  if (!data.startsWith("product-")) return;

  const productId = data.replace("product-", "");

  // Устанавливаем продукт и переводим в состояние ожидания ID
  ctx.session.productId = productId;
  ctx.session.awaiting = "id";
  ctx.session.tempId = null; // Сброс на всякий случай

  await ctx.answerCallbackQuery();
  await ctx.reply("✍️ Введите ваш **игровой ID** (только цифры):", {
    parse_mode: "Markdown",
  });
});

// --- ввод ID, Email и создание заказа (Единый обработчик) ---
bot.on("message:text", async (ctx) => {
  const text = ctx.message.text.trim();

  // --- ШАГ 1: Ожидание игрового ID ---
  if (ctx.session.awaiting === "id" && ctx.session.productId) {
    const idNum = Number(text);
    if (Number.isNaN(idNum) || idNum < 1) {
      return ctx.reply("⚠️ Введите корректный числовой ID. Повторите ввод.");
    }

    // Сохраняем ID и переходим к ожиданию Email
    ctx.session.tempId = idNum;
    ctx.session.awaiting = "email";

    return ctx.reply(
      "📧 Отлично! Теперь введите ваш **Email** для получения чека:",
      {
        parse_mode: "Markdown",
      }
    );
  }

  // --- ШАГ 2: Ожидание Email и создание заказа ---
  else if (
    ctx.session.awaiting === "email" &&
    ctx.session.productId &&
    ctx.session.tempId !== null
  ) {
    const email = text;
    // Простая проверка email
    if (!email.includes("@") || email.length < 5) {
      return ctx.reply("⚠️ Введите корректный Email. Повторите ввод.");
    }

    const productId = ctx.session.productId;
    const idNum = ctx.session.tempId;
    const product = await gameService.getProduct(productId);

    // Сброс сессии перед выполнением запроса (чтобы избежать повторной обработки)
    ctx.session = { productId: "", awaiting: "none", tempId: null };

    if (!product) return ctx.reply("❌ Продукт не найден. Начните сначала.");

    try {
      await ctx.reply("⏳ Создаю заказ, подождите...");

      // Создание заказа через API
      const res = await fetch(`https://donathub.store/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: productId,
          paymentMethod: "sbp",
          // Передаем полученный ID
          userCredentials: [{ key: "id", label: "Игровой ID", value: idNum }],
          // Передаем полученный Email
          email: email,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Order creation error:", text);
        return ctx.reply("❌ Ошибка при создании заказа. Попробуйте позже.");
      }

      const data = await res.json();
      if (!data.redirect) {
        return ctx.reply("❌ Не удалось получить ссылку на оплату.");
      }

      const payKeyboard = new InlineKeyboard().url(
        "💳 Перейти к оплате",
        data.redirect
      );

      await ctx.reply(
        `✅ **Заказ создан!**\n\n📦 **Продукт:** ${product.title} UC\n💰 **Сумма:** ${product.price} ₽\n\n**Ваш Email:** ${email}\n**Ваш ID:** ${idNum}\n\nНажмите ниже, чтобы оплатить:`,
        { reply_markup: payKeyboard, parse_mode: "Markdown" }
      );
    } catch (e) {
      console.error("Order API error:", e);
      await ctx.reply("⚠️ Ошибка соединения с сервером. Попробуйте позже.");
    }
  }

  // Если сообщение не соответствует ни одному из ожидаемых состояний
  else if (ctx.session.awaiting === "none") {
    // Игнорировать, если не в процессе заказа.
  }
});

// --- обработка ошибок ---
bot.catch((err) => console.error("Bot error2:", err));

bot.start();
