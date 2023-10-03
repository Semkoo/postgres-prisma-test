// import { PrismaClient } from "@prisma/client";

// const { env } = await import("../src/env.mjs");

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const prismaORM =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     log:
//       env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
//   });

// if (env.NODE_ENV !== "production") globalForPrisma.prisma = prismaORM;

// import { PrismaClient } from "@prisma/client";
// import { env } from "process";

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// const prismaORM = global.prisma || new PrismaClient();

// if (env.NODE_ENV === "development") global.prisma = prismaORM;

// export default prismaORM;

import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient({
      log: ["query", "info", "warn"],
    });
  }
  prisma = global.cachedPrisma;
}

export default prisma;
