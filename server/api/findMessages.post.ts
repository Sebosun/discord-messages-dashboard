import { H3Event } from "h3";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handleFetchMessages = async (event: H3Event) => {
  const query = getQuery(event);

  if (!("text" in query)) {
    throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
  }

  const selectedUserIds = ["302412159185321984", "1067784866135023698"];

  const prismaORArray = [];

  for (let i = 0; i < selectedUserIds.length; i++) {
    prismaORArray.push({ author_id: { equals: selectedUserIds[i] } });
  }

  const searchTerm = query?.text as string;

  const result = await prisma.all_messages.findMany({
    where: {
      AND: [
        {
          author_id: { in: [...selectedUserIds] },
        },
        {
          message: {
            search: searchTerm,
          },
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

  return result;
};

export default defineEventHandler(handleFetchMessages);
