<template>
  <div>
    <div class="sticky top-[93px] bg-yellow-500 p-4 mb-5 shadow rounded-lg">
      <h1
        class="font-rubik font-medium text-4xl text-black font-bold capitalize"
      >
        Categories
      </h1>
      <p>Choose a category and see the details of our drinks:</p>
    </div>

    <div v-if="$fetchState.pending"><Loading /></div>

    <div v-else class="flex justify-center items-center flex-wrap gap-3">
      <template v-for="product in products">
        <NuxtLink
          :to="`/categories/${product.strCategory
            .replace(/[ ]+/g, '_')
            .replace(/[ /]+/g, '+')
            .toLowerCase()}`"
          :key="product.strCategory"
        >
          <div
            class="bg-white shadow-custom-shadow rounded-lg p-5 flex items-center justify-center gap-4 w-[350px] w-full"
          >
            <img
              class="max-w-[70px] w-full rounded-lg"
              :src="
                require(`~/assets/img/${product.strCategory
                  .replace(/[ ]+/g, '')
                  .replace(/[ /]+/g, '')
                  .toLowerCase()}.svg`)
              "
            />
            <h2
              class="font-rubik font-medium text-start text-yellow-500 font-bold text-xl"
            >
              {{ product.strCategory }}
            </h2>
          </div>
        </NuxtLink>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import drinksService from "~/services/drinks";

interface Drink {
  strCategory: string;
}

export default Vue.extend({
  data() {
    return {
      products: [] as Drink[],
    };
  },

  async fetch() {
    try {
      const response = await drinksService(
        this.$axios
      ).getDrinksCategoriesList();
      this.products = response.drinks;
    } catch (error) {
      console.error(error);
    }
  },
});
</script>

<style lang=""></style>
