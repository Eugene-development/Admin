
export const state = () => ({
  allRubric: [],
  paginateRubric: [],

  sizePage: 10,
  currentPage: 1,
  numberOfPage: 1,

  currentRubric_create: {
    name: ''
  },
  currentRubric_read: [],
  currentRubric_update: [],
  currentRubric_delete: [],

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

  currentRubricForm_create( {commit, state}, e ) {

    const currentRubric_create = {
      name: e.target.value
    };
    commit('CURRENT_RUBRIC_CREATE', currentRubric_create)
  },

  async createRubric ({ commit, state }) {
    try {
      //Вариант работы с прокси накст
      // const response = await this.$axios.$post('/add-rubric/', state.currentRubric_create);
      const response = await this.$axios.$post('add-rubric', state.currentRubric_create, state.apiCRUD);

      const data = await state.allRubric.concat(response);

      const chunk = (data, size) =>
        Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
          data.slice(i * size, i * size + size)
        );
      const paginateRubric = chunk(data, state.sizePage)[state.currentPage - 1];

      const numberOfPage = Math.ceil(data.length / state.sizePage);

      commit('ALL_RUBRIC', data);
      commit('PAGINATE_RUBRIC', paginateRubric);
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
    const data = await state.allRubric.find(item => item.id === id);
    const currentRubric_read = new Array(data);
    commit('DIALOG_READ', dialogRead);
    commit('CURRENT_RUBRIC_READ', currentRubric_read)
  },

  // async fetch ({ commit, state}, { $config: { baseRL } }) {
  //   const { data } = await this.$axios.$get(`${baseRL}/navigation-rubric`);
  //   commit('SET_RUBRIC', data);
  // },
  async handleSizeChange({ commit, state }, sizePage) {
    const chunk = (data, size) =>
      Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
        data.slice(i * size, i * size + size)
      );
    const paginateRubric = chunk(state.allRubric, sizePage)[state.currentPage - 1];
    commit('PAGINATE_SIZE_PAGE', sizePage);
    commit('PAGINATE_RUBRIC', paginateRubric);
  },

  async handleCurrentChange({ state, commit }, currentPage) {
    const chunk = (data, size) =>
      Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
        data.slice(i * size, i * size + size)
      );
    const paginateRubric = chunk(state.allRubric, state.sizePage)[currentPage - 1];
    commit('PAGINATE_CURRENT_PAGE', currentPage);
    commit('PAGINATE_RUBRIC', paginateRubric);
  },

  async fetch ({ commit, state}) {
    const { data } = await this.$axios.$get('get-all-rubric', state.apiCRUD);

    const chunk = (data, size) =>
      Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
        data.slice(i * size, i * size + size)
      );
    const paginateRubric = chunk(data, state.sizePage)[state.currentPage - 1];
    const numberOfPage = Math.ceil(data.length / state.sizePage);

    commit('ALL_RUBRIC', data);
    commit('PAGINATE_RUBRIC', paginateRubric);
    commit('NUMBER_OF_PAGE', numberOfPage);
  },

  //UPDATE
  async handleEdit ( { commit, state }, id ) {
    const dialogUpdate = true;
    const currentRubric_update = await state.allRubric.find(item => item.id === id);
    commit('DIALOG_UPDATE', dialogUpdate);
    commit('CURRENT_RUBRIC_UPDATE', currentRubric_update)
  },

  currentRubricForm_update( {commit, state}, e ) {
    const currentRubric_update = {
      id: state.currentRubric_update.id,
      name: e.target.value
    };
    commit('CURRENT_RUBRIC_UPDATE', currentRubric_update)
  },

  async updateRubric ({ commit, state }) {
    try {

      await this.$axios.$put('update-rubric', {
        id: state.currentRubric_update.id,
        name: state.currentRubric_update.name
      }, state.apiCRUD);
      const { data } = await this.$axios.$get('get-all-rubric', state.apiCRUD);
      commit('ALL_RUBRIC', data);

      const chunk = (data, size) =>
        Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
          data.slice(i * size, i * size + size)
        );
      const paginateRubric = chunk(data, state.sizePage)[state.currentPage - 1];
      commit('PAGINATE_RUBRIC', paginateRubric);
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
    const data = await state.allRubric.find(item => item.id === id);
    const currentRubric_delete = new Array(data);
    commit('DIALOG_DELETE', dialogDelete);
    commit('CURRENT_RUBRIC_DELETE', currentRubric_delete)
  },

  async deleteRubric ({ commit, state } ){
    try {
      await this.$axios.$delete('delete-rubric/' + state.currentRubric_delete[0].id, state.apiCRUD);
      // await this.$axios.$get('delete-rubric/' + state.currentRubric_delete[0].id, state.apiCRUD);
      // const index = await state.allRubric.findIndex(item => item.id === state.currentRubric_delete[0].id);
      // const  data  = await state.allRubric.splice(index, 1);
      const { data } = await this.$axios.$get('get-all-rubric', state.apiCRUD);

      const chunk = (data, size) =>
        Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
          data.slice(i * size, i * size + size)
        );
      const paginateRubric = chunk(data, state.sizePage)[state.currentPage - 1];
      commit('PAGINATE_RUBRIC', paginateRubric);
      commit('ALL_RUBRIC', data);

      // const chunk = (data, size) =>
      //   Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
      //     data.slice(i * size, i * size + size)
      //   );
      // const paginateRubric = chunk(data, state.sizePage)[0];
      // commit('SET_PAGINATE_RUBRIC', paginateRubric);

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
  ALL_RUBRIC: (state, data) => state.allRubric = data,
  PAGINATE_RUBRIC: (state, paginateRubric) => state.paginateRubric = paginateRubric,
  NUMBER_OF_PAGE: (state, numberOfPage) => state.numberOfPage = numberOfPage,
  PAGINATE_CURRENT_PAGE: (state, currentPage) => state.currentPage = currentPage,
  PAGINATE_SIZE_PAGE: (state, sizePage) => state.sizePage = sizePage,
  CURRENT_RUBRIC_CREATE: (state, currentRubric_create) => state.currentRubric_create = currentRubric_create,
  CURRENT_RUBRIC_READ: (state, currentRubric_read) => state.currentRubric_read = currentRubric_read,
  CURRENT_RUBRIC_UPDATE: (state, currentRubric_update) => state.currentRubric_update = currentRubric_update,
  CURRENT_RUBRIC_DELETE: (state, currentRubric_delete) => state.currentRubric_delete = currentRubric_delete,
  DIALOG_CREATE: (state, dialogCreate) => state.dialogCreate = dialogCreate,
  DIALOG_READ: (state, dialogRead) => state.dialogRead = dialogRead,
  DIALOG_UPDATE: (state, dialogUpdate) => state.dialogUpdate = dialogUpdate,
  DIALOG_DELETE: (state, dialogDelete) => state.dialogDelete = dialogDelete,
};

export const getters = {
  allRubric: state => state.allRubric,
  paginateRubric: state => state.paginateRubric,
  numberOfPage: state => state.numberOfPage,
  currentPage: state => state.currentPage,

  countRubric: state => state.allRubric.length,
  currentRubric_create: state => state.currentRubric_create,
  currentRubric_read: state => state.currentRubric_read,
  currentRubric_update: state => state.currentRubric_update,
  currentRubric_delete: state => state.currentRubric_delete,
  dialogCreate: state => state.dialogCreate,
  dialogRead: state => state.dialogRead,
  dialogUpdate: state => state.dialogUpdate,
  dialogDelete: state => state.dialogDelete,
};
