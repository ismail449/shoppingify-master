"use server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/getServerSession";



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