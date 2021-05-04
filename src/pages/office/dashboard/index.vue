<template>
  <div>
<!--    <Test :paginate="paginateHead"/>-->

    <!--    <p>Здесь будет сводка текущей информации</p>-->
<!--    <p>Добрый день {{$auth.user.name}}</p>-->

    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="pb-5 px-4 border-b border-gray-200">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Офис
      </h3>
      <p class="mt-2 max-w-4xl text-sm text-gray-500">Здесь будет сводка текущей информации по всему проекту</p>
    </div>

  </div>
</template>

<script>
import {Test} from '~/components';



import breadcrumbs from "@/mixins/breadcrumbs";
import tabs from "@/mixins/tabs";
import {mapGetters} from "vuex";

export default {
  components: {
    Test,
  },
  computed: {
    ...mapGetters({
      paginateMenu: 'data/navigation/menu/paginateMenu',
      paginateHead: 'data/navigation/catalog/head/paginateHead',
    }),
  },


  mixins: [breadcrumbs, tabs],
  async fetch({store}) {
    // await store.dispatch('data/navigation/menu/fetch')
    // await store.dispatch('data/navigation/catalog/head/fetch')
    // await store.dispatch('data/navigation/catalog/rubric/fetch')
    // await store.dispatch('data/navigation/catalog/category/fetch')
    // await store.dispatch('data/product/fetch')
  },
}
</script>
