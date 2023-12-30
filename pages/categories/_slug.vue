<template>
  <div>
    <div
      class="sticky top-[93px] z-30 bg-yellow-500 p-4 mb-5 shadow rounded-lg"
    >
      <h1
        class="font-rubik font-medium text-4xl text-black font-bold capitalize"
      >
        {{ $route.params.slug.replace(/[+\/\_]+/g, " ") }}
      </h1>
      <p>Delicious options for you:</p>
    </div>

    <div v-if="$fetchState.pending">Loading...</div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
    >
      <div
        v-for="drink in drinks"
        :key="drink.idDrink"
        class="relative bg-white shadow-custom-shadow rounded-lg p-5 flex flex-col items-center justify-center gap-3"
      >
        <img
          class="max-w-[150px] rounded-lg shadow-custom-shadow"
          :src="`${drink.strDrinkThumb}`"
        />
        <h2
          class="font-rubik font-medium text-yellow-500 uppercase font-bold text-xl text-center max-w-[15ch] text-nowrap overflow-hidden text-ellipsis"
        >
          {{ drink.strDrink }}
        </h2>
        <button
          @click="customFunction(drink.idDrink), (showModal = true)"
          class="h-10 px-4 py-2 rounded-lg border-yellow-500 bg-yellow-500 hover:bg-yellow-600 hover:border-yellow-600 text-black font-bold"
        >
          Details +
        </button>
        <a
          @click="toggleFavorite1(drink)"
          class="cursor-pointer absolute top-5 right-5"
        >
          <svg
            v-if="
              !$store.state.favorites.some(
                (favDrink) => favDrink.idDrink === drink.idDrink
              )
            "
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
      <div v-if="loadingModalContent">Loading...</div>

      <div v-else class="flex flex-col justify-center items-center">
        <div
          v-for="drink in drinksDetails"
          :key="drink.idDrink"
          class="flex flex-col items-center justify-center gap-3"
        >
          <img
            class="max-w-[250px] rounded-lg shadow-custom-shadow"
            :src="`${drink.strDrinkThumb}`"
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
                class="px-2 py-[0.15rem] bg-slate-200 rounded-lg text-sm font-bold"
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
      showModal: false,
      loadingModalContent: true,
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
      console.error(error);
    }
  },

  methods: {
    toggleFavorite1(idDrink: object) {
      this.$store.dispatch("toggleFavorite", idDrink);
    },
    async customFunction(idDrink: string) {
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
});
</script>

<!-- <script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import drinksService from "~/services/drinks";

interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strCategory: string;
  strInstructions: string;
}

@Component
export default class CategoryDetails extends Vue {
  drinks: Drink[] = [];
  drinksDetails: Drink[] = [];
  $route: any;
  $axios: any;
  $fetchState: any;
  showModal: boolean = false;
  loadingModalContent: boolean = true;
  drinkDetailsIngredients: Array<string> = [];


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
      console.log(error);
    }
  }

  async customFunction(idDrink: string) {
    this.loadingModalContent = true;
    try {
      const response = await drinksService(this.$axios).getDrinkDetails(
        idDrink
      );

      this.drinksDetails = response.drinks;
      this.loadingModalContent = false;
      console.log(this.drinksDetails);

      const ingredients = Array.from(
        { length: 15 },
        (_, i) => this.drinksDetails[0][`strIngredient${i + 1}`]
      );

      this.drinkDetailsIngredients = ingredients.filter(
        (ingredient) => ingredient !== null
      );

      console.log(this.drinkDetailsIngredients);
    } catch (error) {
      console.log(error);
    }
  }
}
</script> -->

<style></style>
