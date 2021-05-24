
export const state = () => ({
  allProduct: [],
  paginateProduct: [],

  visiblePagination: true,
  visibleCategoryFormCreate: false,
  visibleCreateProduct: false,

  sizePage: 20,
  currentPage: 1,
  numberOfPage: 1,

  currentSearch: {
      value: ''
    },
  currentProduct_create: {
    category_id: '',
    name: '',
    price: '',
    unit: '',
    description: ''
    },
  currentProduct_read: [],
  currentProduct_update: [],
  currentProduct_delete: [],

  currentCategoryFormCreate: '---',


  createProductId: "",

  // cropper : {},
  // destination: {},
  image: {},


  dialogCreate: false,
  dialogRead: false,
  dialogUpdate: false,
  dialogDelete: false,

  apiCRUD: {
    baseURL: process.env.API_CRUD
  },

  apiIMAGE: {
    baseURL: process.env.API_IMAGE
  }

  //Connect MAMP (socket)
  // apiCRUD: { baseURL: 'http://crud:8888/' }
});

export const actions = {


  //CREATE
  async handleAdd ({ commit }) {
    const dialogCreate = true;
    commit('DIALOG_CREATE', dialogCreate);
  },

  currentProductForm_createName( {commit, state}, e ) {
    const currentProduct_create = {
      category_id: state.currentProduct_create.category_id,
      name: e.target.value,
      price: state.currentProduct_create.price,
      unit: state.currentProduct_create.unit,
      description: state.currentProduct_create.description
    };
    commit('CURRENT_PRODUCT_CREATE', currentProduct_create)
  },
  currentProductForm_createPrice( {commit, state}, e ) {
    const currentProduct_create = {
      category_id: state.currentProduct_create.category_id,
      name: state.currentProduct_create.name,
      price: e.target.value,
      unit: state.currentProduct_create.unit,
      description: state.currentProduct_create.description
    };
    commit('CURRENT_PRODUCT_CREATE', currentProduct_create)
  },
  currentProductForm_createUnit( {commit, state}, e ) {
    const currentProduct_create = {
      category_id: state.currentProduct_create.category_id,
      name: state.currentProduct_create.name,
      price: state.currentProduct_create.price,
      unit: e.target.value,
      description: state.currentProduct_create.description
    };
    commit('CURRENT_PRODUCT_CREATE', currentProduct_create)
  },
  currentProductForm_createDescription( {commit, state}, e ) {
    const currentProduct_create = {
      category_id: state.currentProduct_create.category_id,
      name: state.currentProduct_create.name,
      price: state.currentProduct_create.price,
      unit: state.currentProduct_create.unit,
      description: e.target.value
    };
    commit('CURRENT_PRODUCT_CREATE', currentProduct_create)
  },


  setCurrentCategoryFormCreate ({commit, state}, payload) {
    const currentProduct_create = {
      category_id: payload.id,
      name: state.currentProduct_create.name,
      price: state.currentProduct_create.price,
      unit: state.currentProduct_create.unit,
      description: state.currentProduct_create.description
    };

    commit('CURRENT_PRODUCT_CREATE', currentProduct_create)




    commit('CURRENT_CATEGORY_FORM_CREATE', payload.name);

    const visibleCategoryFormCreate = !state.visibleCategoryFormCreate;
    commit('VISIBLE_CATEGORY_FORM_CREATE', visibleCategoryFormCreate);

  },




  // onFileSelected ({commit, state}, e) {
  //   const image = e.target.files[0];
  //   console.log(image)
  //   commit('IMAGE', image);
  // },

  async createProduct ({ commit, state }) {
    try {
      //Вариант работы с прокси накст
      // const response = await this.$axios.$post('/add-product/', state.currentProduct_create);
      const response = await this.$axios.$post('add-product', state.currentProduct_create, state.apiCRUD);
      commit('CREATE_PRODUCT_ID', response.id);


      const visibleCreateProduct = !state.visibleCreateProduct;
      commit('VISIBLE_CREATE_PRODUCT', visibleCreateProduct);

      const currentProduct_create = {
        category_id: '---',
        name: '',
        price: '',
        unit: '',
        description: ''
      };
      commit('CURRENT_PRODUCT_CREATE', currentProduct_create)


      // await this.$axios.$post('/upload-image', state.image ,state.apiCROPPER)

      const data = await state.allProduct.concat(response);

      const chunk = (data, size) =>
        Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
          data.slice(i * size, i * size + size)
        );
      const paginateProduct = chunk(data, state.sizePage)[state.currentPage - 1];

      const numberOfPage = Math.ceil(data.length / state.sizePage);

      commit('ALL_PRODUCT', data);
      commit('PAGINATE_PRODUCT', paginateProduct);
      commit('NUMBER_OF_PAGE', numberOfPage);

      //Сообщение о успехе

    } catch (e) {
      //Сообщение о ошибке

      console.error(e)
    } finally {


      // const dialogCreate = false;
      // commit('DIALOG_CREATE', dialogCreate)
    }
  },

  // async getImage (e) {
  //   console.log(e.target.files[0])
  //
  // },
  //
  // async uploadImage (e) {
  //   await this.$axios.$post('/upload-image')
  // },









  //READ
  async handleView ({ commit, state }, id) {
    const dialogRead = true;
    const data = await state.allProduct.find(item => item.id === id);
    const currentProduct_read = new Array(data);
    commit('DIALOG_READ', dialogRead);
    commit('CURRENT_PRODUCT_READ', currentProduct_read)
  },

  // async fetch ({ commit, state}, { $config: { baseRL } }) {
  //   const { data } = await this.$axios.$get(`${baseRL}/navigation-product`);
  //   commit('SET_PRODUCT', data);
  // },
  async handleSizeChange({ commit, state }, sizePage) {
    const chunk = (data, size) =>
      Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
        data.slice(i * size, i * size + size)
      );
    const paginateProduct = chunk(state.allProduct, sizePage)[state.currentPage - 1];
    commit('PAGINATE_SIZE_PAGE', sizePage);
    commit('PAGINATE_PRODUCT', paginateProduct);
  },

  async handleCurrentChange({ state, commit }, currentPage) {
    const chunk = (data, size) =>
      Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
        data.slice(i * size, i * size + size)
      );
    const paginateProduct = chunk(state.allProduct, state.sizePage)[currentPage - 1];
    commit('PAGINATE_CURRENT_PAGE', currentPage);
    commit('PAGINATE_PRODUCT', paginateProduct);
  },

  async fetch ({ commit, state}) {
    const { data } = await this.$axios.$get('get-all-product', state.apiCRUD);


    const chunk = (data, size) =>
      Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
        data.slice(i * size, i * size + size)
      );
    const paginateProduct = chunk(data, state.sizePage)[state.currentPage - 1];
    const numberOfPage = Math.ceil(data.length / state.sizePage);

    commit('ALL_PRODUCT', data);
    commit('PAGINATE_PRODUCT', paginateProduct);
    commit('NUMBER_OF_PAGE', numberOfPage);
  },

  //UPDATE
  async handleEdit ( { commit, state }, id ) {
    const dialogUpdate = true;
    const currentProduct_update = await state.allProduct.find(item => item.id === id);
    commit('DIALOG_UPDATE', dialogUpdate);
    commit('CURRENT_PRODUCT_UPDATE', currentProduct_update)
  },

  currentProductForm_updateName( {commit, state}, e ) {
    const currentProduct_update = {
      id: state.currentProduct_update.id,
      name: e.target.value,
      price: state.currentProduct_update.price
    };
    commit('CURRENT_PRODUCT_UPDATE', currentProduct_update)
  },

  currentProductForm_updatePrice( {commit, state}, e ) {
    const currentProduct_update = {
      id: state.currentProduct_update.id,
      name: state.currentProduct_update.name,
      price: e.target.value
    };
    commit('CURRENT_PRODUCT_UPDATE', currentProduct_update)
  },

  async updateProduct ({ commit, state }) {
    try {

      await this.$axios.$put('update-product', {
        id: state.currentProduct_update.id,
        name: state.currentProduct_update.name,
        price: state.currentProduct_update.price
      }, state.apiCRUD);
      const { data } = await this.$axios.$get('get-all-product', state.apiCRUD);
      commit('ALL_PRODUCT', data);

      const chunk = (data, size) =>
        Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
          data.slice(i * size, i * size + size)
        );
      const paginateProduct = chunk(data, state.sizePage)[state.currentPage - 1];
      commit('PAGINATE_PRODUCT', paginateProduct);
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
    const data = await state.allProduct.find(item => item.id === id);
    const currentProduct_delete = new Array(data);
    commit('DIALOG_DELETE', dialogDelete);
    commit('CURRENT_PRODUCT_DELETE', currentProduct_delete)
  },

  async deleteProduct ({ commit, state } ){
    try {
      await this.$axios.$delete('delete-image/' + state.currentProduct_delete[0].id, state.apiIMAGE);
      await this.$axios.$delete('delete-product/' + state.currentProduct_delete[0].id, state.apiCRUD);

      // await this.$axios.$get('delete-product/' + state.currentProduct_delete[0].id, state.apiCRUD);
      // const index = await state.allProduct.findIndex(item => item.id === state.currentProduct_delete[0].id);
      // const  data  = await state.allProduct.splice(index, 1);
      const { data } = await this.$axios.$get('get-all-product', state.apiCRUD);

      const chunk = (data, size) =>
        Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
          data.slice(i * size, i * size + size)
        );
      const paginateProduct = chunk(data, state.sizePage)[state.currentPage - 1];
      commit('PAGINATE_PRODUCT', paginateProduct);
      commit('ALL_PRODUCT', data);

      // const chunk = (data, size) =>
      //   Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
      //     data.slice(i * size, i * size + size)
      //   );
      // const paginateProduct = chunk(data, state.sizePage)[0];
      // commit('SET_PAGINATE_PRODUCT', paginateProduct);

    } catch (e) {
      console.error(e)
    } finally {
      const dialogDelete = false;
      commit('DIALOG_DELETE', dialogDelete)
    }
  },


  //SEARCH
  getCurrentSearch( {commit, state}, e ) {
    const currentSearch = {
      value: e.target.value
    };
    commit('CURRENT_SEARCH', currentSearch);

    const visiblePagination = false;
    commit('VISIBLE_PAGINATION', visiblePagination);//TODO I can't to see VISIBLE_PAGINATION in mutation

  },
  searchFromTable({ commit, state }) {
    const search = (text) => state.allProduct.filter(({ name }) => name.includes(text));
    const result = search(state.currentSearch.value);
    commit('PAGINATE_PRODUCT', result);
  },



  changeVisibleCategoryFormCreate ({commit, state}) {
    const visibleCategoryFormCreate = !state.visibleCategoryFormCreate;
    commit('VISIBLE_CATEGORY_FORM_CREATE', visibleCategoryFormCreate);
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
  ALL_PRODUCT: (state, data) => state.allProduct = data,
  PAGINATE_PRODUCT: (state, paginateProduct) => state.paginateProduct = paginateProduct,
  NUMBER_OF_PAGE: (state, numberOfPage) => state.numberOfPage = numberOfPage,
  PAGINATE_CURRENT_PAGE: (state, currentPage) => state.currentPage = currentPage,
  PAGINATE_SIZE_PAGE: (state, sizePage) => state.sizePage = sizePage,
  CURRENT_PRODUCT_CREATE: (state, currentProduct_create) => state.currentProduct_create = currentProduct_create,
  CURRENT_PRODUCT_READ: (state, currentProduct_read) => state.currentProduct_read = currentProduct_read,
  CURRENT_PRODUCT_UPDATE: (state, currentProduct_update) => state.currentProduct_update = currentProduct_update,
  CURRENT_PRODUCT_DELETE: (state, currentProduct_delete) => state.currentProduct_delete = currentProduct_delete,
  CURRENT_SEARCH: (state, currentSearch) => state.currentSearch = currentSearch,
  DIALOG_CREATE: (state, dialogCreate) => state.dialogCreate = dialogCreate,
  DIALOG_READ: (state, dialogRead) => state.dialogRead = dialogRead,
  DIALOG_UPDATE: (state, dialogUpdate) => state.dialogUpdate = dialogUpdate,
  DIALOG_DELETE: (state, dialogDelete) => state.dialogDelete = dialogDelete,
  VISIBLE_CATEGORY_FORM_CREATE: (state, visibleCategoryFormCreate) => state.visibleCategoryFormCreate = visibleCategoryFormCreate,
  VISIBLE_CREATE_PRODUCT: (state, visibleCreateProduct) => state.visibleCreateProduct = visibleCreateProduct,
  CURRENT_CATEGORY_FORM_CREATE: (state, currentCategoryFormCreate) => state.currentCategoryFormCreate = currentCategoryFormCreate,
  CREATE_PRODUCT_ID: (state, createProductId) => state.createProductId = createProductId,
  IMAGE: (state, image) => state.image = image,
};

export const getters = {
  allProduct: state => state.allProduct,
  paginateProduct: state => state.paginateProduct,
  numberOfPage: state => state.numberOfPage,
  currentPage: state => state.currentPage,

  countProduct: state => state.allProduct.length,

  currentProduct_create: state => state.currentProduct_create,
  currentProduct_read: state => state.currentProduct_read,
  currentProduct_update: state => state.currentProduct_update,
  currentProduct_delete: state => state.currentProduct_delete,

  currentSearch: state => state.currentSearch,
  currentCategoryFormCreate: state => state.currentCategoryFormCreate,


  dialogCreate: state => state.dialogCreate,
  dialogRead: state => state.dialogRead,
  dialogUpdate: state => state.dialogUpdate,
  dialogDelete: state => state.dialogDelete,

  visiblePagination: state => state.visiblePagination,
  visibleCategoryFormCreate: state => state.visibleCategoryFormCreate,
  visibleCreateProduct: state => state.visibleCreateProduct,

  createProductId: state => state.createProductId, //TODO удалить?
};
