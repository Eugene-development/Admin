export const actions = {
  async setToken ({ $auth }) {
    const token = this.$auth.user.project_id;
    this.$axios.setToken(token, 'Bearer')
  }
};
