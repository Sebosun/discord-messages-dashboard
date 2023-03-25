import { PrismaClient } from "@prisma/client";

type BodyType = {
  userId: undefined | string;
  allMessagesId: undefined | number;
};

const prisma = new PrismaClient();
/**
 * Accepts a H3Event and returns a Promise of MessagesType
 * @async
 * @param {H3Event} event
 * @returns {Promise<MessagesType>}
 * Should have userId and allMessagesId in event.body
 */
export default defineEventHandler(async (event) => {
  //  read events body in H3Event
  const body: BodyType = await readBody(event);

  if (!("userId" in body) || !("allMessagesId" in body)) {
    // return error code when params are wrong
    throw createError({
      statusCode: 400,
      statusMessage: "Missing body elements",
    });
  }

  if (
    typeof body.userId !== "string" ||
    typeof body.allMessagesId !== "number"
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing body elements",
    });
  }

  const data = await prisma.likes.findMany({
    where: {
      user_id: body.userId,
      all_messagesId: body.allMessagesId,
    },
  });

  // if there's no like on the post
  if (!data || data.length === 0) {
    try {
      const data = await prisma.likes.create({
        data: {
          user_id: body.userId,
          all_messagesId: body.allMessagesId,
        },
      });
      return data;
    } catch (e) {
      return e;
    }
  }
  // if theres like on the post
  else if (data.length > 0) {
    try {
      const data = await prisma.likes.deleteMany({
        where: {
          user_id: body.userId,
          all_messagesId: body.allMessagesId,
        },
      });
      return data;
    } catch (e) {
      return e;
    }
  }
  return data;
});
