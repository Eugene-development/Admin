<template>
  <div class="text-right text-sm leading-20 font-medium px-6 py-3">
    <button
      @click="handleAdd"
      type="button"
      class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-green-500 bg-green-50 hover:bg-green-300 focus:outline-none focus:border-green-300 focus:shadow-outline-green active:bg-green-200 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
      <svg
        class="h-4 w-4"
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  methods: {
    ...mapActions({
      handleAdd:'data/navigation/catalog/head/handleAdd'
    })
  },
}
</script>
