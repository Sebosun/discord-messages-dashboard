<script setup lang="ts">
const config = useRuntimeConfig();
useServerSeoMeta({
  title: config.public.TITLE,
  ogTitle: config.public.TITLE,
  description: config.public.DESCRIPTION,
  ogDescription: config.public.DESCRIPTION,
  ogImage: config.public.OG_IMAGE_URL,
  twitterCard: "summary_large_image",
});
</script>
<template>
  <NuxtLayout>
    <div class="min-h-screen dark:text-white dark:bg-black">
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>
