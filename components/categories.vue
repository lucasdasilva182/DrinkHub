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

    <div v-if="$fetchState.pending">Loading...</div>

    <div v-else class="flex justify-center items-center flex-wrap gap-3">
      <div
        v-for="product in products"
        :key="product.strCategory"
        class="border shadow rounded-lg p-5 flex items-center justify-center max-w-[250px] w-full"
      >
        <NuxtLink
          :to="`/categories/${product.strCategory
            .replace(/[ ]+/g, '_')
            .replace(/[ /]+/g, '+')
            .toLowerCase()}`"
        >
          <h2
            class="font-rubik font-medium text-start text-yellow-500 u ppercase font-bold text-xl"
          >
            {{ product.strCategory }}
          </h2>
        </NuxtLink>
      </div>
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
