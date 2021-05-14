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
        class="inline-block align-bottom bg-gray-900 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <form >
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
              <div class="mt-6 ">
                <div class="mx-2 sm:col-span-3 ">
                  <label for="first_name" class="block text-sm font-medium leading-5 text-gray-100">
                    Наименование
                  </label>
                  <div class="m-2 rounded-md shadow-sm">
                    <input
                      :value="currentProduct_create.name"
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
                            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
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
                        <ul v-if="visibleCategoryFormCreate" class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                          <!--
                            Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

                            Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
                          -->
                          <li v-for="(category, idx) of allCategory" :key="category.id"
                            class="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100" id="listbox-option-0" role="option">
                            <!-- Selected: "font-semibold", Not Selected: "font-normal" -->



                            <button
                              @click="setCurrentCategoryFormCreate (category.name)"
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
                      :value="currentProduct_create.price"
                      @input="currentProductForm_createPrice"
                      id="price"
                      class="rounded-md pl-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-8">
                  </div>
                  <label for="first_name" class="block text-sm font-medium leading-5 text-gray-100">
                    Единица измерения
                  </label>
                  <div class="m-2 rounded-md shadow-sm">
                    <input
                      :value="currentProduct_create.unit"
                      @input="currentProductForm_createUnit"
                      id="unit"
                      class="rounded-md pl-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-8">
                  </div>
                  <label for="first_name" class="block text-sm font-medium leading-5 text-gray-100">
                    Описание
                  </label>

                  <div class="m-2 rounded-md shadow-sm">
                    <div class="mt-1 sm:mt-0 sm:col-span-2">
                      <textarea
                        :value="currentProduct_create.description"
                        @input="currentProductForm_createDescription"
                        id="description"
                        rows="3"
                        class="rounded-md pl-2 form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-8"></textarea>
                    </div>
                  </div>

                  <label for="first_name" class="block text-sm font-medium leading-5 text-gray-100">
                    Изображение
                  </label>

                  <div class="m-2 sm:col-span-6">
                    <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div class="space-y-1 text-center">
                        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div class="flex text-sm text-gray-600">
                          <label for="file-upload" class="p-2 mx-1 relative cursor-pointer bg-white rounded-md font-medium text-blue-900 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <span>Добавьте фото</span>
                            <input id="file-upload" name="image" type="file" class="sr-only" @change="onFileSelected">
                            <img :src="selectedFile" alt="">
                          </label>
<!--                          <p class="pl-1">или обрежьте</p>-->
                        </div>
                        <p class="text-xs text-gray-500">
                          PNG, JPG, GIF до 10MB
                        </p>
                        <button @click.prevent="upload" class="text-white">Загрузить</button>

                      </div>
                    </div>
                  </div>







<!--                  <vue-cropper-->
<!--                    ref="image"-->
<!--                    src="/src/logo.png"-->
<!--                    alt="Source Image"-->
<!--                  ></vue-cropper>-->





<!--                  <div>-->
<!--                    <h2 style="margin: 0;">Vue-CropperJS</h2>-->
<!--                    <hr>-->
<!--                    <input-->
<!--                      type="file"-->
<!--                      name="image"-->
<!--                      accept="image/*"-->
<!--                      style="font-size: 1.2em; padding: 10px 0;"-->
<!--                      @change="setImage"-->
<!--                    >-->
<!--                    <br>-->
<!--                    <div style="width: 400px; height:300px; border: 1px solid gray; display: inline-block;">-->
<!--                      <VueCropper-->
<!--                        ref="cropper"-->
<!--                        :guides="true"-->
<!--                        :view-mode="2"-->
<!--                        drag-mode="crop"-->
<!--                        :auto-crop-area="0.5"-->
<!--                        :min-container-width="250"-->
<!--                        :min-container-height="180"-->
<!--                        :background="true"-->
<!--                        :rotatable="false"-->
<!--                        :src="imgSrc"-->
<!--                        alt="Source Image"-->
<!--                        :img-style="{ 'width': '400px', 'height': '300px' }"-->
<!--                        :aspect-ratio="1"-->
<!--                      ></VueCropper>-->
<!--                    </div>-->
<!--                    <img :src="cropImg" alt="Cropped Image">-->
<!--                    &lt;!&ndash; <img-->
<!--                      :src="cropImg"-->
<!--                      style="width: 200px; height: 150px; border: 1px solid gray"-->
<!--                      alt="Cropped Image"-->
<!--                    >&ndash;&gt;-->
<!--                    <br>-->
<!--                    <br>-->

<!--                    <button @click="cropImage" v-if="imgSrc != ''" style="margin-right: 40px;">Crop</button>-->
<!--                    <button @click="rotate" v-if="imgSrc != ''">Rotate</button>-->
<!--                  </div>-->







                </div>

              </div>
            </div>
          </div>
        </form>



        <div class="mt-5 sm:mt-6">
        <span class="w-full rounded-md shadow-sm">
          <button
            @click.prevent="createProduct"
            type="submit"
            class="mt-10 inline-flex justify-center w-full py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-teal-900 hover:bg-teal-700 focus:outline-none focus:border-teal-700 focus:shadow-outline-indigo active:bg-green-700 transition duration-150 ease-in-out">
            Добавить
          </button>
          <button
            @click="dialogCreateClose"
            type="button" class="mt-2 inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-900 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5">
            Закрыть
          </button>
        </span>
        </div>
      </div>
    </div>


<!--    <ImageCropper src="/src/logo2.png"/>-->



  </div>

</template>

<script>
import axios from '@nuxtjs/axios'


// import { ImageCropper } from '~/components'


import { mapGetters, mapActions } from 'vuex'
import  VueCropper  from 'vue-cropperjs';
import "cropperjs/dist/cropper.css";

export default {

  // components : {
  //   ImageCropper
  // },


  data () {
    return {
      selectedFile: null
    }
  },

  computed: {
    ...mapGetters({
      dialogCreate: 'data/product/dialogCreate',
      currentProduct_create: 'data/product/currentProduct_create',
      allCategory: 'data/navigation/catalog/category/allCategory',
      visibleCategoryFormCreate: 'data/product/visibleCategoryFormCreate',
      currentCategoryFormCreate: 'data/product/currentCategoryFormCreate',
    }),
  },
  methods: {
    ...mapActions({
      createProduct:'data/product/createProduct',
      dialogCreateClose:'data/product/dialogCreateClose',
      currentProductForm_createName: 'data/product/currentProductForm_createName',
      currentProductForm_createPrice: 'data/product/currentProductForm_createPrice',
      currentProductForm_createUnit: 'data/product/currentProductForm_createUnit',
      currentProductForm_createDescription: 'data/product/currentProductForm_createDescription',
      changeVisibleCategoryFormCreate: 'data/product/changeVisibleCategoryFormCreate',
      setCurrentCategoryFormCreate: 'data/product/setCurrentCategoryFormCreate',
      // getImage: 'data/product/getImage',
      // uploadImage: 'data/product/uploadImage',
    }),




    onFileSelected(event) {
      // console.log(event.target.files[0]);
      // let image = e.target.files[0];
      // let reader = new FileReader();
      // reader.readAsDataURL(image);
      // reader.onload = e => {
      //   this.selectedFile = e.target.result;
      // }
      this.selectedFile = event.target.files[0]
    },
    upload(){
      const fd = new FormData;
      fd.append('image', this.selectedFile, this.selectedFile.name)
      this.$axios.$post('http://localhost:7701/upload-image', fd)
      .then(res => {
        console.log(res)
      });
      // this.$axios.$post('http://localhost:7701/upload-image', {'image': this.selectedFile});
    }




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
