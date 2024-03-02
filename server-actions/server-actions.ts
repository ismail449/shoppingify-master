"use server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/getServerSession";
import { revalidatePath } from "next/cache";

export const addItem = async (previousState: any,formData: FormData) => {
  const session = await getServerSession();
  
  const userEmail = session?.user?.email;
  if(!userEmail){
    return { message: "user email not found" };
  }
  console.log(session)

  const user = await prisma.user.findUnique({ where: { email: userEmail } });
  if(!user){
    return { message: "user not found" };
  }
  const category = (formData.get("category") as string).toLocaleLowerCase();
  const item = (formData.get("name") as string).toLocaleLowerCase();
  const note = (formData.get("note") as string).toLocaleLowerCase();
  const imageUrl = (formData.get("image") as string).toLocaleLowerCase();


  let dbItem = await prisma.item.findUnique({where: { name: item }});
  let dbCategory = await prisma.category.findUnique({ where: { name: category } });

  if (!dbCategory && user) {
    const newCategory = await prisma.category.create({ data: { name: category } });
    await prisma.categoriesOnUsers.create({
      data:{
        categoryId: newCategory.id,
        userId: user.id
      }
    })
    dbCategory = await prisma.category.findUnique({ where: { name: category } });
  }
  if(!dbCategory?.id){
    return { message: "Error creating a new category" };
  }

  let dbCategoryOnUser = await prisma.categoriesOnUsers.findUnique({where: { userId_categoryId: {categoryId: dbCategory.id, userId: user.id} }});
  if(!dbCategoryOnUser){
    dbCategoryOnUser = await prisma.categoriesOnUsers.create({data: { categoryId: dbCategory.id, userId: user.id }});
  }
  
  if(!dbItem) {
    dbItem = await prisma.item.create({ data: { name: item, categoryId: dbCategory?.id, imageUrl, note } })
    revalidatePath("/")
    return { message: "Item added successfully" };
  }
  await prisma.item.update({where: {id: dbItem.id}, data: { categoryId: dbCategory?.id, imageUrl, note }})
  revalidatePath("/")
  return { message: "Item updated successfully" };

};