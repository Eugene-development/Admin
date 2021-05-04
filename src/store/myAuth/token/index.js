export const state = () => ({
  token: ''
});

export const actions = {
  async getToken ({commit, state, $auth}, ) {


    // console.log(this.context);
    // const token = this.$auth.user.name;
    // commit('TOKEN', token);
  }
};

export const mutations = {
  TOKEN: (state, token) => state.token = token,
};

export const getters = {
  token: state => state.token,
};

