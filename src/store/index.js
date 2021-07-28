export const state = () => ({
  token: ''
});

export const actions = {
  async nuxtServerInit({dispatch, $auth, commit}){
    // console.log(this.$auth.user.name)
    // await dispatch('myAuth/token/getToken');
    // await dispatch('data/navigation/catalog/head/fetch');
    // await dispatch('data/navigation/catalog/rubric/fetch');
    // await dispatch('data/navigation/menu/fetch');
    // await dispatch('data/navigation/catalog/category/fetch');
    // await dispatch('data/product/fetch');


    // const token = this.$auth.user.project_id;
    // commit('TOKEN', token)
  },
  // getToken ({commit, state, $auth}, ) {
  //   console.log(this.$auth.user.project_id);
  //   const token = this.$auth.user.project_id;
  //   commit('TOKEN', token);
  // },
  // reload() {
  //   document.location.reload();
  // }

};


export const mutations = {

  TOKEN: (state, token) => state.token = token,
};

export const getters = {
  token: state => state.token,
};

