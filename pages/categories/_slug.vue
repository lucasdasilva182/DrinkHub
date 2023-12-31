<template>
  <div>
    <div
      class="sticky top-[93px] z-30 bg-yellow-500 p-4 mb-5 shadow rounded-lg flex justify-start items-center gap-5"
    >
      <NuxtLink to="/" class="flex justify-center items-center">
        <img
          class="max-w-[30px] w-full"
          src="~/assets/img/back.svg"
          alt="Back"
        />
      </NuxtLink>
      <div>
        <h1
          class="font-rubik font-medium text-4xl text-black font-bold capitalize"
        >
          {{ $route.params.slug.replace(/[+\/\_]+/g, " ") }}
        </h1>
        <p>Delicious options for you:</p>
      </div>
    </div>

    <div v-if="$fetchState.pending"><Loading /></div>

    <div v-else class="flex flex-wrap gap-3 justify-center items-center">
      <div
        v-for="drink in drinks"
        :key="drink.idDrink"
        class="relative bg-white shadow-custom-shadow rounded-lg p-5 flex flex-col items-center justify-center gap-3 w-[283px] h-[283px]"
      >
        <img
          class="max-w-[150px] rounded-lg shadow-custom-shadow"
          :src="drink.strDrinkThumb"
          :alt="drink.strDrinkThumb"
          loading="lazy"
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

    <!-- Modal ERROR API -->
    <Modal v-if="showErrorModal" @close-modal="showErrorModal = false">
      <div class="flex flex-col justify-center items-center">
        <h1 class="font-medium text-4xl text-black font-bold uppercase">
          Server error
        </h1>
        <p class="text-gray-500">Please, try again later.</p>
        <NuxtLink
          to="/"
          @click="showErrorModal = false"
          class="mt-5 h-10 px-4 py-2 rounded-lg border-yellow-500 bg-yellow-500 hover:bg-yellow-600 hover:border-yellow-600 text-black font-bold"
        >
          Home
        </NuxtLink>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import drinksService from "~/services/drinks";

interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strCategory: string;
  strInstructions: string;
}

export default Vue.extend({
  data() {
    return {
      drinks: [] as Drink[],
      drinksDetails: [] as Drink[],
      showModal: false as boolean,
      showErrorModal: false as boolean,
      loadingModalContent: true as boolean,
      drinkDetailsIngredients: [] as string[],
    };
  },

  async fetch() {
    const category = this.$route.params.slug
      .replace(/[+]+/g, "/")
      .toLowerCase();

    try {
      const response = await drinksService(this.$axios).getDrinksByCategory(
        category
      );
      this.drinks = response.drinks;
    } catch (error) {
      this.showErrorModal = true;
    }
  },

  watch: {
    showModal(e) {
      if (e) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    },
  },

  methods: {
    toggleFavorite1(idDrink: object) {
      this.$store.dispatch("toggleFavorite", idDrink);
    },
    shouldShowDrink(drink: Drink) {
      return !this.$store.state.favorites.some(
        (favDrink: Drink) => favDrink.idDrink === drink.idDrink
      );
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
        this.showErrorModal = true;
      }
    },
  },
});
</script>

<style></style>
