export const state = () => ({
  favorites: [],
});

export const mutations = {
  setFavorites(state, favorites) {
    state.favorites = favorites;
  },

  toggleFavorite(state, drink) {
    const isFavorite = state.favorites.some(
      (favDrink) => favDrink.idDrink === drink.idDrink
    );

    if (isFavorite) {
      state.favorites = state.favorites.filter(
        (favDrink) => favDrink.idDrink !== drink.idDrink
      );
    } else {
      state.favorites.push(drink);
    }
  },
};

export const actions = {
  setFavorites({ commit }, favorites) {
    commit("setFavorites", favorites);
  },

  toggleFavorite({ commit, state }, drink) {
    commit("toggleFavorite", drink);
    if (process.client) {
      window.localStorage.setItem("favorites", JSON.stringify(state.favorites));
    }
  },
};
