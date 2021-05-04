<template>
  <div>
    <Cards/>
    <Table />
<!--    <Table :paginateRubric="paginateRubric"/>-->
    <ReadRubricModal/>
    <CreateRubricModal/>
    <UpdateRubricModal/>
    <DeleteRubricModal/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Cards from './cards'
import Table from './table'

import ReadRubricModal from './forms/read'
import CreateRubricModal from './forms/create'
import UpdateRubricModal from './forms/update'
import DeleteRubricModal from './forms/delete'
// import RubricPagination from '~/components/data/navigation/rubric/pagination'

export default {
  // props: ['paginateRubric'],
  components: {
    Cards,
    Table,
    ReadRubricModal,
    CreateRubricModal,
    UpdateRubricModal,
    DeleteRubricModal,
  },
  methods: {
    ...mapActions({
      'handleView': 'data/navigation/catalog/rubric/handleView',
      'handleEdit': 'data/navigation/catalog/rubric/handleEdit',
      'handleDelete': 'data/navigation/catalog/rubric/handleDelete'
    })
  },


}

</script>

