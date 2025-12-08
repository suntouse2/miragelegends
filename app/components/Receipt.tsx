"use client";

import {
  Game,
  GameCredentials,
  Product,
  ProductCategory,
} from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { Loader2, ReceiptText } from "lucide-react";
import Link from "next/link";
import Checkbox from "../ui/Checkbox";

type Props = {
  game: Game;
  credentials: GameCredentials[];
  product: Product | null;
  category: ProductCategory | null;
};

type GameCredentialsState = GameCredentials & { value: string };

export default function Receipt({
  game,
  credentials,
  category,
  product,
}: Props) {
  const credentialsWithValue = [
    ...credentials.map((c) => ({ ...c, value: "" })),
  ];

  const [emailCredential, setEmailCredential] = useState<string>("");

  const [userCredentials, setUserCredentials] =
    useState<GameCredentialsState[]>(credentialsWithValue);

  const [checked, setChecked] = useState(true);

  const updateCredential = (id: number, value: string) => {
    setUserCredentials((prev) =>
      prev.map((c) => (c.id === id ? { ...c, value } : c))
    );
  };

  const [loading, setLoading] = useState<boolean>(false);

  if (product === null || category === null) return null;

  const pay = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post<{ redirect: string; isTg: boolean }>(
        "/api/orders",
        {
          productId: product.id,
          paymentMethod: "card",
          userCredentials: userCredentials,
          email: emailCredential,
        }
      );

      window.location.href = data.redirect;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const message = err.response?.data?.message || "Неизвестная ошибка";
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full pb-10">
      <p className="flex mb-2 items-center gap-1 text-sm font-semibold text-white/60">
        Чекоут <ReceiptText size={16} />
      </p>
      <div className="flex bg-bg border border-white/10 p-3 items-center gap-4 mb-3 rounded-xl">
        <div className="relative bg-bg  rounded-xl w-[60px] h-[60px] border border-white/10 shadow-sm flex-shrink-0">
          <Image
            src={product.imageSrc ?? ""}
            alt={product.title}
            fill
            className="object-contain  p-2"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-sm text-white/60">{game.title}</p>
          <p className="flex gap-1 items-center text-md mt-1 font-semibold text-white">
            Кейс {product.title}
            <Image
              src={category.coinSrc}
              alt={category.title}
              width={20}
              height={25}
            />
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-4">
        {userCredentials.map((c) => (
          <label key={c.id} className="flex flex-col">
            <span className="flex text-white/60 items-center gap-1  ml-1 mb-1 text-[14px]  font-semibold">
              {c.label}
            </span>

            <Input
              type="text"
              regexp={c.regexp}
              required
              value={c.value}
              onChange={(e) => updateCredential(c.id, e.target.value)}
              className="h-[40px] px-4 rounded-xl border border-white/10 text-sm bg-white/5 font-montserrat transition-all duration-200"
              placeholder={c.placeholder}
            />
          </label>
        ))}
        <label className="flex flex-col">
          <span className="flex text-white/60 items-center gap-1  ml-1 mb-1 text-[14px]  font-semibold">
            Ваша почта
          </span>

          <Input
            type="email"
            required
            value={emailCredential}
            onChange={(e) => setEmailCredential(e.target.value)}
            className="h-[40px] px-4 rounded-xl border border-white/10 text-sm bg-white/5 font-montserrat transition-all duration-200"
            placeholder={"Введите вашу почту"}
          />

          <p className="w-full p-2 py-3 bg-accent-800/50 text-accent-200 text-xs rounded-md mt-4 border-accent-200 font-montserrat">
            Пожалуйста, укажите верный адрес электронной почты. Мы отправим на
            него чек
          </p>
        </label>
      </div>

      <div className="font-montserrat px-2 pb-2">
        <h3 className="text-base font-semibold text-white/70 mb-3">
          Сумма заказа
        </h3>
        <div className="flex justify-between mb-1 text-sm text-white/90">
          <span>Сумма покупки</span>
          <span>{product.price.toLocaleString()} ₽</span>
        </div>
        <div className="flex justify-between mb-1 text-sm text-white/60">
          <span>Комиссия платежной системы</span>
          <span>0%</span>
        </div>

        <hr className="my-2 border-white/10" />
        <div className="flex justify-between text-lg font-bold text-white">
          <span>К оплате</span>
          <span>{product.price.toLocaleString()} ₽</span>
        </div>
      </div>
      <div className="flex items-start gap-2 text-xs font-inter px-2 py-2">
        <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
        <p className="!font-montserrat font-semibold">
          Я согласен с условиями{" "}
          <Link className="!text-accent-100" href="/user-agreement">
            пользовательским соглашением
          </Link>
        </p>
      </div>
      <Button
        onClick={pay}
        disabled={loading || !checked}
        className={"w-full h-[50px]  bg-accent-200! text-black"}
      >
        {loading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          "Перейти к оплате"
        )}
      </Button>
    </div>
  );
}
