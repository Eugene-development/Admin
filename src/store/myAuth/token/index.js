export const actions = {
  async setToken ({ $auth }) {
    console.log(window.location.hostname);
    const token = this.$auth.user.project_id;
    this.$axios.setToken(token, 'Bearer')
  },
};
