<script setup lang="ts">
import { isObject } from "lodash-es";
import type { MessagesType } from "@/server/api/messages.post";

const props = defineProps<{ item: MessagesType }>();

const intlHandle = (date: Date) => {
  const formattedDate = new Intl.DateTimeFormat("pl-PL", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(date);
  return formattedDate;
};

type EmojiObject = {
  name: string;
  url: string;
};

// public supabase url that stores emojis
const emojiUrl = (serverId: string, emojiId: string): string => {
  return `https://tscnafqarcvagetigfpi.supabase.co/storage/v1/object/public/emojis/${serverId}/${emojiId}`;
};

const constructEmojiUrl = (
  discordTag: string,
  serverId: string
): EmojiObject => {
  const emojiRegex = /<:(\w+):(\d+)>/;
  const parsedEmoji = discordTag.match(emojiRegex);

  if (!parsedEmoji || !parsedEmoji.length) {
    return { name: "", url: "" };
  }

  return { name: parsedEmoji[1], url: emojiUrl(serverId, parsedEmoji[2]) };
};

const globalStringEmojiRegex = /<:(\w+):(\d+)>/g;

const parseMessage = (text: string) => {
  const splitEmojis = /(<:\w+:\d+>)/g;
  const messageSplit = text.split(splitEmojis);

  return messageSplit;
};

const user = useSupabaseUser();
// two states cause we dont know if particular
// message will be liked by our current user
const isLikedByUser = ref<-1 | 1 | 0>(0);
const hasBeenLikedByUser = computed(() => {
  return (
    props.item.likes.filter((item) => item.user_id === user.value?.id).length >
    0
  );
});

const shouldDisplayLikeItStyle = computed(() => {
  const hasBeenModified =
    isLikedByUser.value === 0 || isLikedByUser.value === 1;
  return (
    (hasBeenLikedByUser.value && hasBeenModified) || isLikedByUser.value === 1
  );
});

const handleSubmit = async () => {
  let userId = user.value?.id;
  if (!user.value) {
    const { login } = useAnonLogin();
    const { data } = await login();

    if (!data) return;

    userId = data.user?.id;
  }

  /* insert an item into likes supabase storage */
  /* const { data, error } = await client.from("likes").insert(likeObj).single(); */
  const data = await $fetch("/api/addLike", {
    method: "POST",
    body: {
      allMessagesId: props.item.id,
      userId,
    },
  });

  // means it was deleted
  if (!data || !isObject(data)) return;

  if (typeof data !== "object") return;

  if ("count" in data) {
    isLikedByUser.value = -1;
    // means it was created
  } else if ("created_at" in data) {
    isLikedByUser.value = hasBeenLikedByUser.value ? 0 : 1;
  }
};
</script>

<template>
  <div>
    <div
      v-if="item.mention_username"
      class="flex gap-6 mb-1 text-xs text-gray-600 dark:text-gray-400 align-center"
    >
      <ArrowSVG />
      <div>@{{ item.mention_username }}</div>
    </div>

    <div class="flex gap-4 items-center">
      <img class="self-start w-12 rounded-3xl" src="/img/user-avatar.jpg" />
      <div>
        <div class="text-xs md:text-sm">
          {{ `${item.username}${!!item.created_at && ","}` }}
          <span v-if="item.created_at">
            {{ intlHandle(new Date(item.created_at)) }}
          </span>
        </div>
        <p
          v-if="item.message && item.message.match(globalStringEmojiRegex)"
          class="flex items-center text-xs break-all md:break-words md:text-md"
        >
          <template
            v-for="partOfMessage in parseMessage(item.message)"
            :key="partOfMessage"
          >
            <template v-if="!!partOfMessage.match(globalStringEmojiRegex)">
              <img
                v-if="!!constructEmojiUrl(partOfMessage, item.guild_id)"
                :src="constructEmojiUrl(partOfMessage, item.guild_id).url"
                :alt="constructEmojiUrl(partOfMessage, item.guild_id).name"
                class="w-4"
              />
            </template>

            <span v-else-if="!!partOfMessage">
              {{ partOfMessage }}
            </span>
          </template>
        </p>
        <p v-else class="text-xs break-all md:break-words md:text-md">
          {{ item.message }}
        </p>

        <div v-for="attachement in item.attachement_urls" :key="attachement">
          <img v-if="item" class="max-w-xs" :src="attachement" />
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="item.channel_name"
    class="grid justify-center self-center text-xs text-right"
  >
    <div class="flex gap-1">
      <DatabaseSVG />
      <div class="text-right">{{ item.channel_name }}</div>
    </div>

    <p
      class="self-start mt-2 text-lg text-left"
      :class="{ 'text-ctp-teal': shouldDisplayLikeItStyle }"
    >
      {{
        item.likes?.length ? item.likes.length + isLikedByUser : isLikedByUser
      }}
      polubień
    </p>

    <button
      class="self-end py-1 px-2 mt-2 rounded-md border-2 border-solid hover:opacity-60 border-ctp-red dark:border-ctp-teal"
      :class="{
        'bg-ctp-teal': shouldDisplayLikeItStyle,
        'text-black': shouldDisplayLikeItStyle,
      }"
      @click="handleSubmit"
    >
      Polub to suko
    </button>
  </div>
</template>
