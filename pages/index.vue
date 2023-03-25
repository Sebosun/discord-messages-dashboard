<script setup lang="ts">
import { debounce } from "lodash-es";

definePageMeta({
  title: "Messages index",
  keepalive: true,
});

const textFetchTerm = ref("");
const textTerm = ref("");
const isTextResultsVisible = ref(false);

const route = useRoute();
const router = useRouter();

const page = ref(0);

const {
  data: messages,
  pending,
  refresh,
} = await useFetch(() => `/api/messages`, {
  method: "post",
  query: { page },
  immediate: false,
});

const { data: filteredMessages, pending: isFindMessagesPending } =
  await useFetch(() => `/api/findMessages`, {
    method: "post",
    query: { text: textFetchTerm },
    immediate: false,
  });

const handleRefetch = () => {
  router.push({ path: "/", query: { page: page.value + 1 } });
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};

const handlePrev = () => {
  if (page.value > 0) {
    page.value = page.value - 1;
    handleRefetch();
  }
};

const handleNext = () => {
  page.value = page.value + 1;
  handleRefetch();
};

onMounted(() => {
  if (route.query?.searchTerm && typeof route.query.searchTerm === "string") {
    isTextResultsVisible.value = true;
    textTerm.value = route.query.searchTerm;
    textFetchTerm.value = route.query.searchTerm;
    return;
  }

  if (route.query?.page && typeof route.query.page === "string") {
    page.value = parseInt(route.query.page) - 1;
  }

  refresh();
});

const handleDeb = debounce(() => {
  textFetchTerm.value = textTerm.value;
  isTextResultsVisible.value = true;
  router.push({ path: "/", query: { searchTerm: textTerm.value } });
}, 1000);

const clearInput = debounce(() => {
  textFetchTerm.value = textTerm.value;
  isTextResultsVisible.value = false;
  router.push({ path: "/", query: { page: page.value + 1 } });
}, 1000);

watch(textTerm, (newText, oldText) => {
  if (newText !== oldText) {
    handleDeb();
    clearInput.cancel();
  }

  if (newText === "") {
    handleDeb.cancel();
    clearInput();
  }
});
</script>

<template>
  <main>
    <div class="mb-6">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Szukaj
      </label>
      <input
        id="large-input"
        v-model="textTerm"
        type="text"
        class="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:placeholder-gray-400 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 sm:text-md dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>

    <BaseDataDisplay
      v-if="isTextResultsVisible"
      :messages="filteredMessages"
      :pending="isFindMessagesPending"
    />
    <BaseDataDisplay v-else :messages="messages" :pending="pending" />

    <div
      v-if="!isTextResultsVisible"
      class="flex flex-col gap-8 justify-center mb-10 sm:flex-row sm:gap-20"
    >
      <BaseButton :disabled="page <= 0" @click="handlePrev">
        Poprzednia strona
      </BaseButton>

      <div class="self-center text-2xl text-ctp-teal">
        {{ page + 1 }}
      </div>

      <BaseButton
        class="py-2 px-4 text-white rounded-md disabled:text-gray-400 bg-slate-900 backdrop-blur-lg dark:bg-ctp-surface0 dark:text-ctp-text dark:disabled:bg-ctp-crust dark:disabled:text-ctp-overlay0 disabled:bg-slate-500"
        @click="handleNext"
      >
        Nastepna strona
      </BaseButton>
    </div>
  </main>
</template>

<style scoped>
.has-reply {
  margin-left: 50px;
  position: relative;
}

.has-reply::before {
  --spine-width: 2px;
  --gutter: 10px;
  --interactive-muted: 2px;
  --primary-dark-500: hsl(217, calc(var(--saturation-factor, 1) * 7.6%), 33.5%);
  --avatar-size: 40px;
  --reply-spacing: 4px;
  content: "";
  display: block;
  position: absolute;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  top: 50%;
  right: 100%;
  bottom: 0;
  left: calc(var(--avatar-size) / 2 * -1 + var(--gutter) * -1);
  margin-right: var(--reply-spacing);
  margin-top: calc(var(--spine-width) * -1 / 2);
  margin-left: calc(var(--spine-width) * -1 / 2);
  margin-bottom: calc(0.125rem - 4px);
  border-left: var(--spine-width) solid var(--interactive-muted);
  border-bottom: 0 solid var(--interactive-muted);
  border-right: 0 solid var(--interactive-muted);
  border-top: var(--spine-width) solid var(--interactive-muted);
  border-top-left-radius: 6px;
}
</style>
