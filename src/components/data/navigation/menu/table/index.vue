<template>
  <div class="flex flex-col px-6 py-2">

    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-1 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table v-if="paginateMenu.length" class="min-w-full divide-y divide-gray-200">
            <thead>
            <tr>
              <th class="px-6 py-3 bg-gray-100 text-center text-xs leading-4 font-medium text-gray-900 uppercase tracking-wider">
                id
              </th>
              <th class="px-6 py-3 bg-gray-100 text-center text-xs leading-4 font-medium text-gray-900 uppercase tracking-wider">
                заголовок
              </th>
              <th class="px-6 py-3 bg-gray-100 text-center text-xs leading-4 font-medium text-gray-900 uppercase tracking-wider">
              </th>
              <th class="px-6 py-3 bg-gray-100 text-center text-xs leading-4 font-medium text-gray-900 uppercase tracking-wider">
                Скрыть
              </th>
              <th class="px-6 py-3 bg-gray-100 text-center text-xs leading-4 font-medium text-gray-900 uppercase tracking-wider">
                Статус
              </th>
              <th class="px-6 py-3 bg-gray-100">

              </th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(menu, idx) of paginateMenu" :key="menu.id">
              <td class="px-6 py-3 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900 text-center">
                {{ menu.id }}
              </td>
              <td class="px-6 py-3 whitespace-no-wrap text-sm leading-5 text-gray-500 text-center">
                {{ menu.name }}
              </td>
              <td class="px-6 py-3 whitespace-no-wrap text-right text-sm leading-5 font-medium text-center">
              </td>
              <td class="px-6 py-3 whitespace-no-wrap text-center">
                <Toggle/>
              </td>
              <td class="px-6 py-3 whitespace-no-wrap text-center">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td class="px-6 py-3 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                <ReadButton :id="menu.id"/>
                <UpdateButton :id="menu.id"/>
                <DeleteButton :id="menu.id"/>
              </td>
            </tr>
            </tbody>
          </table>
          <div v-else class="text-center">Таблица пуста</div>
          <CreateButton/>
        </div>
      </div>
    </div>
    <MenuPagination/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

import MenuPagination from '../pagination'

import Toggle from './buttons/toggle'
import CreateButton from './buttons/create'
import ReadButton from './buttons/read'
import UpdateButton from './buttons/update'
import DeleteButton from './buttons/delete'


export default {
  // props: ['paginateMenu'],
  components: {
    Toggle,
    CreateButton,
    ReadButton,
    UpdateButton,
    DeleteButton,
    MenuPagination
  },
  methods: {
    ...mapActions({
      'handleView': 'data/navigation/menu/handleView',
      'handleEdit': 'data/navigation/menu/handleEdit',
      'handleDelete': 'data/navigation/menu/handleDelete'
    })
  },
  computed: {
    ...mapGetters({
      paginateMenu: 'data/navigation/menu/paginateMenu',
    }),
  },
}

</script>
