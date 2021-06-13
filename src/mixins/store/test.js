export const mixinState = () => {
  return {
    fields: []
  };
}


export const mixinActions = () => {
  return {
    async fetch ({ commit, state}) {
      const { data } = await this.$axios.$get(state.url, state.apiCRUD);
      // console.log(data);
      const chunk = (data, size) =>
        Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
          data.slice(i * size, i * size + size)
        );
      const paginateMenu = chunk(data, state.sizePage)[state.currentPage - 1];
      const numberOfPage = Math.ceil(data.length / state.sizePage);

      commit('ALL_MENU', data);
      commit('PAGINATE_MENU', paginateMenu);
      commit('NUMBER_OF_PAGE', numberOfPage);
    },

  };
}
