import {cloneDeep, forEach, merge, concat} from 'lodash';

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
  visibleSizePrice: false,
  // visibleSentImage: false,

  sizePage: 20,
  currentPage: 1,
  numberOfPage: 1,

  currentSearch: {
    value: ''
  },
  currentProduct: [],
  currentSize: [],
  currentProduct_read: [],
  currentProduct_delete: [],

  currentCategoryFormCreate: 'Выбрать категорию',
  currentCategoryFormUpdate: 'Изменить категорию',
  currentCategoryCard: 'Категория',
  content: '',


  size: {},

  sizePrice: [],

  // createProductId: "",

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
  async handleAdd({commit}) {
    const dialogCreate = true;
    commit('DIALOG_CREATE', dialogCreate);


    // let test = {
    //   a: {
    //     ggg: 8,
    //     ttt: "vnut1"
    //   },
    //   b: {
    //     ggg: 9,
    //     ttt: "vnut2"
    //   },
    // }
    //
    // let obj = {
    //   c: {
    //     ggg: 10,
    //     ttt: "vnut3"
    //   },
    // }
    //
    // let sizePrice = merge(test, obj)
    // console.log(sizePrice)


    // for (let x in sizePrice) {
    //   console.log(test[x]);
    // }


  },


  addSize({commit, state}, payload) {
    let size = [
      {
        size: payload.size,
        price: payload.price
      }
    ]
    // let sizePrice = size.push(state.sizePrice)
    const cloneSize = cloneDeep(state.sizePrice)
    // let sizeReverse = cloneSize.reverse()
    let sizePrice = concat(size, cloneSize)
    // let sizePrice = concat(emptySize, sizeReverse)
    commit('SIZE_PRICE', sizePrice)
  },

  setCurrentCategoryFormCreate({commit, state}, payload) {
    const currentProduct = {
      category_id: payload.id,
      name: state.currentProduct.name,
      // size: state.currentProduct.size,
      // price: state.currentProduct.price,
      unit: state.currentProduct.unit,
      description: state.currentProduct.description
    };

    commit('CURRENT_PRODUCT_CREATE', currentProduct)
    commit('CURRENT_CATEGORY_FORM_CREATE', payload.name);

    const visibleCategoryFormCreate = !state.visibleCategoryFormCreate;
    commit('VISIBLE_CATEGORY_FORM_CREATE', visibleCategoryFormCreate);
  },

  setCurrentCategoryCard({commit, state}, payload) {

    commit('CURRENT_CATEGORY_CARD', payload);

    const visibleCategoryCard = !state.visibleCategoryCard;
    commit('VISIBLE_CATEGORY_CARD', visibleCategoryCard);
  },

  changeVisibleCategoryCard({commit, state}) {
    const visibleCategoryCard = !state.visibleCategoryCard;
    commit('VISIBLE_CATEGORY_CARD', visibleCategoryCard);
  },

  currentProductForm_createName({commit, state}, e) {
    const currentProduct = {
      category_id: state.currentProduct.category_id,
      name: e.target.value,
      // size: state.currentProduct.size,
      // price: state.currentProduct.price,
      unit: state.currentProduct.unit,
      description: state.currentProduct.description
    };
    commit('CURRENT_PRODUCT_CREATE', currentProduct)
  },
  currentProductForm_createSize({commit, state}, e) {
    const currentSize = {
      size: e.target.value,
      price: state.currentSize.price,
    };
    commit('CURRENT_SIZE_CREATE', currentSize)
  },
  currentProductForm_createPrice({commit, state}, e) {
    const currentSize = {
      size: state.currentSize.size,
      price: e.target.value,
    };
    commit('CURRENT_SIZE_CREATE', currentSize)
  },
  currentProductForm_createUnit({commit, state}, e) {
    const currentProduct = {
      category_id: state.currentProduct.category_id,
      name: state.currentProduct.name,
      // size: state.currentProduct.size,
      // price: state.currentProduct.price,
      unit: e.target.value,
      description: state.currentProduct.description
    };
    commit('CURRENT_PRODUCT_CREATE', currentProduct)
  },

  //TODO с vue2-editor уже не нужно?
  currentProductForm_createDescription({commit, state}, e) {
    const currentProduct = {
      category_id: state.currentProduct.category_id,
      name: state.currentProduct.name,
      // size: state.currentProduct.size,
      // price: state.currentProduct.price,
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

  async createProduct({commit, state}) {
    try {

      const category_id = state.currentProduct.category_id;
      const name = state.currentProduct.name;
      const unit = state.currentProduct.unit;
      const description = state.currentProduct.description;

      const size = state.sizePrice;

      const productObj = {
        category_id: category_id,
        name: name,
        unit: unit,
        description: description
      };
      const responseProduct = await this.$axios.$post('add-product', productObj, state.apiCRUD);

      let sizePrice = merge(responseProduct, size)
      console.log(sizePrice)

      commit('CREATE_PRODUCT_ID', responseProduct.id);//для изображений

      for(let value of size) {
        const sizeObj = {
          product_id: responseProduct.id,
          size: value.size,
        };

        let responseSize = await this.$axios.$post('add-size', sizeObj, state.apiCRUD);

        const priceObj = {
          size_id: responseSize.id,
          price: value.price,
        };
        await this.$axios.$post('add-price', priceObj, state.apiCRUD);
      }



      // forEach(size, (value) => {
      //   const sizeObj = {
      //     product_id: responseProduct.id,
      //     size: value.size,
      //   };
      //
      //   let responseSize = await this.$axios.$post('add-size', sizeObj, state.apiCRUD);
      //   console.log(responseSize)
      //
      //
      //   const priceObj = {
      //     size_id: responseSize.id,
      //     price: value.price,
      //   };
      //
      //
      //   await this.$axios.$post('add-price', priceObj, state.apiCRUD);
      //
      // });
      //

      // await this.$axios.$post('/upload-image', state.image ,state.apiCROPPER)

      const data = await state.paginateProduct.concat(responseProduct);

      const chunk = (data, size) =>
        Array.from({length: Math.ceil(data.length / size)}, (v, i) =>
          data.slice(i * size, i * size + size)
        );//функция бьёт на чанки
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

      const sizePrice =  []
      commit('SIZE_PRICE', sizePrice)
      //TODO Так очищать форму может? Предпочтительно
    }
  },


  //READ
  async handleView({commit, state}, id) {
    const dialogRead = true;
    const data = await state.allProduct.find(item => item.id === id);//TODO а в allProduct ли искать?
    // const currentProduct_read = new Array(data);
    commit('DIALOG_READ', dialogRead);
    commit('CURRENT_PRODUCT_READ', data)
  },

  // async fetch ({ commit, state}, { $config: { baseURL } }) {
  //   const { data } = await this.$axios.$get(`${baseURL}/navigation-product`);
  //   commit('SET_PRODUCT', data);
  // },
  async handleSizeChange({commit, state}, sizePage) {
    const chunk = (data, size) =>
      Array.from({length: Math.ceil(data.length / size)}, (v, i) =>
        data.slice(i * size, i * size + size)
      );
    const paginateProduct = chunk(state.allProduct, sizePage)[state.currentPage - 1];
    commit('PAGINATE_SIZE_PAGE', sizePage);
    commit('PAGINATE_PRODUCT', paginateProduct);
  },

  async handleCurrentChange({state, commit}, currentPage) {
    const chunk = (data, size) =>
      Array.from({length: Math.ceil(data.length / size)}, (v, i) =>
        data.slice(i * size, i * size + size)
      );
    const paginateProduct = chunk(state.allProduct, state.sizePage)[currentPage - 1];
    commit('PAGINATE_CURRENT_PAGE', currentPage);
    commit('PAGINATE_PRODUCT', paginateProduct);
  },

  //TODO to rename Не хочет переименовываться
  async getAllProduct({commit, state}, payload) {
    const {data} = await this.$axios.$get('get-category/' + payload, state.apiCRUD);
    const products = data[0].product;

    const chunk = (products, size) =>
      Array.from({length: Math.ceil(products.length / size)}, (v, i) =>
        products.slice(i * size, i * size + size)
      );
    const paginateProduct = chunk(products, state.sizePage)[state.currentPage - 1];
    const numberOfPage = Math.ceil(products.length / state.sizePage);
    commit('ALL_PRODUCT', products);
    commit('PAGINATE_PRODUCT', paginateProduct);
    commit('NUMBER_OF_PAGE', numberOfPage);
  },


  //UPDATE
  async handleEdit({commit, state}, ID) {
    const dialogUpdate = true;
    commit('DIALOG_UPDATE', dialogUpdate);

    const product = await state.allProduct.find(item => item.id === ID);//Забирает данные из стэйта ВСЕ ПРДУКТЫ КАТЕГОРИИ

    const id = product.id;
    const category_id = product.category_id;
    const name = product.name;
    const unit = product.unit;
    const description = product.description;

    const sizePrice = product.size;
    console.log(product)
    commit('SIZE_PRICE', sizePrice)

    const currentProduct = {
      id: id,
      category_id: category_id,
      name: name,
      unit: unit,
      description: description
    }
    commit('CURRENT_PRODUCT_UPDATE', currentProduct)
  },

  handleEditSizePrice ({commit, state}, payload) {
    const visibleSizePrice = !state.visibleSizePrice;
    commit('VISIBLE_SIZE_PRICE', visibleSizePrice);

    const currentSize = {
      size_id : payload.id,
      size: payload.size,
      price_id: payload.price.id,
      price: payload.price.price,
    }

    commit('CURRENT_SIZE_UPDATE', currentSize)
  },

  currentProductForm_updateSize({commit, state}, e) {
    const currentSize = {
      size_id : state.currentSize.size_id,
      size: e.target.value,
      price_id : state.currentSize.price_id,
      price: state.currentSize.price,
    };
    commit('CURRENT_SIZE_UPDATE', currentSize)
  },
  currentProductForm_updatePrice({commit, state}, e) {
    const currentSize = {
      size_id : state.currentSize.size_id,
      size: state.currentSize.size,
      price_id : state.currentSize.price_id,
      price: e.target.value,
    };
    commit('CURRENT_SIZE_UPDATE', currentSize)
  },


  setCurrentCategoryFormUpdate({commit, state}, payload) {
    const currentProduct = {
      id: state.currentProduct.id,
      category_id: payload.id,
      name: state.currentProduct.name,
      unit: state.currentProduct.unit,
      description: state.currentProduct.description
    };

    commit('CURRENT_PRODUCT_UPDATE', currentProduct)
    commit('CURRENT_CATEGORY_FORM_UPDATE', payload.name);

    const visibleCategoryFormUpdate = !state.visibleCategoryFormUpdate;
    commit('VISIBLE_CATEGORY_FORM_UPDATE', visibleCategoryFormUpdate);
  },

  currentProductForm_updateName({commit, state}, e) {
    const currentProduct = {
      id: state.currentProduct.id,
      category_id: state.currentProduct.category_id,
      name: e.target.value,
      unit: state.currentProduct.unit,
      description: state.currentProduct.description,
    };
    commit('CURRENT_PRODUCT_UPDATE', currentProduct)
  },

  currentProductForm_updateUnit({commit, state}, e) {
    const currentProduct = {
      id: state.currentProduct.id,
      category_id: state.currentProduct.category_id,
      name: state.currentProduct.name,
      unit: e.target.value,
      description: state.currentProduct.description,
    };
    commit('CURRENT_PRODUCT_UPDATE', currentProduct)
  },

  currentProductForm_updateDescription({commit, state}, e) {
    const currentProduct = {
      id: state.currentProduct.id,
      category_id: state.currentProduct.category_id,
      name: state.currentProduct.name,
      unit: state.currentProduct.unit,
      description: e.target.value,
    };
    commit('CURRENT_PRODUCT_UPDATE', currentProduct)
  },

  async updateProduct({commit, state}) {
    try {

      const product_id = state.currentProduct.id;
      const category_id = state.currentProduct.category_id;
      const name = state.currentProduct.name;
      const size_id = state.currentSize.size_id;
      const size = state.currentSize.size;
      const price_id = state.currentSize.price_id;
      const price = state.currentSize.price;
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

      const {data} = await this.$axios.$get('get-category/' + category_id, state.apiCRUD);
      const products = data[0].product;
      const chunk = (products, size) =>
        Array.from({length: Math.ceil(products.length / size)}, (v, i) =>
          products.slice(i * size, i * size + size)
        );
      const paginateProduct = chunk(products, state.sizePage)[state.currentPage - 1];
      const numberOfPage = Math.ceil(products.length / state.sizePage);
      commit('PAGINATE_PRODUCT', paginateProduct);
      commit('NUMBER_OF_PAGE', numberOfPage);



      // const {data} = await this.$axios.$get('get-all-product', state.apiCRUD);
      commit('ALL_PRODUCT', products);

      // const chunk = (data, size) =>
      //   Array.from({length: Math.ceil(data.length / size)}, (v, i) =>
      //     data.slice(i * size, i * size + size)
      //   );
      // const paginateProduct = chunk(data, state.sizePage)[state.currentPage - 1];
      // commit('PAGINATE_PRODUCT', paginateProduct);
    } catch (e) {
      console.error(e)
    } finally {

      const currentProduct = [];
      commit('CURRENT_PRODUCT_UPDATE', currentProduct)

      const currentSize = [];
      commit('CURRENT_SIZE_UPDATE', currentSize)

      const sizePrice = [];
      commit('SIZE_PRICE', sizePrice)

      const visibleSizePrice = false;
      commit('VISIBLE_SIZE_PRICE', visibleSizePrice);


      const currentCategoryFormUpdate = '---';
      commit('CURRENT_CATEGORY_FORM_UPDATE', currentCategoryFormUpdate);

      const dialogUpdate = false;
      commit('DIALOG_UPDATE', dialogUpdate);
    }
  },

  //DELETE
  async handleDelete({commit, state}, ID) {
    const dialogDelete = true;
    const product = await state.allProduct.find(item => item.id === ID);

    const id = product.id;
    const category_id = product.category_id;
    const name = product.name;
    const unit = product.unit;
    const description = product.description;

    const currentProduct_delete = {
      id: id,
      category_id: category_id,
      name: name,
      unit: unit,
      description: description
    }

    const currentSize = product.size

    // const currentProduct_delete = new Array(product);// TODO ???
    commit('DIALOG_DELETE', dialogDelete);
    commit('CURRENT_PRODUCT_DELETE', currentProduct_delete)
    commit('CURRENT_SIZE_DELETE', currentSize)
  },

  async deleteProduct({commit, state}) {
    try {

      const product_id = state.currentProduct_delete.id;
      const currentSize = state.currentSize;
      const category_id = state.currentProduct_delete.category_id;

      // const size_id = state.currentProduct_delete.size_id;
      // const price_id = state.currentProduct_delete.price_id;

      await this.$axios.$delete('delete-image/' + product_id, state.apiIMAGE);

      for(let value of currentSize) {
        await this.$axios.$delete('delete-price/' + value.price.id, state.apiCRUD);
      }
      for(let value of currentSize) {
        await this.$axios.$delete('delete-size/' + value.id, state.apiCRUD);
      }

      await this.$axios.$delete('delete-product/' + product_id, state.apiCRUD);

      // await this.$axios.$get('delete-product/' + state.currentProduct_delete[0].id, state.apiCRUD);
      // const index = await state.allProduct.findIndex(item => item.id === state.currentProduct_delete[0].id);
      // const  data  = await state.allProduct.splice(index, 1);
      // const {data} = await this.$axios.$get('get-all-product', state.apiCRUD);
      //
      // const chunk = (data, size) =>
      //   Array.from({length: Math.ceil(data.length / size)}, (v, i) =>
      //     data.slice(i * size, i * size + size)
      //   );
      // const paginateProduct = chunk(data, state.sizePage)[state.currentPage - 1];
      // commit('PAGINATE_PRODUCT', paginateProduct);
      // commit('ALL_PRODUCT', data);
      //
      // // const chunk = (data, size) =>
      // //   Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
      // //     data.slice(i * size, i * size + size)
      // //   );
      // // const paginateProduct = chunk(data, state.sizePage)[0];
      // // commit('SET_PAGINATE_PRODUCT', paginateProduct);


      const {data} = await this.$axios.$get('get-category/' + category_id, state.apiCRUD);
      const products = data[0].product;

      const chunk = (products, size) =>
        Array.from({length: Math.ceil(products.length / size)}, (v, i) =>
          products.slice(i * size, i * size + size)
        );
      const paginateProduct = chunk(products, state.sizePage)[state.currentPage - 1];
      const numberOfPage = Math.ceil(products.length / state.sizePage);
      commit('ALL_PRODUCT', products);
      commit('PAGINATE_PRODUCT', paginateProduct);
      commit('NUMBER_OF_PAGE', numberOfPage);

    } catch (e) {
      console.error(e)
    } finally {
      const currentSize = [];
      commit('CURRENT_SIZE_UPDATE', currentSize)//TODO вообще можно одну мутацию сделать без update

      const dialogDelete = false;
      commit('DIALOG_DELETE', dialogDelete);
    }
  },


  //SEARCH
  getCurrentSearch({commit, state}, e) {
    const currentSearch = {
      value: e.target.value
    };
    commit('CURRENT_SEARCH', currentSearch);

    const visiblePagination = false;
    commit('VISIBLE_PAGINATION', visiblePagination);//TODO I can't to see VISIBLE_PAGINATION in mutation

  },
  searchFromTable({commit, state}) {
    const search = (text) => state.allProduct.filter(({name}) => name.includes(text));
    const result = search(state.currentSearch.value);
    commit('PAGINATE_PRODUCT', result);
  },


  changeVisibleCategoryFormCreate({commit, state}) {
    const visibleCategoryFormCreate = !state.visibleCategoryFormCreate;
    commit('VISIBLE_CATEGORY_FORM_CREATE', visibleCategoryFormCreate);
  },

  changeVisibleCategoryFormUpdate({commit, state}) {
    const visibleCategoryFormUpdate = !state.visibleCategoryFormUpdate;
    commit('VISIBLE_CATEGORY_FORM_UPDATE', visibleCategoryFormUpdate);
  },

  //Close Form
  dialogCreateClose({commit}) {
    const dialogCreate = false;
    commit('DIALOG_CREATE', dialogCreate);

    const currentCategoryFormUpdate = '---';
    commit('CURRENT_CATEGORY_FORM_UPDATE', currentCategoryFormUpdate);

    const currentProduct = [];
    commit('CURRENT_PRODUCT_UPDATE', currentProduct);

    // const visibleSentImage = false;
    // commit('VISIBLE_SENT_IMAGE', visibleSentImage);
  },
  dialogReadClose({commit}) {
    const dialogRead = false;
    commit('DIALOG_READ', dialogRead)
  },

  dialogUpdateClose({commit, state}) {
    const dialogUpdate = false;
    commit('DIALOG_UPDATE', dialogUpdate);

    const currentCategoryFormCreate = '---';
    commit('CURRENT_CATEGORY_FORM_CREATE', currentCategoryFormCreate);

    const currentProduct = [];
    commit('CURRENT_PRODUCT_CREATE', currentProduct);

    const currentSize = [];
    commit('CURRENT_SIZE_UPDATE', currentSize)

    const sizePrice = [];
    commit('SIZE_PRICE', sizePrice)

  },

  dialogDeleteClose({commit}) {
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
  CURRENT_SIZE_CREATE: (state, currentSize) => state.currentSize = currentSize,
  CURRENT_SIZE_UPDATE: (state, currentSize) => state.currentSize = currentSize,
  CURRENT_SIZE_DELETE: (state, currentSize) => state.currentSize = currentSize,
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
  VISIBLE_SIZE_PRICE: (state, visibleSizePrice) => state.visibleSizePrice = visibleSizePrice,
  // VISIBLE_SENT_IMAGE: (state, visibleSentImage) => state.visibleSentImage = visibleSentImage,
  CURRENT_CATEGORY_FORM_CREATE: (state, currentCategoryFormCreate) => state.currentCategoryFormCreate = currentCategoryFormCreate,
  CURRENT_CATEGORY_FORM_UPDATE: (state, currentCategoryFormUpdate) => state.currentCategoryFormUpdate = currentCategoryFormUpdate,
  CREATE_PRODUCT_ID: (state, createProductId) => state.createProductId = createProductId,
  CURRENT_CATEGORY_CARD: (state, currentCategoryCard) => state.currentCategoryCard = currentCategoryCard,
  SIZE_PRICE: (state, sizePrice) => state.sizePrice = sizePrice,
};

export const getters = {
  allProduct: state => state.allProduct,
  paginateProduct: state => state.paginateProduct,
  numberOfPage: state => state.numberOfPage,
  currentPage: state => state.currentPage,

  countProduct: state => state.allProduct.length,

  currentProduct: state => state.currentProduct,
  currentSize: state => state.currentSize,
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
  visibleSizePrice: state => state.visibleSizePrice,
  // visibleSentImage: state => state.visibleSentImage,

  createProductId: state => state.createProductId,
  sizePrice: state => state.sizePrice,
};
