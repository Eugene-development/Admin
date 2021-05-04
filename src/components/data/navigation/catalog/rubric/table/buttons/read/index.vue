<template>
  <button
    @click="handleView (id)"
    type="button" class="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-purple-500 bg-purple-50 hover:bg-purple-200 focus:outline-none focus:border-purple-300 focus:shadow-outline-purple active:bg-purple-200 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
    <svg
      class=" h-4 w-4  duration-150"
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
      <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
    </svg>
  </button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['id'],
  methods: {
    ...mapActions({
      'handleView': 'data/navigation/catalog/rubric/handleView',
    })
  },
}
</script>

<style scoped>

</style>
