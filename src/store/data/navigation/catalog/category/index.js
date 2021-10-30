
export const state = () => ({
  allCategory: [],
  paginateCategory: [],

  sizePage: 10,
  currentPage: 1,
  numberOfPage: 1,

  currentCategory_create: {
    name: ''
  },
  currentCategory_read: [],
  currentCategory_update: [],
  currentCategory_delete: [],

  dialogCreate: false,
  dialogRead: false,
  dialogUpdate: false,
  dialogDelete: false,

  visibleCategoryCart: false,

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

  currentCategoryForm_create( {commit, state}, e ) {

    const currentCategory_create = {
      name: e.target.value
    };
    commit('CURRENT_CATEGORY_CREATE', currentCategory_create)
  },

  async createCategory ({ commit, state }) {
    try {
      //Вариант работы с прокси накст
      // const response = await this.$axios.$post('/add-category/', state.currentCategory_create);
      const response = await this.$axios.$post('add-category', state.currentCategory_create, state.apiCRUD);

      const data = await state.allCategory.concat(response);

      const chunk = (data, size) =>
        Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
          data.slice(i * size, i * size + size)
        );
      const paginateCategory = chunk(data, state.sizePage)[state.currentPage - 1];

      const numberOfPage = Math.ceil(data.length / state.sizePage);

      commit('ALL_CATEGORY', data);
      commit('PAGINATE_CATEGORY', paginateCategory);
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
    const data = await state.allCategory.find(item => item.id === id);
    const currentCategory_read = new Array(data);
    commit('DIALOG_READ', dialogRead);
    commit('CURRENT_CATEGORY_READ', currentCategory_read)
  },

  // async fetch ({ commit, state}, { $config: { baseRL } }) {
  //   const { data } = await this.$axios.$get(`${baseRL}/navigation-category`);
  //   commit('SET_CATEGORY', data);
  // },
  async handleSizeChange({ commit, state }, sizePage) {
    const chunk = (data, size) =>
      Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
        data.slice(i * size, i * size + size)
      );
    const paginateCategory = chunk(state.allCategory, sizePage)[state.currentPage - 1];
    commit('PAGINATE_SIZE_PAGE', sizePage);
    commit('PAGINATE_CATEGORY', paginateCategory);
  },

  async handleCurrentChange({ state, commit }, currentPage) {
    const chunk = (data, size) =>
      Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
        data.slice(i * size, i * size + size)
      );
    const paginateCategory = chunk(state.allCategory, state.sizePage)[currentPage - 1];
    commit('PAGINATE_CURRENT_PAGE', currentPage);
    commit('PAGINATE_CATEGORY', paginateCategory);
  },


  //TODO to rename it
  async fetch ({ commit, state}) {
    const { data } = await this.$axios.$get('get-all-category', state.apiCRUD);

    //Сортировка по алфавиту
    data.sort((a, b) =>
      (a.name.toLowerCase() < b.name.toLowerCase())
        ? -1 : (a.name.toLowerCase() > b.name.toLowerCase())
        ? 1 : 0
    )

    const chunk = (data, size) =>
      Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
        data.slice(i * size, i * size + size)
      );
    const paginateCategory = chunk(data, state.sizePage)[state.currentPage - 1];
    const numberOfPage = Math.ceil(data.length / state.sizePage);

    commit('ALL_CATEGORY', data);
    commit('PAGINATE_CATEGORY', paginateCategory);
    commit('NUMBER_OF_PAGE', numberOfPage);
  },

  //UPDATE
  async handleEdit ( { commit, state }, id ) {
    const dialogUpdate = true;
    const currentCategory_update = await state.allCategory.find(item => item.id === id);
    commit('DIALOG_UPDATE', dialogUpdate);
    commit('CURRENT_CATEGORY_UPDATE', currentCategory_update)
  },

  currentCategoryForm_update( {commit, state}, e ) {
    const currentCategory_update = {
      id: state.currentCategory_update.id,
      name: e.target.value
    };
    commit('CURRENT_CATEGORY_UPDATE', currentCategory_update)
  },

  async updateCategory ({ commit, state }) {
    try {

      await this.$axios.$put('update-category', {
        id: state.currentCategory_update.id,
        name: state.currentCategory_update.name
      }, state.apiCRUD);
      const { data } = await this.$axios.$get('get-all-category', state.apiCRUD);
      commit('ALL_CATEGORY', data);

      const chunk = (data, size) =>
        Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
          data.slice(i * size, i * size + size)
        );
      const paginateCategory = chunk(data, state.sizePage)[state.currentPage - 1];
      commit('PAGINATE_CATEGORY', paginateCategory);
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
    const data = await state.allCategory.find(item => item.id === id);
    const currentCategory_delete = new Array(data);
    commit('DIALOG_DELETE', dialogDelete);
    commit('CURRENT_CATEGORY_DELETE', currentCategory_delete)
  },

  async deleteCategory ({ commit, state } ){
    try {
      await this.$axios.$delete('delete-category/' + state.currentCategory_delete[0].id, state.apiCRUD);
      // await this.$axios.$get('delete-category/' + state.currentCategory_delete[0].id, state.apiCRUD);
      // const index = await state.allCategory.findIndex(item => item.id === state.currentCategory_delete[0].id);
      // const  data  = await state.allCategory.splice(index, 1);
      const { data } = await this.$axios.$get('get-all-category', state.apiCRUD);

      const chunk = (data, size) =>
        Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
          data.slice(i * size, i * size + size)
        );
      const paginateCategory = chunk(data, state.sizePage)[state.currentPage - 1];
      commit('PAGINATE_CATEGORY', paginateCategory);
      commit('ALL_CATEGORY', data);

      // const chunk = (data, size) =>
      //   Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
      //     data.slice(i * size, i * size + size)
      //   );
      // const paginateCategory = chunk(data, state.sizePage)[0];
      // commit('SET_PAGINATE_CATEGORY', paginateCategory);

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
  dialogUpdateClose ({ commit }) {
    const dialogUpdate = false;
    commit('DIALOG_UPDATE', dialogUpdate);
  },
  dialogDeleteClose ({ commit }) {
    const dialogDelete = false;
    commit('DIALOG_DELETE', dialogDelete);
  },



  changeVisibleCategoryCart ({ commit, state }){
    const visibleCategoryCart = !state.visibleCategoryCart;
    commit('VISIBLE_CATEGORY_CART', visibleCategoryCart);
  }
};

export const mutations = {
  ALL_CATEGORY: (state, data) => state.allCategory = data,
  PAGINATE_CATEGORY: (state, paginateCategory) => state.paginateCategory = paginateCategory,
  NUMBER_OF_PAGE: (state, numberOfPage) => state.numberOfPage = numberOfPage,
  PAGINATE_CURRENT_PAGE: (state, currentPage) => state.currentPage = currentPage,
  PAGINATE_SIZE_PAGE: (state, sizePage) => state.sizePage = sizePage,
  CURRENT_CATEGORY_CREATE: (state, currentCategory_create) => state.currentCategory_create = currentCategory_create,
  CURRENT_CATEGORY_READ: (state, currentCategory_read) => state.currentCategory_read = currentCategory_read,
  CURRENT_CATEGORY_UPDATE: (state, currentCategory_update) => state.currentCategory_update = currentCategory_update,
  CURRENT_CATEGORY_DELETE: (state, currentCategory_delete) => state.currentCategory_delete = currentCategory_delete,
  DIALOG_CREATE: (state, dialogCreate) => state.dialogCreate = dialogCreate,
  DIALOG_READ: (state, dialogRead) => state.dialogRead = dialogRead,
  DIALOG_UPDATE: (state, dialogUpdate) => state.dialogUpdate = dialogUpdate,
  DIALOG_DELETE: (state, dialogDelete) => state.dialogDelete = dialogDelete,
  VISIBLE_CATEGORY_CART: (state, visibleCategoryCart) => state.visibleCategoryCart = visibleCategoryCart
};

export const getters = {
  allCategory: state => state.allCategory,

  paginateCategory: state => state.paginateCategory,
  numberOfPage: state => state.numberOfPage,
  currentPage: state => state.currentPage,

  countCategory: state => state.allCategory.length,

  currentCategory_create: state => state.currentCategory_create,
  currentCategory_read: state => state.currentCategory_read,
  currentCategory_update: state => state.currentCategory_update,
  currentCategory_delete: state => state.currentCategory_delete,

  dialogCreate: state => state.dialogCreate,
  dialogRead: state => state.dialogRead,
  dialogUpdate: state => state.dialogUpdate,
  dialogDelete: state => state.dialogDelete,

  visibleCategoryCart: state => state.visibleCategoryCart
};
