export const state = () => ({
});

export const mutations = {
};

export const actions = {
  async logout() {
    await this.$auth.logout();
    await this.$router.push(
      '/admin/login'
    //   {
    //   path: this.$router.replace({ path: '/' })
    // }
    );
  }
};
