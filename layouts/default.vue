<template>
  <div class="flex flex-col h-[100vh] !overflow-x-hidden">
    <div class="bg-[#f4f6fa] fixed w-full z-50">
      <div
        class="container relative mx-auto flex items-center justify-center p-4 space-x-4"
      >
        <NuxtLink to="/" class="w-full flex justify-center items-center">
          <img
            class="max-w-[150px] w-full"
            src="~/assets/img/drink-hub.svg"
            alt="Drink Hub"
          />
        </NuxtLink>
        <NuxtLink
          to="/favorites"
          class="absolute right-5 text-sm flex justify-center items-center flex-col"
          >Favorites
          <img
            class="max-w-[25px] w-full"
            src="~/assets/img/favorite.svg"
            alt="Favorites"
        /></NuxtLink>
      </div>
    </div>

    <div class="pt-[93px] container mx-auto flex-1">
      <Nuxt />
    </div>

    <div class="mt-6">
      <div
        class="container mx-auto border-t p-5 flex flex-col md:flex-row justify-center md:justify-between items-center"
      >
        <p>2024 © All rights reserved.</p>
        <a
          href="https://lsilva.dev"
          target="_blank"
          class="inline-flex text-sm"
        >
          Developed by
          <img
            class="ml-2 max-w-[20px] w-full"
            alt="LSilva Dev"
            src="~/assets/img/lsilva.svg"
          />
        </a>
      </div>
    </div>

    <button
      class="fixed bottom-5 right-5 md:right-8 border-none cursor-pointer"
      @click="triggerClickGoTop"
    >
      <svg
        height="30"
        viewBox="0 0 32 32"
        width="30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="_22_top" data-name="22 top">
          <path
            d="m16 2a14 14 0 1 0 14 14 14 14 0 0 0 -14-14zm0 26a12 12 0 1 1 12-12 12 12 0 0 1 -12 12zm6.71-9.71a1 1 0 0 1 0 1.42 1 1 0 0 1 -1.42 0l-5.29-5.3-5.29 5.3a1 1 0 0 1 -1.42-1.42l6-6a1 1 0 0 1 1.42 0z"
          />
        </g>
      </svg>
      <p class="hidden">Back Top</p>
    </button>
  </div>
</template>

<script>
export default {
  name: "",
  methods: {
    triggerClickGoTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  mounted() {
    const favorites =
      JSON.parse(window.localStorage.getItem("favorites")) || [];

    this.$store.dispatch("setFavorites", favorites);
  },
};
</script>

<style></style>
