<template>
  <div>
    <!-- Error in API -->
    <div
      v-if="errorGetCategories"
      class="mt-8 flex flex-col justify-center items-center"
    >
      <h1 class="font-medium text-4xl text-black font-bold uppercase">
        Server error
      </h1>
      <p class="text-gray-500">Please, try again later.</p>
    </div>

    <div v-else>
      <div
        class="sticky top-[93px] z-30 bg-yellow-500 p-4 mb-5 shadow rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center"
      >
        <div>
          <div
            class="flex gap-5 justify-start items-center"
            v-if="showSearchResult == true"
          >
            <a
              @click="(showSearchResult = false), (searchDrink = '')"
              class="flex justify-center items-center cursor-pointer"
            >
              <img
                class="max-w-[30px] w-full"
                src="~/assets/img/back.svg"
                alt="Back"
              />
            </a>
            <div>
              <h1
                class="font-rubik font-medium text-4xl text-black font-bold capitalize"
              >
                Results for: "{{ searchDrink }}"
              </h1>
            </div>
          </div>
          <div v-else>
            <h1
              class="font-rubik font-medium text-4xl text-black font-bold capitalize"
            >
              Categories
            </h1>
            <p>Choose a category and see the details of our drinks:</p>
          </div>
        </div>
        <div class="relative mt-5 sm:mt-0">
          <input
            type="text"
            placeholder="Search for a drink"
            class="w-full rounded-lg p-2 pr-10 outline-none"
            v-model="searchDrink"
            @change="fetchDrinkByName(searchDrink)"
          />
          <img
            @click="fetchDrinkByName(searchDrink)"
            class="max-w-[25px] w-full absolute right-2 top-2 cursor-pointer"
            src="~/assets/img/search.svg"
            alt="Search"
          />
        </div>
      </div>

      <!-- SEARCH -->
      <div v-if="showSearchResult">
        <Loading v-if="loadingModalContent" />

        <div v-else>
          <div
            v-if="searchResult.length > 0"
            class="flex flex-wrap gap-3 justify-center items-center"
          >
            <div
              v-for="drink in searchResult"
              :key="drink.idDrink"
              class="relative bg-white shadow-custom-shadow rounded-lg p-5 flex flex-col items-center justify-center gap-3 w-[283px] h-[283px]"
            >
              <img
                class="max-w-[150px] rounded-lg shadow-custom-shadow"
                :src="drink.strDrinkThumb"
                :alt="drink.strDrinkThumb"
              />
              <h2
                class="font-rubik font-medium text-yellow-500 uppercase font-bold text-xl text-center max-w-[15ch] text-nowrap overflow-hidden text-ellipsis"
              >
                {{ drink.strDrink }}
              </h2>
              <button
                @click="fetchDrinkDetails(drink.idDrink), (showModal = true)"
                class="h-10 px-4 py-2 rounded-lg border-yellow-500 bg-yellow-500 hover:bg-yellow-600 hover:border-yellow-600 text-black font-bold"
              >
                Details +
              </button>
              <a
                @click="toggleFavorite1(drink)"
                class="cursor-pointer absolute top-5 right-5"
              >
                <svg
                  v-if="shouldShowDrink(drink)"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-heart"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
                  />
                </svg>

                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="red"
                  class="bi bi-heart-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div
            v-else
            class="text-center mt-8 flex flex-col justify-center items-center gap-5"
          >
            <img
              src="~/assets/img/glass.svg"
              alt="Broken glass"
              class="max-w-[200px] w-full grayscale"
            />
            <h2 class="font-medium text-2xl text-black font-bold capitalize">
              No results.
            </h2>
            <p class="text-gray-500">Try to search another drink.</p>
          </div>
        </div>
      </div>

      <!-- CATEGORIES -->
      <div v-else>
        <div v-if="$fetchState.pending"><Loading /></div>

        <div v-else class="flex justify-center items-center flex-wrap gap-3">
          <template v-for="product in products">
            <NuxtLink
              :to="`/categories/${formatCategoryLink(product.strCategory)}`"
              :key="product.strCategory"
            >
              <div
                class="bg-white shadow-custom-shadow rounded-lg p-5 flex items-center justify-center gap-4 w-[350px]"
              >
                <img
                  class="max-w-[70px] w-full rounded-lg"
                  :src="
                    require(`~/assets/img/${formatCategory(
                      product.strCategory
                    )}.svg`)
                  "
                  :alt="product.strCategory"
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

      <!-- Modal -->
      <Modal v-if="showModal" @close-modal="showModal = false">
        <Loading v-if="loadingModalContent" />

        <div v-else class="flex flex-col justify-center items-center">
          <div
            v-for="drink in drinksDetails"
            :key="drink.idDrink"
            class="flex flex-col items-center justify-center gap-3"
          >
            <img
              class="max-w-[250px] rounded-lg shadow-custom-shadow"
              :src="drink.strDrinkThumb"
              :alt="drink.strDrinkThumb"
            />
            <h2
              class="font-rubik font-medium text-yellow-500 uppercase font-bold text-xl text-center text-nowrap overflow-hidden text-ellipsis"
            >
              {{ drink.strDrink }}
            </h2>
            <p class="text-yellow-500 font-bold">Ingredients:</p>
            <div class="flex gap-3 flex-wrap">
              <template v-for="(ingredient, index) in drinkDetailsIngredients">
                <p
                  :key="index"
                  class="px-2 py-[0.15rem] bg-[#f4f6fa] rounded-lg shadow-custom-shadow text-sm font-bold"
                >
                  {{ ingredient }}
                </p>
              </template>
            </div>
            <p class="text-yellow-500 font-bold">How to prepare:</p>
            <p class="text-center">{{ drink.strInstructions }}</p>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import drinksService from "~/services/drinks";

interface Drink {
  strCategory: string;
  idDrink: string;
}

export default Vue.extend({
  data() {
    return {
      products: [] as Drink[],
      searchResult: [] as Array<any>,
      drinksDetails: [] as Array<any>,
      searchDrink: "" as string,
      errorGetCategories: false as boolean,
      showModal: false as boolean,
      loadingModalContent: true as boolean,
      showSearchResult: false as boolean,
      drinkDetailsIngredients: [] as string[],
    };
  },

  methods: {
    formatCategory(category: string): string {
      return category.replace(/[ ]+/g, "").replace(/[ /]+/g, "").toLowerCase();
    },
    formatCategoryLink(category: string): string {
      return category
        .replace(/[ ]+/g, "_")
        .replace(/[ /]+/g, "+")
        .toLowerCase();
    },
    shouldShowDrink(drink: Drink) {
      return !this.$store.state.favorites.some(
        (favDrink: Drink) => favDrink.idDrink === drink.idDrink
      );
    },
    toggleFavorite1(drink: any) {
      this.$store.dispatch("toggleFavorite", drink);
    },
    async fetchDrinkByName(drink: string) {
      this.loadingModalContent = true;
      this.showSearchResult = true;
      this.searchResult = [];
      try {
        const response = await drinksService(this.$axios).getDrinkByName(drink);
        if (response.drinks != null) {
          this.searchResult = response.drinks;
        }
        this.loadingModalContent = false;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchDrinkDetails(idDrink: string) {
      this.loadingModalContent = true;
      this.drinkDetailsIngredients = [];
      try {
        const response = await drinksService(this.$axios).getDrinkDetails(
          idDrink
        );
        this.drinksDetails = response.drinks;
        this.loadingModalContent = false;

        for (let i = 1; i <= 15; i++) {
          if (
            this.drinksDetails[0][`strIngredient${i}` as keyof Drink] !== null
          ) {
            this.drinkDetailsIngredients.push(
              this.drinksDetails[0][`strIngredient${i}` as keyof Drink]
            );
          }
        }

        this.showModal = true;
      } catch (error) {
        console.error(error);
      }
    },
  },

  async fetch() {
    try {
      const response = await drinksService(
        this.$axios
      ).getDrinksCategoriesList();
      this.products = response.drinks;
    } catch (error) {
      this.errorGetCategories = true;
    }
  },
});
</script>

<style lang=""></style>
