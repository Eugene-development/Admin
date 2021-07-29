export const state = () => ({
});



export const mutations = {
};

export const actions = {
  async logout() {
    await this.$auth.logout();

    // await this.$store.resetState({});
    // Object.assign(state, {});
    // this.$store.replaceState({});

    // await window.location.reload;

    //TODO сделать перезагрузку страницы для очистки стора
    // document.location.reload();
    await this.$router.push(
      '/admin/login'
    //   {
    //   path: this.$router.replace({ path: '/' })
    // }
    );
  }
};
