
export const state = () => ({
  visibleOffice: false,
});

export const actions = {

  get_visibleOffice({ commit, state }) {
    const visibleOffice = !state.visibleOffice;
    commit('VISIBLE_OFFICE', visibleOffice);
  },

};

export const mutations = {
  VISIBLE_OFFICE: (state, visibleOffice) => state.visibleOffice = visibleOffice,
};


export const getters = {
  visibleOffice: state => state.visibleOffice,
};
