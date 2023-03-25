<script setup lang="ts">
type Theme = "light" | "dark";

const colorMode = useColorMode();

const setColorTheme = (newTheme: Theme) => {
  colorMode.preference = newTheme;
};

const route = useRoute();
const config = useRuntimeConfig();

useHead({
  meta: [
    {
      property: "og:title",
      content: `${config.public.TITLE} - ${route.meta.title}`,
    },
  ],
});
</script>

<template>
  <nav class="flex py-4 pr-8 dark:text-white dark:bg-black">
    <button
      class="ml-auto"
      @click="setColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')"
    >
      <svg
        v-if="$colorMode.value == 'dark'"
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 text-gray-50"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </nav>
  <div class="pt-6 pb-40 dark:bg-black">
    <div
      class="p-4 mx-auto sm:max-w-3xl md:p-0 2xl:max-w-6xl dark:bg-black d:max-w-4xl"
    >
      <slot />
    </div>
  </div>
</template>
