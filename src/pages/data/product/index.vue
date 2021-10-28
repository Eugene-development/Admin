<template>
  <div>
    <Product />
  </div>
</template>

<script>

import { Product } from '~/components';
import breadcrumbs from "~/mixins/breadcrumbs";
import tabs from "~/mixins/tabs";

export default {
  components: {
    Product
  },
  mixins: [breadcrumbs, tabs],

  // async asyncData({store}) {
  //   await store.dispatch('data/product/getAllProduct')
  // },

}
</script>
