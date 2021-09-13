export const mixinState = () => {
  return {
  };
}


export const menuActions = () => {
  return {
    async fetch ({ commit, state}) {
      const { data } = await this.$axios.$get(process.env.ALL_MENU, state.apiCRUD);
      // const { data } = await this.$axios.$get(process.env["ALL_MENU"], state.apiCRUD);
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
