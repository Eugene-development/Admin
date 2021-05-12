<template>
  <div class="relative overflow-hidden">
    <div class="relative pt-6 pb-12 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
      <div class="bg-white">
        <main>
          <div class="relative">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div class="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
                <div class="absolute inset-0">
                  <img class="h-full w-full object-cover" src="/src/photo.jpeg" alt="People working on laptops">
                  <div class="absolute inset-0 bg-gradient-to-r from-blueGray-900 to-blueGray-600" style="mix-blend-mode: multiply;"></div>
                </div>
                <div class="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                  <h1 class="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                    <span class="block text-white">Административная панель проекта</span>
                    <span class="block text-indigo-200">"Орбита"</span>
                  </h1>
                  <p class="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
                    Вы находитесь в системе под именем - {{$auth.user.name}} <br>
<!--                    Ваш статус - Владелец <br>-->
                    Ваш логин - {{$auth.user.email}} <br>
                    Статус - {{$auth.user.role}}
                  </p>
                  <div class="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                    <div class="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                      <NuxtLink to="/office/dashboard" class="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8">
                        Начать
                      </NuxtLink>
                      <button
                        class="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8"
                        role="menuitem"
                        @click.stop.once="logout">Выход
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>

  </div>

</template>

<script>
import Logo from '~/components/Logo.vue';
import breadcrumbs from "@/mixins/breadcrumbs";
import tabs from "@/mixins/tabs";
import {mapActions, mapGetters} from "vuex";

export default {
  components: {
    Logo
  },
  mixins: [breadcrumbs, tabs],

  methods: {
    ...mapActions({
      'logout': 'myAuth/logout/logout',
    })
  },

  computed: {
    ...mapGetters({
      visibleOffice: 'navbar/visibility/visibleOffice',
    }),
  },

}
</script>

