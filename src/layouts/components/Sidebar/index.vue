<template>
<!--  <div class="bg-gray-800">-->
    <transition
      enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
      enter-class="-translate-x-64"
      enter-to-class="translate-x-0"
      leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
      leave-class="translate-x-0"
      leave-to-class="-translate-x-64"
    >


    <div v-if="visibleSidebar"
         class="w-64 overflow-scroll bg-gradient-to-b from-blueGray-900 to bg-blueGray-600">
<!--    <div v-if="visibleSidebar"-->
<!--         style="background-image: url(https://i.pinimg.com/736x/f8/78/ee/f878ee3241b15c880d9d8ab7e1bf948b&#45;&#45;geometry-material.jpg)"-->
<!--         class="w-64 overflow-scroll ">-->



      <div class="flex items-center flex-shrink-0 px-4 ">
        <!--        <p class="text-white items-center  text-6xl text-center w-64 pt-2">-->
        <!--          BOSs-->
        <!--        </p>-->
        <img alt="Workflow" class=" items-center  text-6xl text-center w-64 pt-2" src="/src/logo2.png">
        <!--        <img alt="Workflow" class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-on-white.svg">-->
      </div>
      <div class="mt-2 flex-grow flex flex-col">
        <nav class="flex-1 px-3 ">


          <!--Секция сайдбара "Главная"-->
          <div>
            <NuxtLink
              class="ring-2 ring-gray-100 group flex items-center px-2 py-4 my-3 text-lg leading-6 text-gray-100 font-medium rounded-md focus:outline-none focus:bg-gray-500 transition ease-in-out duration-150"
              to="/">
              <svg class="mr-4 h-6 w-6 text-gray-100 transition ease-in-out duration-150" fill="none"
                   stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
              </svg>
              Главная страница
            </NuxtLink>
          </div>
          <!--Конец секции сайдбара "Главная"-->

          <!--Секция сайдбара "Контент"-->
          <button
            class="mt-3 group w-full flex items-center px-2 pr-2 py-2 text-base leading-5 font-medium rounded-md text-gray-100 hover:text-gray-200 hover:bg-gray-500 hover:bg-opacity-25 focus:outline-none focus:bg-gray-500 focus:bg-opacity-25 transition ease-in-out duration-150"
            @click="get_visibleContent">
            <svg class="mr-4 h-4 w-5 text-gray-100 transition ease-in-out duration-150"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Контент сайта
            <svg
              :class="{'rotate-90': visibleContent}"
              class="ml-auto h-5 w-5 transform group-hover:text-gray-400 group-focus:text-gray-400 transition-colors ease-in-out duration-150"
              viewBox="0 0 20 20">
              <path d="M6 6L14 10L6 14V6Z" fill="currentColor"/>
            </svg>
          </button>
          <!-- Expandable link section, show/hide based on state. -->
          <div v-if="visibleContent" class="mt-1 space-y-1">
            <NuxtLink
              class="group w-full flex items-center pl-10 pr-2 py-2 text-sm leading-5 font-medium rounded-md text-gray-100 hover:text-gray-200 hover:bg-gray-500 hover:bg-opacity-25 focus:outline-none focus:bg-gray-500 focus:bg-opacity-25 transition ease-in-out duration-150"
              to="/data/navigation">
              <svg
                class="mr-4 h-4 w-4 text-gray-100 transition ease-in-out duration-150"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              Навигация
            </NuxtLink>
<!--            <NuxtLink-->
<!--              @click.native="get_breadcrumbs (['Контент сайта', 'Навигация'])"-->
<!--              class="group w-full flex items-center pl-10 pr-2 py-2 text-sm leading-5 font-medium rounded-md text-gray-100 hover:text-gray-200 hover:bg-gray-500 hover:bg-opacity-25 focus:outline-none focus:bg-gray-500 focus:bg-opacity-25 transition ease-in-out duration-150"-->
<!--              to="/data/navigation">-->
<!--              <svg-->
<!--                class="mr-4 h-4 w-4 text-gray-100 transition ease-in-out duration-150"-->
<!--                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">-->
<!--                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />-->
<!--              </svg>-->
<!--              Навигация-->
<!--            </NuxtLink>-->
            <NuxtLink
              class="group w-full flex items-center pl-10 pr-2 py-2 text-sm leading-5 font-medium rounded-md text-gray-100 hover:text-gray-200 hover:bg-gray-500 hover:bg-opacity-25 focus:outline-none focus:bg-gray-500 focus:bg-opacity-25 transition ease-in-out duration-150"
              to="/data/product">
              <svg
                class="mr-4 h-4 w-4 text-gray-100 transition ease-in-out duration-150"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              Каталог
            </NuxtLink>
            <NuxtLink
              class="group w-full flex items-center pl-10 pr-2 py-2 text-sm leading-5 font-medium text-gray-100 rounded-md hover:text-gray-200 hover:bg-gray-500 hover:bg-opacity-25 focus:outline-none focus:bg-gray-500 focus:bg-opacity-25 transition ease-in-out duration-150"
              to="/site/navigation/menu">
              <svg
                class="mr-4 h-4 w-4 text-gray-100 transition ease-in-out duration-150"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              Блог
            </NuxtLink>
            <NuxtLink
              class="group w-full flex items-center pl-10 pr-2 py-2 text-sm leading-5 font-medium rounded-md text-gray-100 hover:text-gray-200 hover:bg-gray-500 hover:bg-opacity-25 focus:outline-none focus:bg-gray-500 focus:bg-opacity-25 transition ease-in-out duration-150"
              to="/site/navigation/menu">
              <svg
                class="mr-4 h-4 w-4 text-gray-100 transition ease-in-out duration-150"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              Контакты
            </NuxtLink>
            <NuxtLink
              class="group w-full flex items-center pl-10 pr-2 py-2 text-sm leading-5 font-medium rounded-md text-gray-100 hover:text-gray-200 hover:bg-gray-500 hover:bg-opacity-25 focus:outline-none focus:bg-gray-500 focus:bg-opacity-25 transition ease-in-out duration-150"
              to="/site/navigation/menu">
              <svg
                class="mr-4 h-4 w-4 text-gray-100 transition ease-in-out duration-150"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              Команда
            </NuxtLink>
          </div>
          <!--Конец секции сайдбара контент-->
<!--          <button-->
<!--            class="mt-3 group w-full flex items-center px-2 pr-2 py-2 text-base leading-5 font-medium rounded-md text-gray-100  hover:text-gray-800 hover:bg-gray-500 focus:outline-none focus:bg-gray-500  transition ease-in-out duration-150"-->
<!--            @click="get_visibleContent">-->
<!--            <svg class="mr-4 h-4 w-5 text-gray-100 transition ease-in-out duration-150"-->
<!--                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />-->
<!--            </svg>-->
<!--            Реклама-->
<!--            <svg-->
<!--              :class="{ 'rotate-90': visibleContent}"-->
<!--              class="ml-auto h-5 w-5 transform group-hover:text-gray-400 group-focus:text-gray-400 transition-colors ease-in-out duration-150"-->
<!--              viewBox="0 0 20 20">-->
<!--              <path d="M6 6L14 10L6 14V6Z" fill="currentColor"/>-->
<!--            </svg>-->
<!--          </button>-->

<!--          <button-->
<!--            class="mt-3 group w-full flex items-center px-2 pr-2 py-2 text-base leading-5 font-medium rounded-md text-gray-100  hover:text-gray-800 hover:bg-gray-500 focus:outline-none focus:bg-gray-500  transition ease-in-out duration-150"-->
<!--            @click="get_visibleContent">-->
<!--            <svg class="mr-4 h-4 w-5 text-gray-100 transition ease-in-out duration-150"-->
<!--                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />-->
<!--            </svg>-->
<!--            Продажи-->
<!--            <svg-->
<!--              :class="{ 'rotate-90': visibleContent}"-->
<!--              class="ml-auto h-5 w-5 transform group-hover:text-gray-400 group-focus:text-gray-400 transition-colors ease-in-out duration-150"-->
<!--              viewBox="0 0 20 20">-->
<!--              <path d="M6 6L14 10L6 14V6Z" fill="currentColor"/>-->
<!--            </svg>-->
<!--          </button>-->

<!--          <button-->
<!--            class="mt-3 group w-full flex items-center px-2 pr-2 py-2 text-base leading-5 font-medium rounded-md text-gray-100  hover:text-gray-800 hover:bg-gray-500 focus:outline-none focus:bg-gray-500  transition ease-in-out duration-150"-->
<!--            @click="get_visibleContent">-->
<!--            <svg class="mr-4 h-4 w-5 text-gray-100 transition ease-in-out duration-150"-->
<!--                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />-->
<!--            </svg>-->
<!--            Аналитика-->
<!--            <svg-->
<!--              :class="{ 'rotate-90': visibleContent}"-->
<!--              class="ml-auto h-5 w-5 transform group-hover:text-gray-400 group-focus:text-gray-400 transition-colors ease-in-out duration-150"-->
<!--              viewBox="0 0 20 20">-->
<!--              <path d="M6 6L14 10L6 14V6Z" fill="currentColor"/>-->
<!--            </svg>-->
<!--          </button>-->

<!--          <button-->
<!--            class="mt-3 group w-full flex items-center px-2 pr-2 py-2 text-base leading-5 font-medium rounded-md text-gray-100  hover:text-gray-800 hover:bg-gray-500 focus:outline-none focus:bg-gray-500  transition ease-in-out duration-150"-->
<!--            @click="get_visibleContent">-->
<!--            <svg class="mr-4 h-4 w-5 text-gray-100 transition ease-in-out duration-150"-->
<!--                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />-->
<!--            </svg>-->
<!--            Сотрудники-->
<!--            <svg-->
<!--              :class="{ 'rotate-90': visibleContent}"-->
<!--              class="ml-auto h-5 w-5 transform group-hover:text-gray-400 group-focus:text-gray-400 transition-colors ease-in-out duration-150"-->
<!--              viewBox="0 0 20 20">-->
<!--              <path d="M6 6L14 10L6 14V6Z" fill="currentColor"/>-->
<!--            </svg>-->
<!--          </button>-->

<!--          <button-->
<!--            class="mt-3 group w-full flex items-center px-2 pr-2 py-2 text-base leading-5 font-medium rounded-md text-gray-100  hover:text-gray-800 hover:bg-gray-500 focus:outline-none focus:bg-gray-500  transition ease-in-out duration-150"-->
<!--            @click="get_visibleContent">-->
<!--            <svg class="mr-4 h-4 w-5 text-gray-100 transition ease-in-out duration-150"-->
<!--                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />-->
<!--            </svg>-->
<!--            Контрагенты-->
<!--            <svg-->
<!--              :class="{ 'rotate-90': visibleContent}"-->
<!--              class="ml-auto h-5 w-5 transform group-hover:text-gray-400 group-focus:text-gray-400 transition-colors ease-in-out duration-150"-->
<!--              viewBox="0 0 20 20">-->
<!--              <path d="M6 6L14 10L6 14V6Z" fill="currentColor"/>-->
<!--            </svg>-->
<!--          </button>-->

<!--          <button-->
<!--            class="mt-3 group w-full flex items-center px-2 pr-2 py-2 text-base leading-5 font-medium rounded-md text-gray-100  hover:text-gray-800 hover:bg-gray-500 focus:outline-none focus:bg-gray-500  transition ease-in-out duration-150"-->
<!--            @click="get_visibleContent">-->
<!--            <svg class="mr-4 h-4 w-5 text-gray-100 transition ease-in-out duration-150"-->
<!--                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />-->
<!--            </svg>-->
<!--            Сообщения-->
<!--            <svg-->
<!--              :class="{ 'rotate-90': visibleContent}"-->
<!--              class="ml-auto h-5 w-5 transform group-hover:text-gray-400 group-focus:text-gray-400 transition-colors ease-in-out duration-150"-->
<!--              viewBox="0 0 20 20">-->
<!--              <path d="M6 6L14 10L6 14V6Z" fill="currentColor"/>-->
<!--            </svg>-->
<!--          </button>-->



          <hr class="my-2">

<!--          <a href="#" class="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-100 hover:text-white hover:bg-gray-500 focus:outline-none focus:bg-gray-500 transition ease-in-out duration-150">-->
<!--            &lt;!&ndash; Heroicon name: cog &ndash;&gt;-->
<!--            <svg class="mr-4 h-6 w-6 text-gray-300 group-hover:text-gray-200 group-focus:text-gray-200 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />-->
<!--              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />-->
<!--            </svg>-->
<!--            Настройки-->
<!--          </a>-->

<!--          <a href="#" class="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-100 hover:text-white hover:bg-gray-500 focus:outline-none focus:bg-gray-500 transition ease-in-out duration-150">-->
<!--            &lt;!&ndash; Heroicon name: question-mark-circle &ndash;&gt;-->
<!--            <svg class="mr-4 h-6 w-6 text-gray-300 group-hover:text-gray-200 group-focus:text-gray-200 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />-->
<!--            </svg>-->
<!--            Вопросы-->
<!--          </a>-->

<!--          <a href="#" class="cursor-not-allowed group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-100 hover:text-white hover:bg-gray-500 focus:outline-none focus:bg-gray-500 transition ease-in-out duration-150">-->
<!--            &lt;!&ndash; Heroicon name: shield-check &ndash;&gt;-->
<!--            <svg class="mr-4 h-6 w-6 text-gray-300 group-hover:text-gray-200 group-focus:text-gray-200 transition ease-in-out duration-150" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />-->
<!--            </svg>-->
<!--            Защита-->
<!--          </a>-->

        </nav>
      </div>
    </div>
    </transition>


</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {




  methods: {
    ...mapActions({
      'get_visibleContent': 'sidebar/visibility/get_visibleContent',
      // 'get_breadcrumbs': 'navbar/breadcrumbs/get_breadcrumbs',

    })
  },

  computed: {
    ...mapGetters({
      visibleSidebar: 'sidebar/visibility/visibleSidebar',
      visibleContent: 'sidebar/visibility/visibleContent',
    }),
  },

}
</script>

