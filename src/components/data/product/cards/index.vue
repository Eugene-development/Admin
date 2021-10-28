<template>
  <div class=" px-6 py-3">
    <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-3 ">
      <div class="overflow-hidden shadow rounded-lg bg-gradient-to-b from-blueGray-200 to-gray-50 ring-2 ring-blueGray-200">
        <div class="px-2 py-1 sm:p-4">
          <dl>
            <dt class="text-sm leading-5 font-medium text-gray-600 truncate">
              Таблица:
            </dt>
            <dd class="mt-1 text-3xl leading-9 font-semibold text-gray-900">
              Продукция
            </dd>
          </dl>
        </div>
      </div>
      <div class=" shadow rounded-lg bg-gradient-to-b from-blueGray-200 to-gray-50 ring-2 ring-blueGray-200">
        <div class="px-2 py-1 sm:p-4">
          <dl>
            <dt class="text-sm mb-4 leading-5 font-medium text-gray-600 truncate">
              Выбор категории :
            </dt>
              <!-- This example requires Tailwind CSS v2.0+ -->
              <!--
                Custom select controls like this require a considerable amount of JS to implement from scratch. We're planning
                to build some low-level libraries to make this easier with popular frameworks like React, Vue, and even Alpine.js
                in the near future, but in the mean time we recommend these reference guides when building your implementation:

                https://www.w3.org/TR/wai-aria-practices/#Listbox
                https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html
              -->
              <div>
                <div class="mt-1 relative">
                  <button @click="changeVisibleCategoryCard" type="button" class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-900 focus:border-red-900 sm:text-sm" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                    <span class="block truncate text-gray-500">{{ currentCategoryCard }}</span>
                    <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <!-- Heroicon name: solid/selector -->
                      <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </span>
                  </button>

                  <!--
                    Select popover, show/hide based on select state.

                    Entering: ""
                      From: ""
                      To: ""
                    Leaving: "transition ease-in duration-100"
                      From: "opacity-100"
                      To: "opacity-0"
                  -->
                  <ul v-if="visibleCategoryCard" class="absolute z-20 mt-1 w-2xl bg-white shadow-lg max-h-80 rounded-md py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                    <!--
                      Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

                      Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
                    -->
                    <li v-for="category of allCategory" :key="category.id" class="text-gray-900 relative py-2 pl-3 pr-9 overflow-auto focus:outline-none" id="listbox-option-0" role="option">
                      <!-- Selected: "font-semibold", Not Selected: "font-normal" -->


                      <span
                        @click="setCurrentCategoryCard (category.name)"
                        class="text-gray-900 font-normal hover:text-2xl cursor-pointer relative py-2 pl-8 pr-4 hover:text-red-900">
                        {{ category.name }}
                      </span>

                      <!--
                        Checkmark, only display for selected option.

                        Highlighted: "text-white", Not Highlighted: "text-indigo-600"
                      -->
<!--                      <span class="text-red-600 absolute inset-y-0 right-0 flex items-center pr-4">-->
<!--                        &lt;!&ndash; Heroicon name: solid/check &ndash;&gt;-->
<!--                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">-->
<!--                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />-->
<!--                        </svg>-->
<!--                      </span>-->
                    </li>

                    <!-- More items... -->
                  </ul>
                </div>
              </div>
          </dl>
        </div>
      </div>
      <div class="overflow-hidden shadow rounded-lg bg-gradient-to-b from-blueGray-200 to-gray-50 ring-2 ring-blueGray-200">
        <div class="px-2 py-1 sm:p-4">
          <dl>
            <dt class="text-sm leading-5 font-medium text-gray-600 truncate">
              Поиск в таблице:
            </dt>

            <dd class="mt-1 text-3xl leading-9 font-semibold text-gray-900">
              <div class="flex-1 flex justify-center lg:justify-end py-1">
                <div class="w-full">
                  <label for="search" class="sr-only">Поиск в таблице:</label>
                  <div class="mt-2 relative shadow text-gray-400 focus-within:text-gray-400">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                      </svg>
                    </div>

                    <input
                      :value="currentSearch.value"
                      @input="getCurrentSearch"
                      @keypress.enter.prevent="searchFromTable"
                      id="search"
                      class="shadow rounded-lg block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5  text-gray-500 placeholder-gray-500 focus:outline-none focus:bg-white focus:placeholder-gray-500 focus:text-gray-900 sm:text-sm transition duration-150 ease-in-out" placeholder="Найти" type="search">

                  </div>
                </div>
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  methods: {
    ...mapActions({
      getCurrentSearch: 'data/product/getCurrentSearch',
      searchFromTable: 'data/product/searchFromTable',
      changeVisibleCategoryCard: 'data/product/changeVisibleCategoryCard',
      setCurrentCategoryCard: 'data/product/setCurrentCategoryCard'
    })
  },
  computed: {
    ...mapGetters({
      currentSearch: 'data/product/currentSearch',
      allCategory: 'data/navigation/catalog/category/allCategory',
      visibleCategoryCard: 'data/product/visibleCategoryCard',
      currentCategoryCard:'data/product/currentCategoryCard'
    }),
  },

}
</script>
