<template>
  <div>
    <Cards/>
    <Table />
<!--    <Table :paginateHead="paginateHead"/>-->
    <ReadHeadModal/>
    <CreateHeadModal/>
    <UpdateHeadModal/>
    <DeleteHeadModal/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Cards from './cards'
import Table from './table'

import ReadHeadModal from './forms/read'
import CreateHeadModal from './forms/create'
import UpdateHeadModal from './forms/update'
import DeleteHeadModal from './forms/delete'
// import HeadPagination from '~/components/data/navigation/head/pagination'

export default {
  // props: ['paginateHead'],
  components: {
    Cards,
    Table,
    ReadHeadModal,
    CreateHeadModal,
    UpdateHeadModal,
    DeleteHeadModal,
  },
  methods: {
    ...mapActions({
      'handleView': 'data/navigation/catalog/head/handleView',
      'handleEdit': 'data/navigation/catalog/head/handleEdit',
      'handleDelete': 'data/navigation/catalog/head/handleDelete'
    })
  },
}

</script>

