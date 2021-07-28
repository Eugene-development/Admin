export const state = () => ({
  ruleForm: {},
  alertDanger: {},
  placeholder: {},
  // token: '777'
});

export const actions = {

  // Заполнение полей формы при строгом режиме
  updateRuleForm_email ({commit, state}, e) {
    const ruleForm = {
      name: state.ruleForm.name,
      email: e.target.value,
      password: state.ruleForm.password
    };
    commit('RULE_FORM', ruleForm)
  },
  updateRuleForm_password ({commit, state}, e) {
    const ruleForm = {
      name: state.ruleForm.name,
      email: state.ruleForm.email,
      password: e.target.value
    };
    commit('RULE_FORM', ruleForm)
  },

  //Отправка формы на сервер
  async submitForm({commit, state, $auth}) {

      //Валидация полей формы. bg-red
      if (!state.ruleForm.email) {
        const alertDanger = {
          email: true,
          password: state.alertDanger.password
        };
        commit('ALERT_DANGER', alertDanger)
      }
      if (!state.ruleForm.password) {
        const alertDanger = {
          email: state.alertDanger.email,
          password: true,
        };
        commit('ALERT_DANGER', alertDanger)
      }
      // Валидация полей формы placeholder
      const placeholder = {
        email: 'Введите логин',
        password: 'Введите пароль'
      };
      commit('PLACEHOLDER', placeholder)

    //Выполнение метода при успешной валидации

    // this.$axios.setToken(false);


    // async function setToken() {
    //   const token = '2';
    //   commit('TOKEN', token);
    //
    // }

    if (state.ruleForm.email && state.ruleForm.password) {
      const {data} = await this.$auth.login({
        data: {
          email: state.ruleForm.email,
          password: state.ruleForm.password
        }
      });



      // const token = 'hjhjhjhjhjhj';
      //
      // commit('TOKEN', token);

      // console.log(token);




//TODO походу надо удалить
      const ruleForm = {};
      commit('RULE_FORM', ruleForm)



      await this.$router.push('/');
      // await this.$forceUpdate();

    }
  },
};

export const mutations = {
  RULE_FORM: (state, ruleForm) => state.ruleForm = ruleForm,
  ALERT_DANGER: (state, alertDanger) => state.alertDanger = alertDanger,
  PLACEHOLDER: (state, placeholder) => state.placeholder = placeholder,
  // TOKEN: (state, token) => state.token = token,

};

export const getters = {
  ruleForm: state => state.ruleForm,
  alertDanger: state => state.alertDanger,
  placeholder: state => state.placeholder,
  // token: state => state.token,

};
