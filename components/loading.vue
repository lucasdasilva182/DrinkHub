<template>
  <div
    class="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-[#000000ef] px-4 z-[1000]"
  >
    <div class="loading flex items-center justify-center">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.loading span {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background: #fff;
  margin: 4px;
  animation: dots 0.6s cubic-bezier(0.6, 0.1, 1, 0.4) infinite alternate;
}

.loading span:nth-child(1) {
  animation-delay: 0.1s;
}
.loading span:nth-child(2) {
  animation-delay: 0.2s;
}
.loading span:nth-child(3) {
  animation-delay: 0.3s;
}
.loading span:nth-child(4) {
  animation-delay: 0.4s;
}

@keyframes dots {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, 30px, 0);
  }
}
</style>
