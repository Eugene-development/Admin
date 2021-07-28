<template>
  <button
    class="focus:outline-none "
    @click="change_visibleSidebar">

    <svg  v-if="visibleSidebar"
         class="flex-shrink-0 h-8 w-8 text-gray-700 animate-pulse"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd"
            d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
            fill-rule="evenodd"/>
    </svg>
    <svg v-else
         class="flex-shrink-0 h-8 w-8 text-gray-800 animate-pulse"
         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd"
            d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
            fill-rule="evenodd"/>
    </svg>

    <!--            <svg-->
    <!--              :class="{ 'rotate-180': visibleContent}"-->
    <!--              class="ml-auto h-5 w-5 transform group-hover:text-gray-400 group-focus:text-gray-400 transition-colors ease-in-out duration-150"-->
    <!--              viewBox="0 0 20 20">-->
    <!--              <path d="M6 6L14 10L6 14V6Z" fill="currentColor"/>-->
    <!--            </svg>-->
  </button>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  methods: {
    ...mapActions({
      'change_visibleSidebar': 'sidebar/visibility/change_visibleSidebar',
    })
  },

  computed: {
    ...mapGetters({
      visibleSidebar: 'sidebar/visibility/visibleSidebar',
    }),
  },
}
</script>
