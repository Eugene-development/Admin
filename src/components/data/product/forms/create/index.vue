<template>
  <div
    v-if="dialogCreate"
    class="fixed z-10 inset-0 overflow-y-auto w-120">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!--
        Background overlay, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
      -->
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
      <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
      <div
        class="inline-block align-bottom bg-gray-900 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6"
        role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <div>
          <div>
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-100">
                Добавить значение
              </h3>
              <p class="mt-1 text-sm leading-5 text-gray-100">
                Таблица "Продукция"
              </p>
            </div>
          </div>
          <!--            TODO to clean form after send changes-->
          <div class="mt-8 border-t border-gray-400 pt-8">
            <div class="mt-1 ">
              <div class="mx-2 sm:col-span-3 ">
                <label for="first_name" class="block text-sm font-medium leading-5 text-gray-100">
                  Наименование
                </label>
                <div class="m-2 rounded-md shadow-sm">
                  <input
                    :value="currentProduct.name"
                    @input="currentProductForm_createName"
                    id="first_name"
                    class="rounded-md pl-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-8">
                </div>

                <label for="first_name" class="block text-sm font-medium leading-5 text-gray-100">
                  Категория
                </label>
                <div class="m-2 rounded-md shadow-sm">
                  <div>
                    <div class="mt-1 relative">
                      <button
                        @click="changeVisibleCategoryFormCreate"
                        type="button"
                        class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        aria-haspopup="listbox"
                        aria-expanded="true"
                        aria-labelledby="listbox-label">
                        <span class="block truncate">{{ currentCategoryFormCreate }}</span>
                        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <!-- Heroicon name: solid/selector -->
                            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                 fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd"
                                    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                    clip-rule="evenodd"/>
                            </svg>
                          </span>
                      </button>

                      <!--
                        Select popover, show/hide based on select state.

                        Entering: ""
                          From: ""
                          To: ""
                        Leaving: "transition ease-in duration-100"
                          From: "opacity-100"
                          To: "opacity-0"
                      -->
                      <ul v-if="visibleCategoryFormCreate"
                          class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                          tabindex="-1" role="listbox" aria-labelledby="listbox-label"
                          aria-activedescendant="listbox-option-3">
                        <!--
                          Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

                          Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
                        -->
                        <li v-for="(category, idx) of allCategory" :key="category.id"
                            class="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                            id="listbox-option-0" role="option">
                          <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                          <button
                            @click="setCurrentCategoryFormCreate (category)"
                            type="button">
                            <span class="font-normal block truncate">{{ category.name }}</span>
                          </button>
                          <!--
                            Checkmark, only display for selected option.

                            Highlighted: "text-white", Not Highlighted: "text-indigo-600"
                          -->
                          <!--                            <span class="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">-->
                          <!-- Heroicon name: solid/check -->
                          <!--                              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">-->
                          <!--                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />-->
                          <!--                              </svg>-->
                          <!--                            </span>-->
                        </li>

                      </ul>
                    </div>
                  </div>
                </div>

                <label for="first_name" class="block text-sm font-medium leading-5 text-gray-100">
                  Цена
                </label>
                <div class="m-2 rounded-md shadow-sm">
                  <input
                    :value="currentProduct.price"
                    @input="currentProductForm_createPrice"
                    id="price"
                    class="rounded-md pl-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-8">
                </div>
                <label for="first_name" class="block text-sm font-medium leading-5 text-gray-100">
                  Единица измерения
                </label>
                <div class="m-2 rounded-md shadow-sm">
                  <input
                    :value="currentProduct.unit"
                    @input="currentProductForm_createUnit"
                    id="unit"
                    class="rounded-md pl-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-8">
                </div>
                <label for="first_name" class="block text-sm font-medium leading-5 text-gray-100">
                  Описание
                </label>

                <div class="m-2 rounded-md shadow-sm">
                  <div class="mt-1 sm:mt-0 sm:col-span-2">

                    <Editor
                      :content="$store.state.content"
                      @update="handleUpdate"
                      class="bg-white"/>

                    <!--                                          <textarea-->
                    <!--                        :value="currentProduct.description"-->
                    <!--                        @input="currentProductForm_createDescription"-->
                    <!--                        id="description"-->
                    <!--                        rows="3"-->
                    <!--                        class="rounded-md pl-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-8"-->
                    <!--                      >-->
                    <!--                      </textarea>-->
                  </div>
                </div>
                <div v-if="!visibleSendImage" class="my-4 sm:my-3">
                    <span class="w-full rounded-md shadow-sm">
                        <button
                          @click="multiFunc1"
                          type="button"
                          class="mt-2 inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-teal-900 text-base leading-6 font-medium text-white shadow-sm hover:bg-teal-800 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                          Отправить и выйти
                        </button>
                      </span>
                </div>


<!--                <div class="mb-6 ">-->
<!--                       <span class="w-full rounded-md shadow-sm">-->
<!--                          <button v-if="!visibleCreateProduct"-->
                         <!--                                  @click.prevent="createProduct"-->
                         <!--                                  type="submit"-->
                         <!--                                  class="mt-6 inline-flex justify-center w-full py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-teal-900 hover:bg-teal-700 focus:outline-none focus:border-teal-700 focus:shadow-outline-indigo active:bg-green-700 transition duration-150 ease-in-out">-->
                         <!--                            Добавить товар-->
                         <!--                          </button>-->
                         <!--                          <p v-else-->
                         <!--                            class="mt-6 inline-flex justify-center w-full py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-teal-900 hover:bg-teal-700 focus:outline-none focus:border-teal-700 focus:shadow-outline-indigo active:bg-green-700 transition duration-150 ease-in-out">-->
                         <!--                            Товар добавлен-->
                         <!--                          </p>-->
<!--                        </span>-->
<!--                </div>-->


                <div>
                  <label for="first_name" class="block text-sm font-medium leading-5 text-gray-100">
                    Добавить изображение
                  </label>
                  <div class="m-2 sm:col-span-6">
                    <div
                      class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div class="space-y-1 text-center">
                        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none"
                             viewBox="0 0 48 48" aria-hidden="true">
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        <p class="text-xs text-gray-500">
                          PNG, JPG, GIF до 10MB
                        </p>
                        <hr>
                        <div>
                          <img ref="image" :src="selectedFile" @click="newCropper">
                        </div>
                        <div v-if="visibleDownloadImage" class="flex text-sm text-gray-600">
                          <label for="file-upload"
                                 class="mt-6 inline-flex justify-center w-full py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-teal-900 hover:bg-teal-700 focus:outline-none focus:border-teal-700 focus:shadow-outline-indigo active:bg-green-700 transition duration-150 ease-in-out"
                          >
                            <span>Загрузить фото</span>
                            <input
                              id="file-upload"
                              name="image"
                              type="file"
                              class="sr-only"
                              @change="onFileSelected"
                              @input="createProduct">
                            <!--                            <img :src="selectedFile" alt="">-->
                          </label>
                        </div>
                        <button v-if="visibleCropImage"
                                @click="crop"
                                class="mt-6 inline-flex justify-center w-full py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-teal-900 hover:bg-teal-700 focus:outline-none focus:border-teal-700 focus:shadow-outline-indigo active:bg-green-700 transition duration-150 ease-in-out"
                                type="button">
                          Обрезать
                        </button>


<!--                        <button v-if="visibleSendImage"-->
<!--                                @click="multiFunc"-->
<!--                                class="mt-6 inline-flex justify-center w-full py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-teal-900 hover:bg-teal-700 focus:outline-none focus:border-teal-700 focus:shadow-outline-indigo active:bg-green-700 transition duration-150 ease-in-out">-->
<!--                          Отправить и выйти-->
<!--                        </button>-->
                        <!--                        <p v-if="visibleSentImage"-->
                        <!--                           class="mt-6 inline-flex justify-center w-full py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-teal-900 hover:bg-teal-700 focus:outline-none focus:border-teal-700 focus:shadow-outline-indigo active:bg-green-700 transition duration-150 ease-in-out"    >-->
                        <!--                          Успешно-->
                        <!--                        </p>-->


                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>


        <div v-if="visibleSendImage" class="my-4 sm:my-3">
            <span class="w-full rounded-md shadow-sm">
                <button
                  @click="multiFunc2"
                  type="button"
                  class="mt-2 inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-teal-900 text-base leading-6 font-medium text-white shadow-sm hover:bg-teal-800 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                  Отправить и выйти
                </button>
              </span>
        </div>


        <div class="mt-5 sm:mt-6">
          <span class="w-full rounded-md shadow-sm">
<!--              <button-->
            <!--                @click="onFormReset"-->
            <!--                class="mt-6 inline-flex justify-center w-full py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-teal-900 hover:bg-teal-700 focus:outline-none focus:border-teal-700 focus:shadow-outline-indigo active:bg-green-700 transition duration-150 ease-in-out">-->
            <!--                Очистить форму-->
            <!--              </button>-->
              <button
                @click="dialogCreateClose"
                type="button"
                class="mt-2 inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-900 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-800 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                Отменить
              </button>
            </span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {mapGetters, mapActions} from 'vuex'

import Editor from "../../../../microcomponents/editor";


import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

import ImageCropper from './ImageCropper'
import "cropperjs/dist/cropper.css";

export default {

  components: {
    ImageCropper,
    Editor,
  },

  data() {
    return {
      selectedFile: null,
      cropper: null,
      cropImg: "",
      visibleDownloadImage: true,
      visibleCropImage: false,
      visibleSendImage: false,
      // visibleSentImage: false,

    }
  },

  asyncData() {
    return {
      content: "",
      pageIsMounted: false,
      isSSR: process.server ? true : false
    };
  },

  computed: {
    ...mapGetters({
      dialogCreate: 'data/product/dialogCreate',
      currentProduct: 'data/product/currentProduct',
      allCategory: 'data/navigation/catalog/category/allCategory',
      visibleCategoryFormCreate: 'data/product/visibleCategoryFormCreate',
      currentCategoryFormCreate: 'data/product/currentCategoryFormCreate',
      visibleCreateProduct: 'data/product/visibleCreateProduct',
      // visibleSentImage: 'data/product/visibleSentImage',
      createProductId: 'data/product/createProductId',
    }),
  },


  // mounted() {
  //   this.cropper = new Cropper(this.$refs.image, {
  //     autoCrop: false,
  //     zoomable: false,
  //     scalable: false,
  //     // aspectRatio: 457 / 320,
  //   })
  // },


  methods: {
    handleUpdate(data) {
      this.$store.commit('data/product/SET_CONTENT', data)
    },


    multiFunc1() {
      this.createProduct();
      this.dialogCreateClose();
    },

    multiFunc2() {
      this.upload();
      this.onFormReset();
      this.dialogCreateClose();
    },


    ...mapActions({
      // multiCreateProductDialogCreateClose: 'data/product/multiCreateProductDialogCreateClose',
      createProduct: 'data/product/createProduct',
      dialogCreateClose: 'data/product/dialogCreateClose',

      currentProductForm_createName: 'data/product/currentProductForm_createName',
      currentProductForm_createPrice: 'data/product/currentProductForm_createPrice',
      currentProductForm_createUnit: 'data/product/currentProductForm_createUnit',
      currentProductForm_createDescription: 'data/product/currentProductForm_createDescription',

      changeVisibleCategoryFormCreate: 'data/product/changeVisibleCategoryFormCreate',
      setCurrentCategoryFormCreate: 'data/product/setCurrentCategoryFormCreate',
    }),


    onFormReset() {
      if (this.cropper) {
        this.cropper.destroy()
        this.cropper = null
      }

      this.selectedFile = null;
      this.visibleDownloadImage = true;
      this.visibleSendImage = false;
      // this.$refs.form.reset()
    },


    onFileSelected(event) {
      let image = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = event => {
        this.selectedFile = event.target.result;
      };
      this.visibleDownloadImage = false;
      this.visibleCropImage = false;
      // this.visibleSentImage = false;
    },


    newCropper() {
      this.cropper = new Cropper(this.$refs.image, {
        autoCrop: false,
        zoomable: false,
        scalable: false,
        // aspectRatio: 457 / 320,
      });
      this.visibleCropImage = true;

    },


    crop() {
      this.cropImg = this.cropper.replace(this.cropper.getCroppedCanvas().toDataURL('image/jpeg'));
      this.visibleCropImage = false;
      this.visibleSendImage = true;
    },

    upload() {
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData();
        formData.append('image', blob, this.createProductId);
        this.$axios.$post('https://orbita.adminexpo.com:7741/upload-image', formData)
          .then(res => {
            console.log(res)
          });
      }, 'image/jpeg');
      this.visibleCropImage = false;
      this.visibleSendImage = false;
      // this.visibleSentImage = true;
    },


    // upload(){
    //   const fd = new FormData;
    //   fd.append('image', this.selectedFile, this.selectedFile.name)
    //   this.$axios.$post('http://localhost:7701/upload-image', fd)
    //   .then(res => {
    //     console.log(res)
    //   });
    //   // this.$axios.$post('http://localhost:7701/upload-image', {'image': this.selectedFile});
    // }


    // setImage(e) {
    //   const file = e.target.files[0];
    //   if (!file.type.includes("image/")) {
    //     alert("Please select an image file");
    //     return;
    //   }
    //   if (typeof FileReader === "function") {
    //     const reader = new FileReader();
    //     reader.onload = event => {
    //       this.imgSrc = event.target.result;
    //       // rebuild cropperjs with the updated source
    //       this.$refs.cropper.replace(event.target.result);
    //     };
    //     reader.readAsDataURL(file);
    //   } else {
    //     alert("Sorry, FileReader API not supported");
    //   }
    // },
    // cropImage() {
    //   // get image data for post processing, e.g. upload or setting image src
    //   this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    // },
    // rotate() {
    //   // guess what this does :)
    //   this.$refs.cropper.rotate(90);
    // }

  },

  // components: {
  //   VueCropper
  // },
  // data() {
  //   return {
  //     imgSrc: "",
  //     cropImg: ""
  //   };
  // },
  // props : {
  //   src: String
  // },
  // data() {
  //   return {
  //     cropper : {},
  //     destination: {},
  //     image: {},
  //   }
  // },
  // mounted() {
  //   this.image = this.$refs.image;
  //   this.cropper = new VueCropper(this.image, {
  //     zoomable: false,
  //     scalable: false,
  //     aspectRatio: 1,
  //   })
}
</script>

<!--POw2wavT6DgtLKzi6jO7-->
