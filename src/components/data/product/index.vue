<template>
  <div>
    <Cards/>
    <Table />
<!--    <Table :paginateProduct="paginateProduct"/>-->
    <ReadProductModal/>
    <CreateProductModal/>
    <UpdateProductModal/>
    <DeleteProductModal/>
  </div>
</template>





<script>
import { mapActions } from 'vuex'

import Cards from './cards'
import Table from './table'

import ReadProductModal from './forms/read'
import CreateProductModal from './forms/create'
import UpdateProductModal from './forms/update'
import DeleteProductModal from './forms/delete'

export default {
  components: {
    Cards,
    Table,
    ReadProductModal,
    CreateProductModal,
    UpdateProductModal,
    DeleteProductModal,
  },
  methods: {
    ...mapActions({
      'handleView': 'data/product/handleView',
      'handleEdit': 'data/product/handleEdit',
      'handleDelete': 'data/product/handleDelete'
    })
  },
}

</script>

