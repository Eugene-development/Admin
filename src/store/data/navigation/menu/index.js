import { mixinActions } from "~/mixins/store/test";

export const state = () => ({
  url: 'get-all-menu', //it is for mixin
  allMenu: [],
  paginateMenu: [],

  sizePage: 10,
  currentPage: 1,
  numberOfPage: 1,

  currentMenu_create: {
      name: ''
    },
  currentMenu_read: [],
  currentMenu_update: [],
  currentMenu_delete: [],

  dialogCreate: false,
  dialogRead: false,
  dialogUpdate: false,
  dialogDelete: false,

  apiCRUD: { baseURL: process.env.API_CRUD }

  //Connect MAMP (socket)
  // apiCRUD: { baseURL: 'http://crud:8888/' }
});

export const actions = {

  //CREATE
  async handleAdd ({ commit }) {
    const dialogCreate = true;
    commit('DIALOG_CREATE', dialogCreate);
  },

  currentMenuForm_create( {commit, state}, e ) {
    const currentMenu_create = {
      name: e.target.value
    };
    commit('CURRENT_MENU_CREATE', currentMenu_create)
  },

  async createMenu ({ commit, state }) {
    try {
      //Вариант работы с прокси накст
      // const response = await this.$axios.$post('/add-menu/', state.currentMenu_create);
      const response = await this.$axios.$post('add-menu', state.currentMenu_create, state.apiCRUD);
      const data = await state.allMenu.concat(response);
      const chunk = (data, size) =>
        Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
          data.slice(i * size, i * size + size)
        );
      const paginateMenu = chunk(data, state.sizePage)[state.currentPage - 1];
      const numberOfPage = Math.ceil(data.length / state.sizePage);

      commit('ALL_MENU', data);
      commit('PAGINATE_MENU', paginateMenu);
      commit('NUMBER_OF_PAGE', numberOfPage);
      //Сообщение о успехе
    } catch (e) {
      //Сообщение о ошибке
      console.error(e)
    } finally {
      const dialogCreate = false;
      commit('DIALOG_CREATE', dialogCreate)
    }
  },

  //READ
  async handleView ({ commit, state }, id) {
    const dialogRead = true;
    const data = await state.allMenu.find(item => item.id === id);
    const currentMenu_read = new Array(data);
    commit('DIALOG_READ', dialogRead);
    commit('CURRENT_MENU_READ', currentMenu_read)
  },

  // async fetch ({ commit, state}, { $config: { baseRL } }) {
  //   const { data } = await this.$axios.$get(`${baseRL}/navigation-menu`);
  //   commit('SET_MENU', data);
  // },
  async handleSizeChange({ commit, state }, sizePage) {
    const chunk = (data, size) =>
      Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
        data.slice(i * size, i * size + size)
      );
    const paginateMenu = chunk(state.allMenu, sizePage)[state.currentPage - 1];
    commit('PAGINATE_SIZE_PAGE', sizePage);
    commit('PAGINATE_MENU', paginateMenu);
  },

  async handleCurrentChange({ state, commit }, currentPage) {
    const chunk = (data, size) =>
      Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
        data.slice(i * size, i * size + size)
      );
    const paginateMenu = chunk(state.allMenu, state.sizePage)[currentPage - 1];

    commit('PAGINATE_CURRENT_PAGE', currentPage);
    commit('PAGINATE_MENU', paginateMenu);
  },


  ...mixinActions(),

  // async fetch ({ commit, state}) {
  //   const { data } = await this.$axios.$get('get-all-menu', state.apiCRUD);
  //   const chunk = (data, size) =>
  //     Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
  //       data.slice(i * size, i * size + size)
  //     );
  //   const paginateMenu = chunk(data, state.sizePage)[state.currentPage - 1];
  //   const numberOfPage = Math.ceil(data.length / state.sizePage);
  //
  //   commit('ALL_MENU', data);
  //   commit('PAGINATE_MENU', paginateMenu);
  //   commit('NUMBER_OF_PAGE', numberOfPage);
  // },

  //UPDATE
  async handleEdit ( { commit, state }, id ) {
    const dialogUpdate = true;
    const currentMenu_update = await state.allMenu.find(item => item.id === id);
    commit('DIALOG_UPDATE', dialogUpdate);
    commit('CURRENT_MENU_UPDATE', currentMenu_update)
  },

  currentMenuForm_update( {commit, state}, e ) {
    const currentMenu_update = {
      id: state.currentMenu_update.id,
      name: e.target.value
    };
    commit('CURRENT_MENU_UPDATE', currentMenu_update)
  },

  async updateMenu ({ commit, state }) {
    try {
      const url = 'update-' + state.url; // Удалить????
      console.log(state)
      console.log(url)
      await this.$axios.$put('update-menu', {
        id: state.currentMenu_update.id,
        name: state.currentMenu_update.name
      }, state.apiCRUD);
      const { data } = await this.$axios.$get('get-all-menu', state.apiCRUD);
      const chunk = (data, size) =>
        Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
          data.slice(i * size, i * size + size)
        );
      const paginateMenu = chunk(data, state.sizePage)[state.currentPage - 1];

      commit('ALL_MENU', data);
      commit('PAGINATE_MENU', paginateMenu);
    } catch (e) {
      console.error(e)
    } finally {
      const dialogUpdate = false;
      commit('DIALOG_UPDATE', dialogUpdate);
    }
  },

  //DELETE
  async handleDelete ({ commit, state }, id){
    const dialogDelete = true;
    const data = await state.allMenu.find(item => item.id === id);
    const currentMenu_delete = new Array(data);
    commit('DIALOG_DELETE', dialogDelete);
    commit('CURRENT_MENU_DELETE', currentMenu_delete)
  },

  async deleteMenu ({ commit, state } ){
    try {
      await this.$axios.$delete('delete-menu/' + state.currentMenu_delete[0].id, state.apiCRUD);
      // await this.$axios.$get('delete-menu/' + state.currentMenu_delete[0].id, state.apiCRUD);
      // const index = await state.allMenu.findIndex(item => item.id === state.currentMenu_delete[0].id);
      // const  data  = await state.allMenu.splice(index, 1);
      const { data } = await this.$axios.$get('get-all-menu', state.apiCRUD); //TODO клонируй, а не тяни снова
      const chunk = (data, size) =>
        Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
          data.slice(i * size, i * size + size)
        );
      const paginateMenu = chunk(data, state.sizePage)[state.currentPage - 1];
      commit('PAGINATE_MENU', paginateMenu);
      commit('ALL_MENU', data);



      // const chunk = (data, size) =>
      //   Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
      //     data.slice(i * size, i * size + size)
      //   );
      // const paginateMenu = chunk(data, state.sizePage)[0];
      // commit('SET_PAGINATE_MENU', paginateMenu);

    } catch (e) {
      console.error(e)
    } finally {
      const dialogDelete = false;
      commit('DIALOG_DELETE', dialogDelete)
    }
  },

  //Close Form
  dialogCreateClose ({ commit }) {
    const dialogCreate = false;
    commit('DIALOG_CREATE', dialogCreate)
  },
  dialogReadClose ({ commit }) {
    const dialogRead = false;
    commit('DIALOG_READ', dialogRead)
  },
  dialogUpdateClose ({ commit, state }) {
    const dialogUpdate = false;
    commit('DIALOG_UPDATE', dialogUpdate);
  },
  dialogDeleteClose ({ commit }) {
    const dialogDelete = false;
    commit('DIALOG_DELETE', dialogDelete);
  },
};

export const mutations = {
  ALL_MENU: (state, data) => state.allMenu = data,
  PAGINATE_MENU: (state, paginateMenu) => state.paginateMenu = paginateMenu,
  NUMBER_OF_PAGE: (state, numberOfPage) => state.numberOfPage = numberOfPage,
  PAGINATE_CURRENT_PAGE: (state, currentPage) => state.currentPage = currentPage,
  PAGINATE_SIZE_PAGE: (state, sizePage) => state.sizePage = sizePage,
  CURRENT_MENU_CREATE: (state, currentMenu_create) => state.currentMenu_create = currentMenu_create,
  CURRENT_MENU_READ: (state, currentMenu_read) => state.currentMenu_read = currentMenu_read,
  CURRENT_MENU_UPDATE: (state, currentMenu_update) => state.currentMenu_update = currentMenu_update,
  CURRENT_MENU_DELETE: (state, currentMenu_delete) => state.currentMenu_delete = currentMenu_delete,
  DIALOG_CREATE: (state, dialogCreate) => state.dialogCreate = dialogCreate,
  DIALOG_READ: (state, dialogRead) => state.dialogRead = dialogRead,
  DIALOG_UPDATE: (state, dialogUpdate) => state.dialogUpdate = dialogUpdate,
  DIALOG_DELETE: (state, dialogDelete) => state.dialogDelete = dialogDelete,
};

export const getters = {
  allMenu: state => state.allMenu,
  paginateMenu: state => state.paginateMenu,
  numberOfPage: state => state.numberOfPage,
  currentPage: state => state.currentPage,
  countMenu: state => state.allMenu.length,
  currentMenu_create: state => state.currentMenu_create,
  currentMenu_read: state => state.currentMenu_read,
  currentMenu_update: state => state.currentMenu_update,
  currentMenu_delete: state => state.currentMenu_delete,
  dialogCreate: state => state.dialogCreate,
  dialogRead: state => state.dialogRead,
  dialogUpdate: state => state.dialogUpdate,
  dialogDelete: state => state.dialogDelete,
};
