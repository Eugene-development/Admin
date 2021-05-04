<template>
  <!--
    Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
    Read the documentation to get started: https://tailwindui.com/documentation
  -->
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
<!--      <img class="mx-auto h-12 w-auto" src="https://signal52.ru/assets/templates/s52/images/logo.png" alt="Workflow">-->
<!--      <img class="mx-auto h-12 w-auto" src="https://xn&#45;&#45;&#45;&#45;7sbc2ahzelejid.xn&#45;&#45;p1ai/storage/img/logo.png" alt="Workflow">-->
      <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
        Вход в аккаунт
      </h2>
<!--      <p class="mt-2 text-center text-sm leading-5 text-gray-600 max-w">-->
<!--        Or-->
<!--        <a href="#" class="font-medium text-teal-600 hover:text-teal-500 focus:outline-none focus:underline transition ease-in-out duration-150">-->
<!--          start your 14-day free trial-->
<!--        </a>-->
<!--      </p>-->
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
        <form ref="ruleForm" @submit.prevent="submitForm">         <!--          TODO а надо ли ???-->
          <div>
            <label for="email" class="block text-sm font-medium leading-5 text-gray-700">
              Ваш логин
            </label>
            <div class="mt-1 rounded-md shadow-sm">
              <input
                :class="{'bg-red-100': alertDanger.email}"
                :placeholder="[placeholder.email]"
                @input="updateRuleForm_email"
                id="email"
                type="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
            </div>
          </div>

          <div class="mt-6">
            <label for="password" class="block text-sm font-medium leading-5 text-gray-700">
              Пароль
            </label>
            <div class="mt-1 rounded-md shadow-sm">
              <input
                :class="{'bg-red-100': alertDanger.password}"
                :placeholder="[placeholder.password]"
                @input="updateRuleForm_password"
                id="password"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
            </div>
          </div>

          <div class="mt-6 flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember_me" type="checkbox" class="form-checkbox h-4 w-4 text-teal-600 transition duration-150 ease-in-out">
              <label for="remember_me" class="ml-2 block text-sm leading-5 text-gray-900">
                Запомнить
              </label>
            </div>

            <div class="text-sm leading-5">
              <a href="#" class="font-medium text-teal-600 hover:text-teal-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                Забыли пароль?
              </a>
            </div>
          </div>

          <div class="mt-6">
          <span class="block w-full rounded-md shadow-sm">
            <button
              @click.prevent.once="submitForm('ruleForm')"
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-50 bg-teal-700 hover:bg-teal-600 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal transition duration-150 ease-in-out"
            >
             Войти
            </button>
          </span>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm leading-5">
            <span class="px-2 bg-white text-gray-500">
              или
            </span>
            </div>
          </div>

          <NuxtLink
            class="mt-6 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-50 bg-teal-700 hover:bg-teal-600 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal transition duration-150 ease-in-out"
            role="menuitem"
            to="/admin/registration">Зарегистрировать аккаунт
          </NuxtLink>

          </div>
        </div>
      </div>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  layout: 'empty',

  methods : {
    ...mapActions({
      'updateRuleForm_email': 'myAuth/login/updateRuleForm_email',
      'updateRuleForm_password': 'myAuth/login/updateRuleForm_password',
      'submitForm': 'myAuth/login/submitForm',
    })
  },

  computed: {
    ...mapGetters({
      ruleForm: 'myAuth/login/ruleForm',
      alertDanger: 'myAuth/login/alertDanger',
      placeholder: 'myAuth/login/placeholder',
    }),
  },
}
</script>

<style scoped>

</style>
