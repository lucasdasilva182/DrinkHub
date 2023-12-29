<template>
  <div>
    <div class="sticky top-[93px] bg-yellow-500 p-4 mb-5 shadow rounded-lg">
      <h1 class="text-4xl text-black font-bold capitalize">
        {{ $route.params.slug.replace(/[+\/\_]+/g, " ") }}
      </h1>
      <p>Delicious options for you:</p>
    </div>

    <div v-if="$fetchState.pending">Carregando...</div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
    >
      <div
        v-for="drink in drinks"
        :key="drink.idDrink"
        class="border shadow rounded-lg p-5 flex flex-col items-center justify-center gap-3"
      >
        <img
          class="max-w-[150px] rounded-lg shadow"
          :src="`${drink.strDrinkThumb}`"
        />
        <h2
          class="text-yellow-500 uppercase font-bold text-xl text-center max-w-[20ch] text-nowrap overflow-hidden text-ellipsis"
        >
          {{ drink.strDrink }}
        </h2>
        <button
          @click="showModal = true"
          class="h-10 px-4 py-2 rounded-lg border-yellow-500 bg-yellow-500 hover:bg-yellow-600 hover:border-yellow-600 text-black font-bold"
        >
          Saiba mais +
        </button>
      </div>
    </div>

    <Modal v-show="showModal" @close-modal="showModal = false">
      <h1>teste nessa porra</h1>
    </Modal>
  </div>
</template>

<!-- <script lang="ts">
import drinksService from "~/services/drinks";

export default {
  name: "",
  data() {
    return {
      drinks: [] as any[],
    };
  },
  async fetch() {
    await drinksService(this.$axios)
      .getDrinksByCategory(
        this.$route.params.slug.replace(/[ \/]+/g, "_").toLowerCase()
      )
      .then((response) => {
        this.drinks = response.drinks;
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
import Modal from "~/components/SavedModal.vue";

interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

@Component
export default class CategoryDetails extends Vue {
  drinks: Drink[] = [];
  $route: any;
  $axios: any;
  $fetchState: any;
  Modal: any;
  showModal: boolean = false;

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
}
</script>

<style></style>
