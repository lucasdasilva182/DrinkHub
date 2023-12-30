export default ($axios) => {
  const urlBase = "https://thecocktaildb.com/api/json/v1/1/";
  return {
    getDrinksCategoriesList: async () => {
      return await $axios.$get(`${urlBase}/list.php?c=list`);
    },
    getDrinksByCategory: async (params) => {
      return await $axios.$get(`${urlBase}/filter.php?c=${params}`);
    },
    getDrinkDetails: async (params) => {
      return await $axios.$get(`${urlBase}/lookup.php?i=${params}`);
    },
  };
};
