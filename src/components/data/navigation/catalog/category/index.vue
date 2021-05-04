<template>
  <div>
    <Cards/>
    <Table />
<!--    <Table :paginateCategory="paginateCategory"/>-->
    <ReadCategoryModal/>
    <CreateCategoryModal/>
    <UpdateCategoryModal/>
    <DeleteCategoryModal/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Cards from './cards'
import Table from './table'

import ReadCategoryModal from './forms/read'
import CreateCategoryModal from './forms/create'
import UpdateCategoryModal from './forms/update'
import DeleteCategoryModal from './forms/delete'

export default {
  components: {
    Cards,
    Table,
    ReadCategoryModal,
    CreateCategoryModal,
    UpdateCategoryModal,
    DeleteCategoryModal,
  },
  methods: {
    ...mapActions({
      'handleView': 'data/navigation/catalog/category/handleView',
      'handleEdit': 'data/navigation/catalog/category/handleEdit',
      'handleDelete': 'data/navigation/catalog/category/handleDelete'
    })
  },
}

</script>

