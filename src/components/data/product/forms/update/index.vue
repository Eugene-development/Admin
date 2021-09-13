<template>
  <div
    v-if="dialogUpdate"
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
        <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
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
        aria-labelledby="modal-headline"
        aria-modal="true" class="inline-block align-bottom bg-gray-900 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6" role="dialog">
        <form>
              <div>
                <h3 class="text-lg leading-6 font-medium text-gray-100">
                  Изменить значение
                </h3>
                <p class="mt-1 text-sm leading-5 text-gray-100">
                  Таблица "Продукция"
                </p>
              </div>
            <div class="mt-8 border-t border-gray-400 pt-8">
              <div class="mt-6 ">
                <div class="mx-2 sm:col-span-3">
                  <label class="mt-2 block text-sm font-medium leading-5 text-gray-100" for="first_name">
                    Наименование
                  </label>
                  <div class="m-2 rounded-md shadow-sm">
                    <input
                      id="first_name"
                      :value="currentProduct.name"
                      class="rounded-md pl-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-8"
                      @input="currentProductForm_updateName">
                  </div>





                  <label for="first_name" class="block text-sm font-medium leading-5 text-gray-100">
                    Категория
                  </label>
                  <div class="m-2 rounded-md shadow-sm">
                    <div>
                      <div class="mt-1 relative">
                        <button
                          @click="changeVisibleCategoryFormUpdate"
                          type="button"
                          class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          aria-haspopup="listbox"
                          aria-expanded="true"
                          aria-labelledby="listbox-label">
                          <span class="block truncate">{{ currentProduct.name }}</span>
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
                        <ul v-if="visibleCategoryFormUpdate" class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                          <!--
                            Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

                            Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
                          -->
                          <li v-for="(category, idx) of allCategory" :key="category.id"
                              class="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100" id="listbox-option-0" role="option">
                            <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                            <button
                              @click="setCurrentCategoryFormUpdate (category)"
                              type="button">
                              <span class="font-normal block truncate">{{ category.name }}</span>
                            </button>
                            <!--
                              Checkmark, only display for selected option.

                              Highlighted: "text-white", Not Highlighted: "text-indigo-600"
                            -->
                            <!--                            <span class="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">-->
                            <!-- Heroicon name: solid/check -->
                            <!--                              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">-->
                            <!--                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />-->
                            <!--                              </svg>-->
                            <!--                            </span>-->
                          </li>

                        </ul>
                      </div>
                    </div>
                  </div>




                  <label class="mt-2 block text-sm font-medium leading-5 text-gray-100" for="first_name">
                    Цена
                  </label>
                  <div class="m-2 rounded-md shadow-sm">
                    <input
                      id="price"
                      :value="currentProduct.price"
                      class="rounded-md pl-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-8"
                      @input="currentProductForm_updatePrice">
                  </div>

                  <label for="first_name" class="block text-sm font-medium leading-5 text-gray-100">
                    Единица измерения
                  </label>
                  <div class="m-2 rounded-md shadow-sm">
                    <input
                      :value="currentProduct.unit"
                      @input="currentProductForm_updateUnit"
                      id="unit"
                      class="rounded-md pl-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-8">
                  </div>

                  <label for="first_name" class="block text-sm font-medium leading-5 text-gray-100">
                    Описание
                  </label>
                  <div class="m-2 rounded-md shadow-sm">
                    <div class="mt-1 sm:mt-0 sm:col-span-2">


                      <Editor
                        :content="$store.state.content"
                        @update="handleUpdate"
                        class="bg-white"/>

<!--                      <textarea-->
<!--                        :value="currentProduct.description"-->
<!--                        @input="currentProductForm_updateDescription"-->
<!--                        id="description"-->
<!--                        rows="3"-->
<!--                        class="rounded-md pl-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-8">-->
<!--                      </textarea>-->
                    </div>
                  </div>

                </div>

              </div>
            </div>
        </form>


        <div class="mt-8 sm:mt-6">
          <span class="w-full rounded-md shadow-sm">
            <button
              class="mt-2 inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-teal-900 text-base leading-6 font-medium text-white shadow-sm hover:bg-teal-800 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              type="submit"
              @click.prevent="updateProduct">
              Отправить и выйти
            </button>
            <button
              @click="dialogUpdateClose"
              type="button"
              class="mt-2 inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-900 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-800 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5">
              Отменить
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {mapActions, mapGetters} from 'vuex'

import  Editor  from "../../../../microcomponents/editor";
import ImageCropper from "../create/ImageCropper";


export default {
  components: {
    Editor
  },

  computed: {
    ...mapGetters({
      dialogUpdate: 'data/product/dialogUpdate',
      currentProduct: 'data/product/currentProduct',
      allCategory: 'data/navigation/catalog/category/allCategory',
      visibleCategoryFormUpdate: 'data/product/visibleCategoryFormUpdate',
      currentCategoryFormUpdate: 'data/product/currentCategoryFormUpdate',
    }),
  },

  methods: {
    handleUpdate(data) {
      this.$store.commit('data/product/SET_CONTENT', data)
    },

    ...mapActions({
      updateProduct: 'data/product/updateProduct',
      dialogUpdateClose: 'data/product/dialogUpdateClose',

      currentProductForm_updateName: 'data/product/currentProductForm_updateName',
      currentProductForm_updatePrice: 'data/product/currentProductForm_updatePrice',
      currentProductForm_updateUnit: 'data/product/currentProductForm_updateUnit',
      currentProductForm_updateDescription: 'data/product/currentProductForm_updateDescription',

      changeVisibleCategoryFormUpdate: 'data/product/changeVisibleCategoryFormUpdate',
      setCurrentCategoryFormUpdate: 'data/product/setCurrentCategoryFormUpdate',

    })
  }
}
</script>
