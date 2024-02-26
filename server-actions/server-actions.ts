"use server";
import { prisma } from "@/lib/prisma";

import { cookies, headers } from 'next/headers';
import { getServerSession as originalGetServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 

export const getServerSession = async () => {
  const req = {
    headers: Object.fromEntries(headers() as Headers),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((c) => [c.name, c.value]),
    ),
  };
  const res = { getHeader() {}, setCookie() {}, setHeader() {} };

  // @ts-ignore - The type used in next-auth for the req object doesn't match, but it still works 
  const session = await originalGetServerSession(req, res, authOptions);
  return session;
};

export const addItem = async (formData: FormData) => {
  const session = await getServerSession();
  const userEmail = session?.user?.email ?? "";
  console.log(session)

  const user = await prisma.user.findUnique({ where: { email: userEmail } });
  const category = formData.get("category") as string;
  const item = formData.get("name") as string;

  const dbCategory = await prisma.category.findFirst({ where: { name: category } });
  if (!dbCategory && user) {
    const newCategory = await prisma.category.create({ data: { name: category } });
    const newCategoriesOnUsers = await prisma.categoriesOnUsers.create({
      data:{
        categoryId: newCategory.id,
        userId: user.id
      }
    })
    console.log({...newCategoriesOnUsers})
  }
};