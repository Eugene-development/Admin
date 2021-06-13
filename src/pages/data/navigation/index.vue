<template>
  <div>
<!--    <Test :paginate="paginateMenu"/>-->
    <Menu />
    <HeadCatalog />
    <RubricCatalog />
    <CategoryCatalog />
  </div>
</template>

<script>

import { Test, Menu, HeadCatalog, RubricCatalog, CategoryCatalog } from '~/components';
import breadcrumbs from "~/mixins/breadcrumbs";
import tabs from "~/mixins/tabs";
// import {mapGetters} from "vuex";

export default {
  // computed: {
  //   ...mapGetters({
  //     paginateMenu: 'data/navigation/menu/paginateMenu',
  //   }),
  // },

  components: {
    Test,
    Menu,
    HeadCatalog,
    RubricCatalog,
    CategoryCatalog
  },
  mixins: [breadcrumbs, tabs],

  async asyncData({store}) {
    await store.dispatch('data/navigation/menu/fetch')
    await store.dispatch('data/navigation/catalog/head/fetch')
    await store.dispatch('data/navigation/catalog/rubric/fetch')
    await store.dispatch('data/navigation/catalog/category/fetch')
  },


  // computed: {
  //   ...mapGetters({
  //     paginateMenu: 'data/navigation/menu/paginateMenu',
  //     paginateHead: 'data/navigation/head/paginateHead',
  //   }),
  // },

  data() {
    return {
      title: 'Админ',
      // breadcrumbs: 'test'
    }
  },
  head()
  {
    return {
      title: this.title,
      // breadcrumbs: this.breadcrumbs,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'тест дескриптион'
        }
      ]

    }
  }}
</script>

