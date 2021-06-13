export const state = () => ({
});

export const mutations = {
};

export const actions = {
  async nuxtServerInit({dispatch}){
    // console.log(this.$auth.user.name);
    // await dispatch('myAuth/token/getToken');
    // await dispatch('data/navigation/catalog/head/fetch');
    // await dispatch('data/navigation/catalog/rubric/fetch');
    // await dispatch('data/navigation/menu/fetch');
    await dispatch('data/navigation/catalog/category/fetch');
    // await dispatch('data/product/fetch');
  }
};

export const getters = {
};

