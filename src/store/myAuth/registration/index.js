export const state = () => ({
  ruleForm: {},
  alertDanger: {},
  placeholder: {}
});

export const actions = {

  updateRuleForm_name ({commit, state}, e) {
    const ruleForm = {
      name: e.target.value,
      email: state.ruleForm.email,
      password: state.ruleForm.password,
      confirm_password: state.ruleForm.confirm_password
    };
    commit('RULE_FORM', ruleForm)
  },
  updateRuleForm_email ({commit, state}, e) {
    const ruleForm = {
      name: state.ruleForm.name,
      email: e.target.value,
      password: state.ruleForm.password,
      confirm_password: state.ruleForm.confirm_password
    };
    commit('RULE_FORM', ruleForm)
  },
  updateRuleForm_password({commit, state}, e) {
    const ruleForm = {
      name: state.ruleForm.name,
      email: state.ruleForm.email,
      password: e.target.value,
      confirm_password: state.ruleForm.confirm_password
    };
    commit('RULE_FORM', ruleForm)
  },
  updateRuleForm_confirm_password({commit, state}, e) {
    const ruleForm = {
      name: state.ruleForm.name,
      email: state.ruleForm.email,
      password: state.ruleForm.password,
      confirm_password: e.target.value
    };
    commit('RULE_FORM', ruleForm)
  },


  async submitForm({commit, state}) {

    if (!state.ruleForm.name) {
      const alertDanger = {
        name: true,
        email: state.alertDanger.email,
        password: state.alertDanger.password,
        confirm_password: state.ruleForm.confirm_password
      };
      commit('ALERT_DANGER', alertDanger)
    }
    if (!state.ruleForm.email) {
      const alertDanger = {
        name: state.alertDanger.name,
        email: true,
        password: state.alertDanger.password,
        confirm_password: state.ruleForm.confirm_password
      };
      commit('ALERT_DANGER', alertDanger)
    }
    if (!state.ruleForm.password) {
      const alertDanger = {
        name: state.alertDanger.name,
        email: state.alertDanger.email,
        password: true,
        confirm_password: state.ruleForm.confirm_password
      };
      commit('ALERT_DANGER', alertDanger)
    }
    if (!state.ruleForm.confirm_password) {
      const alertDanger = {
        name: state.alertDanger.name,
        email: state.alertDanger.email,
        password: state.alertDanger.password,
        confirm_password: true
      };
      commit('ALERT_DANGER', alertDanger)
    }

    if (state.ruleForm.password !== state.ruleForm.confirm_password) {
      const alertDanger = {
        name: state.alertDanger.name,
        email: state.alertDanger.email,
        password: true,
        confirm_password: true
      };
      commit('PLACEHOLDER', placeholder)
      commit('ALERT_DANGER', alertDanger)
    }

    const placeholder = {
      name: 'Введите имя',
      email: 'Введите логин',
      password: 'Введите пароль',
      confirm_password: 'Повторите пароль'
    };
    commit('PLACEHOLDER', placeholder)


    if (state.ruleForm.name && state.ruleForm.email && state.ruleForm.password && state.ruleForm.password === state.ruleForm.confirm_password) {

      await this.$axios.post('https://adminexpo.com:8888/api/register', state.ruleForm);


      //TODO А надо ли логинить после регистрации? Может отправлять на логин и там уже проверять роль???
      await this.$auth.login({
        data: {
          email: state.ruleForm.email,
          password: state.ruleForm.password
        }
      });

//TODO убрать???
      const ruleForm = {};
      commit('RULE_FORM', ruleForm)



      await $nuxt.$router.push('/')




      //   {
        //   path: this.$router.replace({ path: '/admin/office' })
        //   path: this.$route.query.redirect || '/admin/office'
        // }
    }

  },
};

export const mutations = {
  RULE_FORM: (state, ruleForm) => state.ruleForm = ruleForm,
  ALERT_DANGER: (state, alertDanger) => state.alertDanger = alertDanger,
  PLACEHOLDER: (state, placeholder) => state.placeholder = placeholder
};

export const getters = {
  ruleForm: state => state.ruleForm,
  alertDanger: state => state.alertDanger,
  placeholder: state => state.placeholder
};
