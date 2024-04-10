import { log } from "console";
import { initialData } from "./seed";
import prisma from "../lib/prisma";
import { countries } from "./seed-countries";

async function main() {
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();
  const { categories, products, users } = initialData;

  await prisma.country.createMany({
    data: countries,
  });

  await prisma.user.createMany({
    data: users,
  });

  await prisma.category.createMany({
    data: categories.map((category) => ({
      name: category,
    })),
  });
  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce(
    (map, category) => {
      map[category.name.toLowerCase()] = category.id;
      return map;
    },
    {} as Record<string, string>,
  );

  products.forEach(async ({ images, type, ...product }) => {
    const dbProduct = await prisma.product.create({
      data: {
        ...product,
        categoryId: categoriesMap[type],
      },
    });

    await prisma.productImage.createMany({
      data: images.map((image) => ({
        url: image,
        productId: dbProduct.id,
      })),
    });
  });
  log("Seed executed successfully");
}

(() => {
  if (process.env.NODE_ENV === "production") {
    log("Cannot run seed command on production!");
    return;
  }
  main();
})();
