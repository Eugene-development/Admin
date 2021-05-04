<template>
  <div
    v-if="dialogCreate"
    class="fixed z-10 inset-0 overflow-y-auto w-120">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!--
        Background overlay, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
      -->
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
      <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
      <div
        class="inline-block align-bottom bg-gray-700 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <form >
          <div>
            <div>
              <div>
                <h3 class="text-lg leading-6 font-medium text-gray-100">
                  Добавить значение
                </h3>
                <p class="mt-1 text-sm leading-5 text-gray-100">
                  Таблица "Категории"
                </p>
              </div>
            </div>
            <div class="mt-8 border-t border-gray-400 pt-8">
              <div class="mt-6 ">
                <div class="mx-2 sm:col-span-3 ">
                  <label for="first_name" class="block text-sm font-medium leading-5 text-gray-100">
                    Добавьте значение
                  </label>
                  <div class="mt-1 rounded-md shadow-sm">
                    <input
                      :value="currentCategory_create.name"
                      @input="currentCategoryForm_create"
                      id="first_name"
                      class="rounded-md pl-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-8">
                  </div>
                </div>

              </div>
            </div>
          </div>
        </form>



        <div class="mt-5 sm:mt-6">
        <span class="w-full rounded-md shadow-sm">
          <button
            @click.prevent="createCategory"
            type="submit"
            class="mt-10 inline-flex justify-center w-full py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
            Добавить
          </button>
          <button
            @click="dialogCreateClose"
            type="button" class="mt-2 inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5">
            Закрыть
          </button>
        </span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      dialogCreate: 'data/navigation/catalog/category/dialogCreate',
      currentCategory_create: 'data/navigation/catalog/category/currentCategory_create',
    }),
  },
  methods: {
    ...mapActions({
      createCategory:'data/navigation/catalog/category/createCategory',
      dialogCreateClose:'data/navigation/catalog/category/dialogCreateClose',
      currentCategoryForm_create: 'data/navigation/catalog/category/currentCategoryForm_create',
    })
  }
}
</script>
