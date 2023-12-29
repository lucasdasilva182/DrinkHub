<template>
  <div class="flex flex-col h-[100vh]">
    <div class="bg-white fixed w-full">
      <div
        class="container mx-auto flex items-center justify-center p-4 space-x-4"
      >
        <NuxtLink to="/">
          <img class="max-w-[150px] w-full" src="~/assets/img/drink-hub.svg" />
        </NuxtLink>
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
  </div>
</template>

<script>
export default {
  name: "",
};
</script>

<style></style>
