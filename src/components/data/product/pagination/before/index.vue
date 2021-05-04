<template>
  <div>
    <NuxtLink
      v-for="index of numberOfPage " v-show="index === 1 && currentPage > 2"
      :key="index"
      :class="{ 'bg-teal-50' : currentPage === index }"
      class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
      to="/data/product"
      @click.native="handleCurrentChange(index)">
      {{ index }}
    </NuxtLink>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  methods: {
    ...mapActions({
      'handleCurrentChange': 'data/product/handleCurrentChange',
    })
  },

  computed: {
    ...mapGetters({
      numberOfPage: 'data/product/numberOfPage',
      currentPage: 'data/product/currentPage',
      countProduct: 'data/product/countProduct',
    }),
  },
}
</script>
