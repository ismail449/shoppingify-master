"use server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/getServerSession";
import { revalidatePath } from "next/cache";
import { signOut } from "next-auth/react";

const getUser = async () => {
  const session = await getServerSession();

  const userEmail = session?.user?.email;
  if (!userEmail) {
    await signOut();
    return;
  }

  const user = await prisma.user.findUnique({ where: { email: userEmail } });
  if (!user) {
    await signOut();
    return;
  }
  return user;
};

export const addItem = async (previousState: any, formData: FormData) => {
  const user = await getUser();
  if (!user) {
    return { message: "User is not found", isError: true };
  }
  const category = (formData.get("category") as string).toLocaleLowerCase();
  const item = (formData.get("name") as string).toLocaleLowerCase();
  const note = (formData.get("note") as string).toLocaleLowerCase();
  const imageUrl = (formData.get("image") as string).toLocaleLowerCase();

  let dbItem = await prisma.item.findUnique({ where: { name: item } });
  let dbCategory = await prisma.category.findUnique({
    where: { name: category },
  });

  if (!dbCategory && user) {
    const newCategory = await prisma.category.create({
      data: { name: category },
    });
    await prisma.categoriesOnUsers.create({
      data: {
        categoryId: newCategory.id,
        userId: user.id,
      },
    });
    dbCategory = await prisma.category.findUnique({
      where: { name: category },
    });
  }
  if (!dbCategory?.id) {
    return { message: "Error creating a new category", isError: true };
  }

  let dbCategoryOnUser = await prisma.categoriesOnUsers.findUnique({
    where: {
      userId_categoryId: { categoryId: dbCategory.id, userId: user.id },
    },
  });
  if (!dbCategoryOnUser) {
    dbCategoryOnUser = await prisma.categoriesOnUsers.create({
      data: { categoryId: dbCategory.id, userId: user.id },
    });
  }

  if (!dbItem) {
    dbItem = await prisma.item.create({
      data: { name: item, categoryId: dbCategory?.id, imageUrl, note },
    });
    revalidatePath("/");
    return { message: "Item added successfully", isError: false };
  }
  await prisma.item.update({
    where: { id: dbItem.id },
    data: { categoryId: dbCategory?.id, imageUrl, note },
  });
  revalidatePath("/");
  return { message: "Item updated successfully", isError: false };
};

export const getUserCategories = async () => {
  const user = await getUser();
  if (!user) {
    return;
  }
  const categoriesOnUsers = await prisma.categoriesOnUsers.findMany({
    where: { userId: user.id },
  });
  const categoriesIds = categoriesOnUsers.map((categoriyOnUser) => {
    return categoriyOnUser.categoryId;
  });
  const categories = (
    await prisma.category.findMany({ where: { id: { in: categoriesIds } } })
  ).map((category) => {
    return category.name;
  });
  return categories;
};
