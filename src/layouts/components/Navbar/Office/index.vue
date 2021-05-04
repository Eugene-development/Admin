<template>
  <div class="hidden lg:block lg:ml-4 bg-white">
    <div class="flex items-center">
      <button
        aria-label="Notifications"
        class="flex-shrink-0 p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out">
        <!-- Heroicon name: bell -->
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            stroke-linecap="round" stroke-linejoin="round"
            stroke-width="2"/>
        </svg>
      </button>

      <!-- Profile dropdown -->
      <div class="ml-4 relative flex-shrink-0">
        <div>
          <!--                  <img alt=""-->
          <!--                       class="h-8 w-8 rounded-full"-->
          <!--                       src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80">-->

          <button
            id="user-menu"
            aria-haspopup="true"
            aria-label="User menu" class="flex block px-2 py-2 text-base leading-5 text-gray-700 focus:outline-none transition duration-150 ease-in-out"
            @click="get_visibleOffice">
            Мой офис
            <svg
              :class="{'rotate-90': visibleOffice}"
              class="ml-auto px-1 h-5 w-5 transform"
              viewBox="0 0 20 20">
              <path d="M6 6L14 10L6 14V6Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
        <!--
          Profile dropdown panel, show/hide based on dropdown state.

          Entering: "transition ease-out duration-100"
            From: "transform opacity-0 scale-95"
            To: "transform opacity-100 scale-100"
          Leaving: "transition ease-in duration-75"
            From: "transform opacity-100 scale-100"
            To: "transform opacity-0 scale-95"
        -->

        <!--                  :class="{'transform opacity-100 scale-100': visibleOffice}"-->

        <transition
          enter-active-class="transition ease-out duration-100"
          enter-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >


          <div v-if="visibleOffice"
               class="z-40 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg transition ease-out duration-100 transform opacity-0 scale-95">


            <div
              v-if="!$auth.loggedIn"
              aria-labelledby="user-menu" aria-orientation="vertical"
              class="py-1 rounded-md bg-white shadow-xs "
              role="menu">
              <NuxtLink
                class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                role="menuitem"
                to="/admin/login">Вход
              </NuxtLink>
              <NuxtLink
                class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                role="menuitem"
                to="/admin/registration">Регистрация
              </NuxtLink>
            </div>


            <div
              v-if="$auth.loggedIn"
              aria-labelledby="user-menu" aria-orientation="vertical"
              class="py-1 rounded-md bg-white shadow-xs "
              role="menu">
              <NuxtLink
                class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                role="menuitem"
                to="/office/dashboard">Офис
              </NuxtLink>
              <NuxtLink
                class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                role="menuitem"
                to="#">Профиль
              </NuxtLink>
              <NuxtLink
                class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                role="menuitem"
                to="#">Настройки
              </NuxtLink>
              <NuxtLink
                class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                role="menuitem"
                to="#">Документация
              </NuxtLink>
              <button
                class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                role="menuitem"
                @click.stop.once="logout">Выход
              </button>
            </div>


          </div>
        </transition>


      </div>
    </div>
  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  methods: {
    ...mapActions({
      'get_visibleOffice': 'navbar/visibility/get_visibleOffice',
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

<style scoped>

</style>
