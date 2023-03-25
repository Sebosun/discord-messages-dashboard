import { PrismaClient } from "@prisma/client";
import { H3Event } from "h3";

const prisma = new PrismaClient();

type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;

type FetchType = ReturnType<typeof handleFetchMessages>;

export type MessagesType = Flatten<Awaited<FetchType>>;

const handleFetchMessages = async (event: H3Event) => {
  const query = getQuery(event);

  if (!("page" in query)) {
    throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
  }

  const selectedUserIds = ["302412159185321984", "1067784866135023698"];

  const prismaORArray = [];

  for (let i = 0; i < selectedUserIds.length; i++) {
    prismaORArray.push({ author_id: { equals: selectedUserIds[i] } });
  }

  const page = parseInt(query?.page as string);

  const data = await prisma.all_messages.findMany({
    take: 20,
    skip: page * 20,
    where: {
      AND: [
        {
          author_id: { in: [...selectedUserIds] },
        },
      ],
    },
    include: {
      likes: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return data;
};
export default defineEventHandler(handleFetchMessages);
