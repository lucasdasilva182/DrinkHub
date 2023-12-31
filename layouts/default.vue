<template>
  <div class="flex flex-col h-[100vh]">
    <div class="bg-[#f4f6fa] fixed w-full z-50">
      <div
        class="container relative mx-auto flex items-center justify-center p-4 space-x-4"
      >
        <NuxtLink to="/" class="w-full flex justify-center items-center">
          <img class="max-w-[150px] w-full" src="~/assets/img/drink-hub.svg" />
        </NuxtLink>
        <NuxtLink
          to="/favorites"
          class="absolute right-5 text-sm flex justify-center items-center flex-col transition-all ease-linear hover:scale-105"
          >Favorites
          <img class="max-w-[25px] w-full" src="~/assets/img/favorite.svg"
        /></NuxtLink>
      </div>
    </div>

    <div class="pt-[93px] container mx-auto flex-1">
      <Nuxt />
    </div>

    <div class="mt-6">
      <div class="container mx-auto border-t p-5">
        2023 © Todos os direitos reservados.
      </div>
    </div>

    <button
      class="fixed bottom-5 right-5 border-none cursor-pointer"
      @click="triggerClickGoTop()"
    >
      <img
        class="max-w-[30px] w-full rotate-[-45deg] z-50"
        src="~/assets/img/arrow-top.svg"
      />
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
