
export const state = () => ({
  allProduct: [],
  paginateProduct: [],

  visiblePagination: true,
  visibleCategoryFormCreate: false,
  visibleCategoryFormUpdate: false,
  visibleCategoryCard: false,
  visibleCreateProduct: false,

  visibleDownloadImage: true,
  visibleCropImage: false,
  visibleSendImage: false,
  // visibleSentImage: false,

  sizePage: 20,
  currentPage: 1,
  numberOfPage: 1,

  currentSearch: {
      value: ''
    },
  currentProduct: [],
  currentProduct_read: [],
  currentProduct_delete: [],

  currentCategoryFormCreate: 'Выбрать категорию',
  currentCategoryFormUpdate: 'Изменить категорию',


  currentCategoryCard: 'Категория',


  content: '',


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
  },



  //Connect MAMP (socket)
  // apiCRUD: { baseURL: 'http://crud:8888/' }
});

export const actions = {


  //CREATE
  async handleAdd ({ commit }) {
    const dialogCreate = true;
    commit('DIALOG_CREATE', dialogCreate);
  },

  setCurrentCategoryFormCreate ({commit, state}, payload) {
    const currentProduct = {
      category_id: payload.id,
      name: state.currentProduct.name,
      price: state.currentProduct.price,
      unit: state.currentProduct.unit,
      description: state.currentProduct.description
    };

    commit('CURRENT_PRODUCT_CREATE', currentProduct)
    commit('CURRENT_CATEGORY_FORM_CREATE', payload.name);

    const visibleCategoryFormCreate = !state.visibleCategoryFormCreate;
    commit('VISIBLE_CATEGORY_FORM_CREATE', visibleCategoryFormCreate);
  },

  setCurrentCategoryCard ({commit, state}, payload) {

    commit('CURRENT_CATEGORY_CARD', payload);

    const visibleCategoryCard = !state.visibleCategoryCard;
    commit('VISIBLE_CATEGORY_CARD', visibleCategoryCard);
  },

  changeVisibleCategoryCard({commit, state}) {
    const visibleCategoryCard = !state.visibleCategoryCard;
    commit('VISIBLE_CATEGORY_CARD', visibleCategoryCard);
  },


  currentProductForm_createName( {commit, state}, e ) {
    const currentProduct = {
      category_id: state.currentProduct.category_id,
      name: e.target.value,
      size: state.currentProduct.size,
      price: state.currentProduct.price,
      unit: state.currentProduct.unit,
      description: state.currentProduct.description
    };
    commit('CURRENT_PRODUCT_CREATE', currentProduct)
  },
  currentProductForm_createSize( {commit, state}, e ) {
    const currentProduct = {
      category_id: state.currentProduct.category_id,
      name: state.currentProduct.name,
      size: e.target.value,
      price: state.currentProduct.price,
      unit: state.currentProduct.unit,
      description: state.currentProduct.description
    };
    commit('CURRENT_PRODUCT_CREATE', currentProduct)
  },
  currentProductForm_createPrice( {commit, state}, e ) {
    const currentProduct = {
      category_id: state.currentProduct.category_id,
      name: state.currentProduct.name,
      size: state.currentProduct.size,
      price: e.target.value,
      unit: state.currentProduct.unit,
      description: state.currentProduct.description
    };
    commit('CURRENT_PRODUCT_CREATE', currentProduct)
  },
  currentProductForm_createUnit( {commit, state}, e ) {
    const currentProduct = {
      category_id: state.currentProduct.category_id,
      name: state.currentProduct.name,
      size: state.currentProduct.size,
      price: state.currentProduct.price,
      unit: e.target.value,
      description: state.currentProduct.description
    };
    commit('CURRENT_PRODUCT_CREATE', currentProduct)
  },

  //TODO с vue2-editor уже не нужно?
  currentProductForm_createDescription( {commit, state}, e ) {
    const currentProduct = {
      category_id: state.currentProduct.category_id,
      name: state.currentProduct.name,
      size: state.currentProduct.size,
      price: state.currentProduct.price,
      unit: state.currentProduct.unit,
      description: e.target.value
    };
    commit('CURRENT_PRODUCT_CREATE', currentProduct)
  },







  // onFileSelected ({commit, state}, e) {
  //   const image = e.target.files[0];
  //   console.log(image)
  //   commit('IMAGE', image);
  // },


  async createProduct ({ commit, state }) {
    try {

      const category_id = state.currentProduct.category_id;
      const name = state.currentProduct.name;
      const size = state.currentProduct.size;
      const price = state.currentProduct.price;
      const unit = state.currentProduct.unit;
      const description = state.currentProduct.description;

      const productObj = {
        category_id: category_id,
        name: name,
        unit: unit,
        description: description
      };
      const responseProduct = await this.$axios.$post('add-product', productObj, state.apiCRUD);
      commit('CREATE_PRODUCT_ID', responseProduct.id);//TODO зачем?

      const sizeObj = {
        product_id: responseProduct.id,
        size: size,
      };
      const responseSize = await this.$axios.$post('add-size', sizeObj, state.apiCRUD);

      const priceObj = {
        size_id: responseSize.id,
        price: price,
      };
      await this.$axios.$post('add-price', priceObj, state.apiCRUD);

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

      const currentCategoryFormCreate = '---';
      commit('CURRENT_CATEGORY_FORM_CREATE', currentCategoryFormCreate);


      const visibleCreateProduct = !state.visibleCreateProduct;
      commit('VISIBLE_CREATE_PRODUCT', visibleCreateProduct);



      // const dialogCreate = false;
      // commit('DIALOG_CREATE', dialogCreate)
    }
  },



  //READ
  async handleView ({ commit, state }, id) {
    const dialogRead = true;
    const data = await state.allProduct.find(item => item.id === id);
    const currentProduct_read = new Array(data);
    commit('DIALOG_READ', dialogRead);
    commit('CURRENT_PRODUCT_READ', data)
  },

  // async fetch ({ commit, state}, { $config: { baseURL } }) {
  //   const { data } = await this.$axios.$get(`${baseURL}/navigation-product`);
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

  //TODO to rename
  async getAllProduct ({ commit, state}, payload) {
    const { data } = await this.$axios.$get('get-category/' + payload, state.apiCRUD);
    const products = data[0].product;

    const chunk = (products, size) =>
      Array.from({ length: Math.ceil(products.length / size) }, (v, i) =>
        products.slice(i * size, i * size + size)
      );
    const paginateProduct = chunk(products, state.sizePage)[state.currentPage - 1];
    const numberOfPage = Math.ceil(products.length / state.sizePage);
    commit('ALL_PRODUCT', products);
    commit('PAGINATE_PRODUCT', paginateProduct);
    commit('NUMBER_OF_PAGE', numberOfPage);
  },


  //UPDATE
  async handleEdit ( { commit, state }, ID ) {
    const dialogUpdate = true;
    const product = await state.allProduct.find(item => item.id === ID);

    const id = product.id;
    const category_id = product.category_id;
    const name = product.name;
    const size_id = product.size[0].id
    const size = product.size[0].size;
    const price = product.size[0].price.price;
    const price_id = product.size[0].price.id;
    const unit = product.unit;
    const description = product.description;

    const currentProduct = {
      id: id,
      category_id: category_id,
      name: name,
      size: size,
      size_id: size_id,
      price_id: price_id,
      price: price,
      unit: unit,
      description: description
    }

    commit('DIALOG_UPDATE', dialogUpdate);
    commit('CURRENT_PRODUCT_UPDATE', currentProduct)
  },

  setCurrentCategoryFormUpdate ({commit, state}, payload) {
    const currentProduct = {
      id: state.currentProduct.id,
      category_id: payload.id,
      name: state.currentProduct.name,
      size_id: state.currentProduct.size_id,
      price_id: state.currentProduct.price_id,
      size: state.currentProduct.size,
      price: state.currentProduct.price,
      unit: state.currentProduct.unit,
      description: state.currentProduct.description
    };

    commit('CURRENT_PRODUCT_UPDATE', currentProduct)
    commit('CURRENT_CATEGORY_FORM_UPDATE', payload.name);

    const visibleCategoryFormUpdate = !state.visibleCategoryFormUpdate;
    commit('VISIBLE_CATEGORY_FORM_UPDATE', visibleCategoryFormUpdate);
  },

  currentProductForm_updateName( {commit, state}, e ) {
    const currentProduct = {
      id: state.currentProduct.id,
      category_id: state.currentProduct.category_id,
      name: e.target.value,
      size_id: state.currentProduct.size_id,
      price_id: state.currentProduct.price_id,
      size: state.currentProduct.size,
      price: state.currentProduct.price,
      unit: state.currentProduct.unit,
      description: state.currentProduct.description,
    };
    commit('CURRENT_PRODUCT_UPDATE', currentProduct)
  },

  currentProductForm_updateSize( {commit, state}, e ) {
    const currentProduct = {
      id: state.currentProduct.id,
      category_id: state.currentProduct.category_id,
      name: state.currentProduct.name,
      size_id: state.currentProduct.size_id,
      price_id: state.currentProduct.price_id,
      size: e.target.value,
      price: state.currentProduct.price,
      unit: state.currentProduct.unit,
      description: state.currentProduct.description,
    };
    commit('CURRENT_PRODUCT_UPDATE', currentProduct)
  },

  currentProductForm_updatePrice( {commit, state}, e ) {
    const currentProduct = {
      id: state.currentProduct.id,
      category_id: state.currentProduct.category_id,
      name: state.currentProduct.name,
      size_id: state.currentProduct.size_id,
      price_id: state.currentProduct.price_id,
      size: state.currentProduct.size,
      price: e.target.value,
      unit: state.currentProduct.unit,
      description: state.currentProduct.description,
    };
    commit('CURRENT_PRODUCT_UPDATE', currentProduct)
  },

  currentProductForm_updateUnit( {commit, state}, e ) {
    const currentProduct = {
      id: state.currentProduct.id,
      category_id: state.currentProduct.category_id,
      name: state.currentProduct.name,
      size_id: state.currentProduct.size_id,
      price_id: state.currentProduct.price_id,
      size: state.currentProduct.size,
      price: state.currentProduct.price,
      unit: e.target.value,
      description: state.currentProduct.description,
    };
    commit('CURRENT_PRODUCT_UPDATE', currentProduct)
  },

  currentProductForm_updateDescription( {commit, state}, e ) {
    const currentProduct = {
      id: state.currentProduct.id,
      category_id: state.currentProduct.category_id,
      name: state.currentProduct.name,
      size_id: state.currentProduct.size_id,
      price_id: state.currentProduct.price_id,
      size: state.currentProduct.size,
      price: state.currentProduct.price,
      unit: state.currentProduct.unit,
      description: e.target.value,
    };
    commit('CURRENT_PRODUCT_UPDATE', currentProduct)
  },

  async updateProduct ({ commit, state }) {
    try {

      const product_id = state.currentProduct.id;
      const category_id = state.currentProduct.category_id;
      const name = state.currentProduct.name;
      const size_id = state.currentProduct.size_id;
      const size = state.currentProduct.size;
      const price_id = state.currentProduct.price_id;
      const price = state.currentProduct.price;
      const unit = state.currentProduct.unit;
      const description = state.currentProduct.description;

      const productObj = {
        id: product_id,
        category_id: category_id,
        name: name,
        unit: unit,
        description: description
      }
      await this.$axios.$put('update-product', productObj, state.apiCRUD);

      const sizeObj = {
        id: size_id,
        product_id: product_id,
        size: size,
      };
      await this.$axios.$put('update-size', sizeObj, state.apiCRUD);

      const priceObj = {
        id: price_id,
        size_id: size_id,
        price: price,
      };
      await this.$axios.$put('update-price', priceObj, state.apiCRUD);


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

      const currentProduct = [];
      commit('CURRENT_PRODUCT_UPDATE', currentProduct)

      const currentCategoryFormUpdate = '---';
      commit('CURRENT_CATEGORY_FORM_UPDATE', currentCategoryFormUpdate);

      const dialogUpdate = false;
      commit('DIALOG_UPDATE', dialogUpdate);
    }
  },

  //DELETE
  async handleDelete ({ commit, state }, ID){
    const dialogDelete = true;
    const product = await state.allProduct.find(item => item.id === ID);


    const id = product.id;
    const name = product.name;
    const size_id = product.size[0].id
    const price = product.size[0].price.price;
    const price_id = product.size[0].price.id;
    const unit = product.unit;
    const description = product.description;

    const currentProduct_delete = {
      id: id,
      name: name,
      size_id: size_id,
      price_id: price_id,
      price: price,
      unit: unit,
      description: description
    }



    // const currentProduct_delete = new Array(product);// TODO ???
    commit('DIALOG_DELETE', dialogDelete);
    commit('CURRENT_PRODUCT_DELETE', currentProduct_delete)
  },

  async deleteProduct ({ commit, state } ){
    try {

      const product_id = state.currentProduct_delete.id;
      const size_id = state.currentProduct_delete.size_id;
      const price_id = state.currentProduct_delete.price_id;

      await this.$axios.$delete('delete-image/' + product_id, state.apiIMAGE);
      await this.$axios.$delete('delete-price/' + price_id, state.apiCRUD);
      await this.$axios.$delete('delete-size/' + size_id, state.apiCRUD);
      await this.$axios.$delete('delete-product/' + product_id, state.apiCRUD);

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

  changeVisibleCategoryFormUpdate ({commit, state}) {
    const visibleCategoryFormUpdate = !state.visibleCategoryFormUpdate;
    commit('VISIBLE_CATEGORY_FORM_UPDATE', visibleCategoryFormUpdate);
  },

  //Close Form
  dialogCreateClose ({ commit }) {
    const dialogCreate = false;
    commit('DIALOG_CREATE', dialogCreate);

    const currentCategoryFormUpdate = '---';
    commit('CURRENT_CATEGORY_FORM_UPDATE', currentCategoryFormUpdate);

    const currentProduct = [];
    commit('CURRENT_PRODUCT_UPDATE', currentProduct);

    // const visibleSentImage = false;
    // commit('VISIBLE_SENT_IMAGE', visibleSentImage);
  },
  dialogReadClose ({ commit }) {
    const dialogRead = false;
    commit('DIALOG_READ', dialogRead)
  },

  dialogUpdateClose ({ commit, state }) {
    const dialogUpdate = false;
    commit('DIALOG_UPDATE', dialogUpdate);

    const currentCategoryFormCreate = '---';
    commit('CURRENT_CATEGORY_FORM_CREATE', currentCategoryFormCreate);

    const currentProduct = [];
    commit('CURRENT_PRODUCT_CREATE', currentProduct);
  },

  dialogDeleteClose ({ commit }) {
    const dialogDelete = false;
    commit('DIALOG_DELETE', dialogDelete);
  },
};

export const mutations = {
  SET_CONTENT(state, payload) {
    state.content = payload

    state.currentProduct = {
      id: state.currentProduct.id,
      category_id: state.currentProduct.category_id,
      name: state.currentProduct.name,
      size: state.currentProduct.size,
      price: state.currentProduct.price,
      // price: state.currentProduct.size[0].price.price,//TODO при обновлении товара показывает цену
      unit: state.currentProduct.unit,
      description: state.content
    };
  },

  ALL_PRODUCT: (state, data) => state.allProduct = data,
  PAGINATE_PRODUCT: (state, paginateProduct) => state.paginateProduct = paginateProduct,
  NUMBER_OF_PAGE: (state, numberOfPage) => state.numberOfPage = numberOfPage,
  PAGINATE_CURRENT_PAGE: (state, currentPage) => state.currentPage = currentPage,
  PAGINATE_SIZE_PAGE: (state, sizePage) => state.sizePage = sizePage,
  CURRENT_PRODUCT_CREATE: (state, currentProduct) => state.currentProduct = currentProduct,
  CURRENT_PRODUCT_READ: (state, currentProduct_read) => state.currentProduct_read = currentProduct_read,
  CURRENT_PRODUCT_UPDATE: (state, currentProduct) => state.currentProduct = currentProduct,
  CURRENT_PRODUCT_DELETE: (state, currentProduct_delete) => state.currentProduct_delete = currentProduct_delete,
  CURRENT_SEARCH: (state, currentSearch) => state.currentSearch = currentSearch,
  DIALOG_CREATE: (state, dialogCreate) => state.dialogCreate = dialogCreate,
  DIALOG_READ: (state, dialogRead) => state.dialogRead = dialogRead,
  DIALOG_UPDATE: (state, dialogUpdate) => state.dialogUpdate = dialogUpdate,
  DIALOG_DELETE: (state, dialogDelete) => state.dialogDelete = dialogDelete,
  VISIBLE_CATEGORY_FORM_CREATE: (state, visibleCategoryFormCreate) => state.visibleCategoryFormCreate = visibleCategoryFormCreate,
  VISIBLE_CATEGORY_FORM_UPDATE: (state, visibleCategoryFormUpdate) => state.visibleCategoryFormUpdate = visibleCategoryFormUpdate,
  VISIBLE_CATEGORY_CARD: (state, visibleCategoryCard) => state.visibleCategoryCard = visibleCategoryCard,
  VISIBLE_CREATE_PRODUCT: (state, visibleCreateProduct) => state.visibleCreateProduct = visibleCreateProduct,
  // VISIBLE_SENT_IMAGE: (state, visibleSentImage) => state.visibleSentImage = visibleSentImage,
  CURRENT_CATEGORY_FORM_CREATE: (state, currentCategoryFormCreate) => state.currentCategoryFormCreate = currentCategoryFormCreate,
  CURRENT_CATEGORY_FORM_UPDATE: (state, currentCategoryFormUpdate) => state.currentCategoryFormUpdate = currentCategoryFormUpdate,
  CREATE_PRODUCT_ID: (state, createProductId) => state.createProductId = createProductId,
  CURRENT_CATEGORY_CARD: (state, currentCategoryCard) => state.currentCategoryCard = currentCategoryCard
};

export const getters = {
  allProduct: state => state.allProduct,
  paginateProduct: state => state.paginateProduct,
  numberOfPage: state => state.numberOfPage,
  currentPage: state => state.currentPage,

  countProduct: state => state.allProduct.length,

  currentProduct: state => state.currentProduct,
  currentProduct_read: state => state.currentProduct_read,
  currentProduct_delete: state => state.currentProduct_delete,

  currentSearch: state => state.currentSearch,
  currentCategoryFormCreate: state => state.currentCategoryFormCreate,
  currentCategoryFormUpdate: state => state.currentCategoryFormUpdate,
  currentCategoryCard: state => state.currentCategoryCard,

  dialogCreate: state => state.dialogCreate,
  dialogRead: state => state.dialogRead,
  dialogUpdate: state => state.dialogUpdate,
  dialogDelete: state => state.dialogDelete,

  visiblePagination: state => state.visiblePagination,
  visibleCategoryFormCreate: state => state.visibleCategoryFormCreate,
  visibleCategoryFormUpdate: state => state.visibleCategoryFormUpdate,
  visibleCreateProduct: state => state.visibleCreateProduct,
  visibleCategoryCard: state => state.visibleCategoryCard,
  // visibleSentImage: state => state.visibleSentImage,


  createProductId: state => state.createProductId, //TODO удалить?
};
