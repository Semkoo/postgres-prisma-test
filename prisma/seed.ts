import prismaORM from "../src/prismaORM";

async function main() {
  const response = await Promise.all([
    prismaORM.user.upsert({
      where: { email: "rauchg@vercel.com" },
      update: {},
      create: {
        name: "Guillermo Rauch",
        email: "rauchg@vercel.com",
        image:
          "https://pbs.twimg.com/profile_images/1576257734810312704/ucxb4lHy_400x400.jpg",
      },
    }),
    prismaORM.user.upsert({
      where: { email: "lee@vercel.com" },
      update: {},
      create: {
        name: "Lee Robinson",
        email: "lee@vercel.com",
        image:
          "https://pbs.twimg.com/profile_images/1587647097670467584/adWRdqQ6_400x400.jpg",
      },
    }),
    await prismaORM.user.upsert({
      where: { email: "stey@vercel.com" },
      update: {},
      create: {
        name: "Steven Tey",
        email: "stey@vercel.com",
        image:
          "https://pbs.twimg.com/profile_images/1506792347840888834/dS-r50Je_400x400.jpg",
      },
    }),
  ]);
  console.log(response);
}
main()
  .then(async () => {
    await prismaORM.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaORM.$disconnect();
    process.exit(1);
  });
