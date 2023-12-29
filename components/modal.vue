<template>
  <div
    class="fixed top-0 bottom-0 left-0 right-0 flex justify-center bg-[#000000da] px-4"
  >
    <div
      class="relative bg-white rounded-lg shadow mt-[10%] mb-[10%] max-w-[500px] p-10 w-full"
    >
      <div
        class="absolute right-5 top-5 w-3 cursor-pointer"
        @click="$emit('close-modal')"
      >
        <img src="~/assets/img/close-icon.svg" alt="" />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
