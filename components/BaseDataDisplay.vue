<script setup lang="ts">
import { MessagesType } from "@/server/api/messages.post";

defineProps<{
  messages: MessagesType[] | null;
  pending: boolean;
}>();
</script>
<template>
  <template v-if="!pending">
    <div
      v-for="item in messages"
      :key="`message-${item.id}`"
      class="flex gap-4 justify-between p-4 mb-4 bg-gray-200 rounded-lg border-zinc-800 dark:bg-ctp-base"
    >
      <BaseMessage :item="item" />
    </div>
  </template>

  <div v-else-if="pending">
    <div
      v-for="i in 20"
      :key="`fallback-${i}`"
      class="flex gap-4 justify-center p-6 mb-4 bg-gray-200 rounded-lg dark:bg-gray-900 border-zinc-800"
    >
      <LoadingSpinner />
    </div>
  </div>
  <div v-else class="dark:text-white">No data</div>
</template>
