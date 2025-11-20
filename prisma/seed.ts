import { PrismaClient } from "@prisma/client";
import { games } from "./seeds/games.json";
const prisma = new PrismaClient();

(async () => {
  try {
    await prisma.$transaction([
      prisma.gameCredentials.deleteMany(),
      prisma.product.deleteMany(),
      prisma.productCategory.deleteMany(),
      prisma.game.deleteMany(),
    ]);

    await Promise.all(
      games.map(({ categories, credentials, ...game }, index) =>
        prisma.game.create({
          data: {
            ...game,
            sort: index,
            credentials: {
              create: credentials,
            },
            categories: {
              create: categories.map((c) => ({
                ...c,
                products: { create: c.products },
              })),
            },
          },
        })
      )
    );
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
})();
