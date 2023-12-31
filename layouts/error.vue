<template>
  <div class="flex flex-col justify-center items-center gap-7 h-[75vh]">
    <h1
      class="font-medium text-4xl text-center text-black font-bold capitalize"
    >
      Ops! Page not found.
    </h1>
    <NuxtLink to="/" class="underline">Back to Home</NuxtLink>
    <img class="max-w-[250px] w-full" src="~/assets/img/404.svg" />
  </div>
</template>

<script>
export default {
  layout: "default",
};
</script>
