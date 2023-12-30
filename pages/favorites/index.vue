<template>
  <div>
    <div class="sticky top-[93px] bg-yellow-500 p-4 mb-5 shadow rounded-lg">
      <h1
        class="font-rubik font-medium text-4xl text-black font-bold capitalize"
      >
        Favorites
      </h1>
      <p>See the details of your favorite drinks:</p>
    </div>

    <div v-if="favorites.length === 0" class="flex justify-center items-center">
      <div class="text-center">
        <!-- <img src="~/assets/img/empty.svg" class="max-w-[300px] w-full" /> -->
        <p class="text-gray-500">
          You don't have any favorite drinks yet. To add one, simply click on
          the heart icon on a drink's card.
        </p>
      </div>
    </div>

    <div v-else class="flex justify-center items-center flex-wrap gap-3">
      <div
        v-for="product in favorites"
        :key="product.strDrink"
        class="border shadow rounded-lg p-5 flex items-center justify-center max-w-[250px] w-full"
      >
        <NuxtLink :to="`/drinks/${product.idDrink}`">
          <img
            class="max-w-[150px] w-full"
            :src="product.strDrinkThumb"
            :alt="product.strDrink"
          />
          <h2
            class="font-rubik font-medium text-start text-yellow-500 uppercase font-bold text-xl"
          >
            {{ product.strDrink }}
          </h2>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
interface FavoriteDrink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export default {
  name: "",
  data() {
    return {
      favorites: [] as FavoriteDrink[],
    };
  },
  mounted() {
    const favoritesData = window.localStorage.getItem("favorites");
    this.favorites = favoritesData ? JSON.parse(favoritesData) : [];
  },
};
</script>

<style></style>
