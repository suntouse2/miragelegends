"use client";

import Link from "next/link";
import { User } from "@prisma/client";
import { fetcher } from "@/lib/fetcher";
import NameAvatar from "../ui/NameAvatar";
import useISWR from "swr/immutable";
export default function AuthClient() {
  const { data: user } = useISWR<User | null>("/api/users/me", fetcher);

  if (!user) return null;

  return (
    <>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <NameAvatar
            photo_url={user.photo_url}
            first_name={user.first_name ?? ""}
            last_name={user.last_name ?? ""}
          />
        </div>
      </div>
    </>
  );
}
