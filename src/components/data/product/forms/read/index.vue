<template>
  <div
    v-if="dialogRead"
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
        class="inline-block align-bottom bg-gray-900 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <!--
          Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
          Read the documentation to get started: https://tailwindui.com/documentation
        -->
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Подробная информация
            </h3>
            <p class="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
              Таблица "Продукция"
            </p>
          </div>
          <div  class="px-4 py-5 sm:p-0">
            <dl>
              <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                <dt class="text-sm leading-5 font-medium text-gray-500">
                  id
                </dt>
                <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ currentProduct_read.id }}
                </dd>
              </div>
              <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                <dt class="text-sm leading-5 font-medium text-gray-500">
                  Наименование
                </dt>
                <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ currentProduct_read.name }}
                </dd>
              </div>
              <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">
                <dt class="text-sm leading-5 font-medium text-gray-500">
                  Размер - Цена
                </dt>
                <br>
                <dd v-for="(sizePrice, idx) in currentProduct_read.size" :key="sizePrice.id" class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ idx + 1 }}. {{ sizePrice.size }} - {{ sizePrice.price.price }} р/{{ currentProduct_read.unit }}
                </dd>
              </div>
<!--              <div class="mt-8 sm:mt-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:px-6 sm:py-5">-->
<!--                <dt class="text-sm leading-5 font-medium text-gray-500">-->
<!--                  Актуально на дату-->
<!--                </dt>-->
<!--                <dd class="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">-->
<!--                  {{ currentProduct_read.size[0].price.updated_at }}-->
<!--                </dd>-->
<!--              </div>-->
            </dl>
          </div>
        </div>
        <div class="mt-5 sm:mt-6">
        <span class="flex w-full rounded-md shadow-sm">
          <button
            @click="dialogReadClose"
            type="button"
            class="mt-2 inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-teal-900 text-base leading-6 font-medium text-white shadow-sm hover:bg-teal-800 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal transition ease-in-out duration-150 sm:text-sm sm:leading-5">
            Закрыть
          </button>
        </span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  methods: {
    ...mapActions({
      'dialogReadClose': 'data/product/dialogReadClose',
    })
  },

  computed: {
    ...mapGetters({
      dialogRead: 'data/product/dialogRead',
      currentProduct_read: 'data/product/currentProduct_read',
    }),
  },
}
</script>

<style scoped>

</style>
