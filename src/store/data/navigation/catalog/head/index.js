
export const state = () => ({
  allHead: [],
  paginateHead: [],

  sizePage: 10,
  currentPage: 1,
  numberOfPage: 1,

  currentHead_create: {
      name: ''
    },
  currentHead_read: [],
  currentHead_update: [],
  currentHead_delete: [],

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

  currentHeadForm_create( {commit, state}, e ) {

    const currentHead_create = {
      name: e.target.value
    };
    commit('CURRENT_HEAD_CREATE', currentHead_create)
  },

  async createHead ({ commit, state }) {
    try {
      //Вариант работы с прокси накст
      // const response = await this.$axios.$post('/add-head/', state.currentHead_create);
      const response = await this.$axios.$post('add-head', state.currentHead_create, state.apiCRUD);

      const data = await state.allHead.concat(response);

      const chunk = (data, size) =>
        Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
          data.slice(i * size, i * size + size)
        );
      const paginateHead = chunk(data, state.sizePage)[state.currentPage - 1];

      const numberOfPage = Math.ceil(data.length / state.sizePage);

      commit('ALL_HEAD', data);
      commit('PAGINATE_HEAD', paginateHead);
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
    const data = await state.allHead.find(item => item.id === id);
    const currentHead_read = new Array(data);
    commit('DIALOG_READ', dialogRead);
    commit('CURRENT_HEAD_READ', currentHead_read)
  },

  // async fetch ({ commit, state}, { $config: { baseRL } }) {
  //   const { data } = await this.$axios.$get(`${baseRL}/navigation-head`);
  //   commit('SET_HEAD', data);
  // },
  async handleSizeChange({ commit, state }, sizePage) {
    const chunk = (data, size) =>
      Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
        data.slice(i * size, i * size + size)
      );
    const paginateHead = chunk(state.allHead, sizePage)[state.currentPage - 1];
    commit('PAGINATE_SIZE_PAGE', sizePage);
    commit('PAGINATE_HEAD', paginateHead);
  },

  async handleCurrentChange({ state, commit }, currentPage) {
    const chunk = (data, size) =>
      Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
        data.slice(i * size, i * size + size)
      );
    const paginateHead = chunk(state.allHead, state.sizePage)[currentPage - 1];
    commit('PAGINATE_CURRENT_PAGE', currentPage);
    commit('PAGINATE_HEAD', paginateHead);
  },

  async fetch ({ commit, state}) {
    const { data } = await this.$axios.$get('get-all-head', state.apiCRUD);

    const chunk = (data, size) =>
      Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
        data.slice(i * size, i * size + size)
      );
    const paginateHead = chunk(data, state.sizePage)[state.currentPage - 1];
    const numberOfPage = Math.ceil(data.length / state.sizePage);

    commit('ALL_HEAD', data);
    commit('PAGINATE_HEAD', paginateHead);
    commit('NUMBER_OF_PAGE', numberOfPage);
  },

  //UPDATE
  async handleEdit ( { commit, state }, id ) {
    const dialogUpdate = true;
    const currentHead_update = await state.allHead.find(item => item.id === id);
    commit('DIALOG_UPDATE', dialogUpdate);
    commit('CURRENT_HEAD_UPDATE', currentHead_update)
  },

  currentHeadForm_update( {commit, state}, e ) {
    const currentHead_update = {
      id: state.currentHead_update.id,
      name: e.target.value
    };
    commit('CURRENT_HEAD_UPDATE', currentHead_update)
  },

  async updateHead ({ commit, state }) {
    try {

      await this.$axios.$put('update-head', {
        id: state.currentHead_update.id,
        name: state.currentHead_update.name
      }, state.apiCRUD);
      const { data } = await this.$axios.$get('get-all-head', state.apiCRUD);
      commit('ALL_HEAD', data);

      const chunk = (data, size) =>
        Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
          data.slice(i * size, i * size + size)
        );
      const paginateHead = chunk(data, state.sizePage)[state.currentPage - 1];
      commit('PAGINATE_HEAD', paginateHead);
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
    const data = await state.allHead.find(item => item.id === id);
    const currentHead_delete = new Array(data);
    commit('DIALOG_DELETE', dialogDelete);
    commit('CURRENT_HEAD_DELETE', currentHead_delete)
  },

  async deleteHead ({ commit, state } ){
    try {
      await this.$axios.$delete('delete-head/' + state.currentHead_delete[0].id, state.apiCRUD);
      // await this.$axios.$get('delete-head/' + state.currentHead_delete[0].id, state.apiCRUD);
      // const index = await state.allHead.findIndex(item => item.id === state.currentHead_delete[0].id);
      // const  data  = await state.allHead.splice(index, 1);
      const { data } = await this.$axios.$get('get-all-head', state.apiCRUD);

      const chunk = (data, size) =>
        Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
          data.slice(i * size, i * size + size)
        );
      const paginateHead = chunk(data, state.sizePage)[state.currentPage - 1];
      commit('PAGINATE_HEAD', paginateHead);
      commit('ALL_HEAD', data);

      // const chunk = (data, size) =>
      //   Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
      //     data.slice(i * size, i * size + size)
      //   );
      // const paginateHead = chunk(data, state.sizePage)[0];
      // commit('SET_PAGINATE_HEAD', paginateHead);

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
  ALL_HEAD: (state, data) => state.allHead = data,
  PAGINATE_HEAD: (state, paginateHead) => state.paginateHead = paginateHead,
  NUMBER_OF_PAGE: (state, numberOfPage) => state.numberOfPage = numberOfPage,
  PAGINATE_CURRENT_PAGE: (state, currentPage) => state.currentPage = currentPage,
  PAGINATE_SIZE_PAGE: (state, sizePage) => state.sizePage = sizePage,
  CURRENT_HEAD_CREATE: (state, currentHead_create) => state.currentHead_create = currentHead_create,
  CURRENT_HEAD_READ: (state, currentHead_read) => state.currentHead_read = currentHead_read,
  CURRENT_HEAD_UPDATE: (state, currentHead_update) => state.currentHead_update = currentHead_update,
  CURRENT_HEAD_DELETE: (state, currentHead_delete) => state.currentHead_delete = currentHead_delete,
  DIALOG_CREATE: (state, dialogCreate) => state.dialogCreate = dialogCreate,
  DIALOG_READ: (state, dialogRead) => state.dialogRead = dialogRead,
  DIALOG_UPDATE: (state, dialogUpdate) => state.dialogUpdate = dialogUpdate,
  DIALOG_DELETE: (state, dialogDelete) => state.dialogDelete = dialogDelete,
};

export const getters = {
  allHead: state => state.allHead,
  paginateHead: state => state.paginateHead,
  numberOfPage: state => state.numberOfPage,
  currentPage: state => state.currentPage,

  countHead: state => state.allHead.length,
  currentHead_create: state => state.currentHead_create,
  currentHead_read: state => state.currentHead_read,
  currentHead_update: state => state.currentHead_update,
  currentHead_delete: state => state.currentHead_delete,
  dialogCreate: state => state.dialogCreate,
  dialogRead: state => state.dialogRead,
  dialogUpdate: state => state.dialogUpdate,
  dialogDelete: state => state.dialogDelete,
};
