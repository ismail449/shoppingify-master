import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import { Category } from "@prisma/client";

const findCategoryByName = (name: string, categories: Category[]) => {
  return categories.find((category) => category.name === name);
};

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],

  events: {
    signIn: async ({ user, isNewUser }) => {
      if (!isNewUser) return;

      const defaultCategories = [
        {
          name: "meat & fish",
        },
        {
          name: "grains and bread",
        },
        {
          name: "tinned & dried produce",
        },
        {
          name: "condiments",
        },
        {
          name: "dairy & eggs",
        },
        {
          name: "oil & fat",
        },
      ];
      const newCategories = await prisma.category.createManyAndReturn({
        data: defaultCategories,
      });
      console.log(user.id);
      const newCategoriesOnUsers = await prisma.categoriesOnUsers.createMany({
        data: newCategories.map((category) => {
          return {
            categoryId: category.id,
            userId: user.id,
          };
        }),
      });
      const defaultItems = [
        {
          name: "chicken",
          imageUrl:
            "https://images.unsplash.com/photo-1604503468506-a8da13d82791",
          note: 'Chicken is the most common type of poultry in the world. Owing to the relative ease and low cost of raising chickens—in comparison to mammals such as cattle or hogs—chicken meat (commonly called just "chicken") and chicken eggs have become prevalent in numerous cuisines.',
          categoryName: "meat & fish",
          userId: user.id,
          categoryId: findCategoryByName("meat & fish", newCategories)?.id!,
        },
        {
          name: "red meat",
          imageUrl:
            "https://images.unsplash.com/photo-1700481158997-60ff09259f24",
          note: "In gastronomy, red meat is commonly red when raw (and a dark color after it is cooked), in contrast to white meat, which is pale in color before (and after) cooking.",
          categoryName: "meat & fish",
          userId: user.id,
          categoryId: findCategoryByName("meat & fish", newCategories)?.id!,
        },
        {
          name: "tuna",
          imageUrl:
            "https://images.unsplash.com/photo-1648431529663-8ae9606630c0",
          note: "A tuna is a saltwater fish that belongs to the tribe Thunnini, a subgrouping of the Scombridae (mackerel) family.",
          categoryName: "meat & fish",
          userId: user.id,
          categoryId: findCategoryByName("meat & fish", newCategories)?.id!,
        },
        {
          name: "salmon",
          imageUrl:
            "https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c",
          note: "Salmon is the common name for several commercially important species of euryhaline ray-finned fish from the genera Salmo and Oncorhynchus of the family Salmonidae, native to tributaries of the North Atlantic (Salmo) and North Pacific (Oncorhynchus) basins.",
          categoryName: "meat & fish",
          userId: user.id,
          categoryId: findCategoryByName("meat & fish", newCategories)?.id!,
        },
        {
          name: "mackerel",
          imageUrl:
            "https://images.unsplash.com/photo-1567087978459-8a8eeac7bc75",
          note: "Mackerel is a common name applied to a number of different species of pelagic fish, mostly from the family Scombridae. They are found in both temperate and tropical seas, mostly living along the coast or offshore in the oceanic environment.",
          categoryName: "meat & fish",
          userId: user.id,
          categoryId: findCategoryByName("meat & fish", newCategories)?.id!,
        },

        {
          name: "pasta",
          imageUrl:
            "https://images.unsplash.com/photo-1669295889162-8b64f3d1aed7",
          note: "Pasta is a type of food typically made from an unleavened dough of wheat flour mixed with water or eggs, and formed into sheets or other shapes, then cooked by boiling or baking.",
          categoryName: "grains and bread",
          userId: user.id,
          categoryId: findCategoryByName("grains and bread", newCategories)
            ?.id!,
        },
        {
          name: "rice",
          imageUrl:
            "https://images.unsplash.com/photo-1586201375761-83865001e31c",
          note: "Rice is a cereal grain and in its domesticated form is the staple food of over half of the world's population, particularly in Asia and Africa.",
          categoryName: "grains and bread",
          userId: user.id,
          categoryId: findCategoryByName("grains and bread", newCategories)
            ?.id!,
        },
        {
          name: "bread",
          imageUrl:
            "https://images.unsplash.com/photo-1509440159596-0249088772ff",
          note: "Bread is a staple food prepared from a dough of flour (usually wheat) and water, usually by baking.",
          categoryName: "grains and bread",
          userId: user.id,
          categoryId: findCategoryByName("grains and bread", newCategories)
            ?.id!,
        },
        {
          name: "flour",
          imageUrl:
            "https://images.unsplash.com/photo-1714842981153-ffeaf74e7a1a",
          note: "Flour is a powder made by grinding raw grains, roots, beans, nuts, or seeds. Flours are used to make many different foods.",
          categoryName: "grains and bread",
          userId: user.id,
          categoryId: findCategoryByName("grains and bread", newCategories)
            ?.id!,
        },
        {
          name: "breakfast cereal",
          imageUrl:
            "https://images.unsplash.com/photo-1457386335663-6115e304bd29",
          note: "Breakfast cereal is a breakfast food made from processed cereal grains. It is traditionally eaten as part of breakfast, or a snack food, primarily in Western societies.",
          categoryName: "grains and bread",
          userId: user.id,
          categoryId: findCategoryByName("grains and bread", newCategories)
            ?.id!,
        },

        {
          name: "white beans",
          imageUrl:
            "https://images.unsplash.com/photo-1635843095815-7c85a923e734",
          note: "white pea bean, or pea bean is a variety of the common bean (Phaseolus vulgaris) native to the Americas, where it was first domesticated.",
          categoryName: "tinned & dried produce",
          userId: user.id,
          categoryId: findCategoryByName(
            "tinned & dried produce",
            newCategories
          )?.id!,
        },
        {
          name: "lentils",
          imageUrl:
            "https://images.unsplash.com/photo-1614373532201-c40b993f0013",
          note: "The lentil (Vicia lens or Lens culinaris) is an edible legume. It is an annual plant known for its lens-shaped seeds.",
          categoryName: "tinned & dried produce",
          userId: user.id,
          categoryId: findCategoryByName(
            "tinned & dried produce",
            newCategories
          )?.id!,
        },
        {
          name: "canned tomatoes",
          imageUrl:
            "https://images.unsplash.com/photo-1693168045052-6089942872df",
          note: 'Canned tomatoes are available in several different forms. The traditional forms are whole peeled tomatoes, packed in juice or purée, and ground tomatoes, sometimes referred to as "kitchen-ready." Ground tomatoes are not to be confused with purée, which is similar but more cooked.',
          categoryName: "tinned & dried produce",
          userId: user.id,
          categoryId: findCategoryByName(
            "tinned & dried produce",
            newCategories
          )?.id!,
        },

        {
          name: "salt",
          imageUrl:
            "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c",
          note: "In common usage, salt is a mineral composed primarily of sodium chloride (NaCl). When used in food, especially in granulated form, it is more formally called table salt.",
          categoryName: "condiments",
          userId: user.id,
          categoryId: findCategoryByName("condiments", newCategories)?.id!,
        },
        {
          name: "black pepper",
          imageUrl:
            "https://images.unsplash.com/photo-1509358740172-f77c168f6312",
          note: "Black pepper (Piper nigrum) is a flowering vine in the family Piperaceae, cultivated for its fruit (the peppercorn), which is usually dried and used as a spice and seasoning.",
          categoryName: "condiments",
          userId: user.id,
          categoryId: findCategoryByName("condiments", newCategories)?.id!,
        },
        {
          name: "sugar",
          imageUrl:
            "https://images.freeimages.com/images/large-previews/f0f/sugar-1323772.jpg",
          note: "White sugar is a refined form of sucrose. In the body, compound sugars are hydrolysed into simple sugars.",
          categoryName: "condiments",
          userId: user.id,
          categoryId: findCategoryByName("condiments", newCategories)?.id!,
        },
        {
          name: "basil",
          imageUrl:
            "https://images.unsplash.com/photo-1610970884954-4d376ecba53f",
          note: "Basil, also called great basil, is a culinary herb of the family Lamiaceae (mints).",
          categoryName: "condiments",
          userId: user.id,
          categoryId: findCategoryByName("condiments", newCategories)?.id!,
        },
        {
          name: "cumin",
          imageUrl:
            "https://images.unsplash.com/photo-1600791102844-208e695205f6",
          note: "Cumin is a flowering plant in the family Apiaceae, native to the Irano-Turanian Region.",
          categoryName: "condiments",
          userId: user.id,
          categoryId: findCategoryByName("condiments", newCategories)?.id!,
        },

        {
          name: "milk",
          imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150",
          note: "Milk is a white liquid food produced by the mammary glands of mammals.",
          categoryName: "dairy & eggs",
          userId: user.id,
          categoryId: findCategoryByName("dairy & eggs", newCategories)?.id!,
        },
        {
          name: "eggs",
          imageUrl:
            "https://images.unsplash.com/photo-1477506410535-f12fe9af97cc",
          note: "Humans and their hominid relatives have consumed eggs for millions of years. The most widely consumed eggs are those of fowl, especially chickens.",
          categoryName: "dairy & eggs",
          userId: user.id,
          categoryId: findCategoryByName("dairy & eggs", newCategories)?.id!,
        },
        {
          name: "cheese",
          imageUrl:
            "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d",
          note: "Cheese is a dairy product produced in a range of flavors, textures, and forms by coagulation of the milk protein casein.",
          categoryName: "dairy & eggs",
          userId: user.id,
          categoryId: findCategoryByName("dairy & eggs", newCategories)?.id!,
        },
        {
          name: "yogurt",
          imageUrl:
            "https://images.unsplash.com/photo-1641196936589-7df4db18de66",
          note: "Yogurt is a food produced by bacterial fermentation of milk.",
          categoryName: "dairy & eggs",
          userId: user.id,
          categoryId: findCategoryByName("dairy & eggs", newCategories)?.id!,
        },

        {
          name: "cooking oil",
          imageUrl:
            "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
          note: "Cooking oil (also known as edible oil) is a plant or animal liquid fat used in frying, baking, and other types of cooking.",
          categoryName: "oil & fat",
          userId: user.id,
          categoryId: findCategoryByName("oil & fat", newCategories)?.id!,
        },

        {
          name: "butter",
          imageUrl:
            "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d",
          note: "Butter is a dairy product made from the fat and protein components of churned cream. It is a semi-solid emulsion at room temperature, consisting of approximately 80% butterfat.",
          categoryName: "oil & fat",
          userId: user.id,
          categoryId: findCategoryByName("oil & fat", newCategories)?.id!,
        },
      ];
      await prisma.item.createMany({
        data: defaultItems,
      });
    },
  },
};

export default NextAuth(authOptions);
