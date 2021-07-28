export const state = () => ({
  token: ''
});

export const actions = {
  async getToken ({commit, state, $auth}, ) {
    // console.log(this.$auth.user.project_id);
    const data = this.$auth.user.project_id;
    commit('TOKEN', data);
    // await this.$forceUpdate();

    // await this.$nuxt.refresh()

    // document.location.reload();

  }
};

export const mutations = {
  TOKEN: (state, data) => state.token = data,
};

export const getters = {
  token: state => state.token,
};

