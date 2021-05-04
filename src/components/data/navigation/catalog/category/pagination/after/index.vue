<template>
  <div>
    <NuxtLink
      v-for="index of numberOfPage " :key="index"
      v-show="index === numberOfPage && (numberOfPage - currentPage) > 2"
      :class="{ 'bg-teal-50' : currentPage === index }"
      @click.native="handleCurrentChange(index)"
      to="/data/navigation" class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
      {{index}}
    </NuxtLink>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  methods: {
    ...mapActions({
      'handleCurrentChange': 'data/navigation/catalog/category/handleCurrentChange',
    })
  },

  computed: {
    ...mapGetters({
      numberOfPage: 'data/navigation/catalog/category/numberOfPage',
      currentPage: 'data/navigation/catalog/category/currentPage',
      countCategory: 'data/navigation/catalog/category/countCategory',
    }),
  },
}
</script>
