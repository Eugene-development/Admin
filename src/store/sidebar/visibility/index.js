
export const state = () => ({
  visibleSidebar: false,
  visibleContent: false,
});

export const actions = {

  change_visibleSidebar({ commit, state, $auth }) {
    const token = this.$auth.user.project_id;
    this.$axios.setToken(token, 'Bearer')


    const visibleSidebar = !state.visibleSidebar;
    commit('VISIBLE_SIDEBAR', visibleSidebar);
  },

  get_visibleContent({ commit, state }) {
    const visibleContent = !state.visibleContent;
    commit('VISIBLE_CONTENT', visibleContent);
  },
};

export const mutations = {
  VISIBLE_SIDEBAR: (state, visibleSidebar) => state.visibleSidebar = visibleSidebar,
  VISIBLE_CONTENT: (state, visibleContent) => state.visibleContent = visibleContent,
};

export const getters = {
  visibleSidebar: state => state.visibleSidebar,
  visibleContent: state => state.visibleContent,
};

