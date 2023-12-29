<template>
  <div>
    <div class="sticky top-[93px] bg-yellow-500 p-4 mb-5 shadow rounded-lg">
      <h1 class="text-4xl text-black font-bold capitalize">Categorias</h1>
      <p class="mb-4">
        Escolha uma categoria e veja os detalhes de nossos drinks:
      </p>
    </div>

    <div v-if="$fetchState.pending">Carregando...</div>

    <div v-else class="flex justify-center items-center flex-wrap gap-3">
      <div
        v-for="product in products"
        :key="product.strCategory"
        class="border shadow rounded-lg p-5 flex items-center justify-center max-w-[250px] w-full"
      >
        <NuxtLink
          :to="`/categorias/${product.strCategory
            .replace(/[ ]+/g, '_')
            .replace(/[ /]+/g, '+')
            .toLowerCase()}`"
        >
          <h2 class="text-start text-yellow-500 u ppercase font-bold text-xl">
            {{ product.strCategory }}
          </h2>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<!-- <script lang="ts">
import drinksService from "~/services/drinks";

export default {
  name: "",
  data() {
    return {
      products: [] as any[],
    };
  },
  async fetch() {
    await drinksService(this.$axios)
      .getDrinksCategoriesList()
      .then((response) => {
        this.products = response.drinks;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script> -->

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import drinksService from "~/services/drinks";

interface Drink {
  strCategory: string;
}

@Component
export default class CategoriesPage extends Vue {
  products: Drink[] = [];
  $fetchState: any;
  $axios: any;

  async fetch() {
    const response = await drinksService(this.$axios).getDrinksCategoriesList();
    this.products = response.drinks;
  }
}
</script>

<style lang=""></style>
