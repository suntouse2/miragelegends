import getSupport from "@/services/supportService";
import { Order, Product } from "@prisma/client";

export async function orderHTML(order: Order) {
  const support = await getSupport();
  const product = order.productSnapshot as object as Product;
  const data = product.data as { amount: number; title: string };

  return `<!DOCTYPE html>
  <html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Заказ — Письмо</title>
    <style>
      /* Общие стили для почты. Используйте inline-стили в основном теле для совместимости, но оставлю базовые тут */
      body {
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        background-color: #f3f7fb;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        color: #222;
      }
      .wrapper {
        width: 100%;
        table-layout: fixed;
        background-color: #f3f7fb;
        padding: 24px 0;
      }
      .main {
        background: #ffffff;
        max-width: 600px;
        margin: 0 auto;
        border-radius: 6px;
        overflow: hidden;
      }
      .header {
        background: #eaf4ff;
        text-align: center;
        padding: 18px 20px;
        color: #1b3b66;
        font-weight: 600;
      }
      .content {
        padding: 22px;
      }
      .title {
        color: #7b0f86;
        font-size: 20px;
        font-weight: 700;
        margin: 0 0 8px;
      }
      .sub {
        color: #555;
        font-size: 14px;
        line-height: 1.45;
        margin: 0 0 18px;
      }
      .win-box {
        background: linear-gradient(180deg, #3f9bff 0%, #2e78d6 100%);
        border-radius: 8px;
        padding: 18px;
        color: #fff;
        text-align: left;
        margin-bottom: 18px;
      }
      .win-heading {
        font-weight: 700;
        font-size: 16px;
        margin: 0 0 8px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .win-desc {
        font-size: 13px;
        opacity: 0.95;
        margin: 0 0 12px;
      }
      .code {
        display: inline-block;
        background: rgba(255, 255, 255, 0.12);
        padding: 10px 14px;
        border-radius: 6px;
        font-weight: 700;
        letter-spacing: 1px;
        font-family: monospace;
      }
      .link {
        font-size: 13px;
        color: #eef6ff;
        text-decoration: underline;
      }
      .faq {
        background: #111217;
        color: #d6d6d6;
        padding: 22px;
        border-radius: 6px;
        font-size: 13px;
        line-height: 1.5;
      }
      .faq h4 {
        color: #fff;
        margin: 0 0 8px;
        font-size: 14px;
      }
      .faq p {
        margin: 0 0 12px;
      }
      .footer {
        padding: 14px 22px;
        font-size: 12px;
        color: #777;
        text-align: center;
      }
      a {
        color: #1a73e8;
        text-decoration: none;
      }
      @media screen and (max-width: 420px) {
        .content {
          padding: 16px;
        }
        .header {
          padding: 14px;
        }
        .win-box {
          padding: 14px;
        }
      }
    </style>
  </head>
  <body>
    <table
      role="presentation"
      class="wrapper"
      width="100%"
      cellpadding="0"
      cellspacing="0"
    >
      <tr>
        <td align="center">
          <table
            role="presentation"
            class="main"
            width="600"
            cellpadding="0"
            cellspacing="0"
          >
            <!-- Хедер -->
            <tr>
              <td
                class="header"
                style="
                  background: #e9f3ff;
                  text-align: center;
                  padding: 18px 20px;
                  color: #1b3b66;
                  font-weight: 600;
                "
              >
                Заказ №${order.id} на MirageLegends
              </td>
            </tr>

            <!-- Контент -->
            <tr>
              <td class="content" style="padding: 22px; background: #ffffff">
                <h1
                  class="title"
                  style="
                    margin: 0 0 8px;
                    color: #7b0f86;
                    font-size: 20px;
                    font-weight: 700;
                  "
                >
                  Ваш заказ №${order.id} успешно оформлен 🎉
                </h1>

                <p
                  class="sub"
                  style="
                    margin: 0 0 18px;
                    color: #555;
                    font-size: 14px;
                    line-height: 1.45;
                  "
                >
                  Спасибо, что выбрали MirageLegends!<br />
                  Доставка занимает от 15 минут до 12 часов
                </p>

                <div
                  class="win-box"
                  style="
                    background: linear-gradient(
                      180deg,
                      #4aa6ff 0%,
                      #2e78d6 100%
                    );
                    border-radius: 8px;
                    padding: 18px;
                    color: #fff;
                    margin-bottom: 18px;
                  "
                >
                 <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" valign="middle" width="38" height="38" style="background: rgba(255,255,255,0.12); border-radius:50%;">
      🎁
    </td>
    <td style="padding-left:8px; font-weight:700;">Кейс ${product.title}</td>
  </tr>
</table>

                  <p
                    class="win-desc"
                    style="margin: 0 0 12px; font-size: 13px; opacity: 0.95"
                  >
                    В купленном вами кейсе выпал случайный товар. Условия
                    получения приза регулируются Соглашением, которое считается
                    принятым в момент оформления заказа. Товар уже активирован и
                    передан по указанным в заказе данным.
                  </p>

                  <div style="text-align: center; margin-top: 6px">
                    <span
                      class="code"
                      style="
                        display: inline-block;
                        background: rgba(255, 255, 255, 0.12);
                        padding: 10px 14px;
                        border-radius: 6px;
                        font-weight: 700;
                        letter-spacing: 1px;
                        font-family: monospace;
                      "
                    >
                      ${data.title}
                    </span>
                  </div>
                </div>

                <!-- FAQ блок -->
                <div
                  class="faq"
                  style="
                    background: #0f1013;
                    color: #d6d6d6;
                    padding: 22px;
                    border-radius: 6px;
                    font-size: 13px;
                    line-height: 1.5;
                    margin-top: 6px;
                  "
                >
                  <h4 style="color: #fff; margin: 0 0 8px">FAQ</h4>

                  <strong
                    style="color: #fff; display: block; margin-bottom: 6px"
                    >Почему мне выпал другой товар?</strong
                  >
                  <p style="margin: 0 0 12px">
                    Каждый товар на сайте является кейсом, который содержит
                    набор возможных призов. При покупке товара выигрыш
                    определяется случайным образом. Вы не покупаете конкретный
                    товар, а получаете доступ к «коробке с сюрпризом», где
                    результат всегда заранее неизвестен. Поэтому выпадение и
                    желаемого предмета не гарантируется, и результат нельзя
                    изменить или оспорить.
                  </p>

                  <strong
                    style="color: #fff; display: block; margin-bottom: 6px"
                    >На сайте четко было указано про валюту/аккаунт</strong
                  >
                  <p style="margin: 0 0 12px">
                    Описание товаров на сайте носит информационный характер о
                    лучшем выигрыше из кейса и не является публичной офертой. Об
                    этом есть информация на каждой карточке товара. Перед
                    оплатой вы подтверждаете согласие с условиями
                    Пользовательского соглашения, где указано, что результат
                    открытия кейса определяется случайным образом.
                  </p>

                  <strong
                    style="color: #fff; display: block; margin-bottom: 6px"
                    >Могу ли я вернуть деньги за открытый кейс?</strong
                  >
                  <p style="margin: 0 0 12px">
                    Нет. Все покупки являются окончательными, так как содержимое
                    кейса определяется случайным образом. Возврат средств
                    возможен только в случае технической ошибки. В таком случае
                    свяжитесь с нашей поддержкой.
                  </p>

                  <strong
                    style="color: #fff; display: block; margin-bottom: 6px"
                    >Могу ли я обменять выпавший товар?</strong
                  >
                  <p style="margin: 0 0 12px">
                    Нет. Выпавший приз фиксируется системой автоматически и
                    обмену не подлежит.
                  </p>

                  <p style="margin: 12px 0 0; color: #9aa0a6; font-size: 12px">
                    Это письмо сформировано автоматически. Пожалуйста, не
                    отвечайте на него — ответы на данный адрес не
                    обрабатываются. По всем вопросам обращайтесь в службу
                    поддержки.
                  </p>
                </div>
              </td>
            </tr>

            <!-- Футер -->
            <tr>
              <td
                class="footer"
                style="
                  padding: 14px 22px;
                  font-size: 12px;
                  color: #8a8f94;
                  text-align: center;
                  background: #ffffff;
                "
              >
                <a href="${support}">Поддержка</a> |
                <a href="https://miragelegends.shop/user-agreement"
                  >Пользовательское соглашение</a
                ><br />
                MirageLegends © 2024 — 2025
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
