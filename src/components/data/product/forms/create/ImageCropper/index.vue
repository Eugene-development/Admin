<template>
  <div>
    <div>
      <img ref="image" :src="src">
    </div>
    <button v-if="visibleSendImage"
      @click="crop"
      class="mt-6 inline-flex justify-center w-full py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-teal-900 hover:bg-teal-700 focus:outline-none focus:border-teal-700 focus:shadow-outline-indigo active:bg-green-700 transition duration-150 ease-in-out"      type="button">
      Обрезать
    </button>
    <button v-if="visibleSendImage"
      @click.prevent.once="upload"
            class="mt-6 inline-flex justify-center w-full py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-teal-900 hover:bg-teal-700 focus:outline-none focus:border-teal-700 focus:shadow-outline-indigo active:bg-green-700 transition duration-150 ease-in-out"    >
      Отправить
    </button>
    <p v-else
       class="mt-6 inline-flex justify-center w-full py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-teal-900 hover:bg-teal-700 focus:outline-none focus:border-teal-700 focus:shadow-outline-indigo active:bg-green-700 transition duration-150 ease-in-out"    >
      Изображение отправлено
    </p>


  </div>
</template>
<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    src: String
  },
  data: () => ({
    cropper: null,
    cropImg: "",
    visibleSendImage: true
  }),

  //TODO Вывести в 1 компонент и поменять mounted на методы
  mounted() {
    this.cropper = new Cropper(this.$refs.image, {
      autoCrop: false,
      zoomable: false,
      scalable: false,
      // aspectRatio: 457 / 320,
    })
  },

  computed: {
    ...mapGetters({
      createProductId: 'data/product/createProductId',
    }),
  },

  methods: {

    crop() {
      this.cropImg = this.cropper.replace(this.cropper.getCroppedCanvas().toDataURL('image/jpeg'))
    },
    upload() {
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData();
        formData.append('image', blob, this.createProductId );
        this.$axios.$post('https://lubamebel.adminexpo.com:7741/upload-image', formData)
          .then(res => {
            console.log(res)
          });
      }, 'image/jpeg' );
      this.visibleSendImage = false
    }
  },
}
</script>


<!--<template>-->
<!--  <div>-->
<!--    <div>-->
<!--      <img ref="image" :src="src">-->
<!--    </div>-->
<!--    <img :src="destination" alt="">-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import Cropper from "cropperjs";-->
<!--export default {-->
<!--  name: "index",-->
<!--  props:{-->
<!--    src: String-->
<!--  },-->
<!--  data(){-->
<!--    return {-->
<!--      cropper: {},-->
<!--      destination: {},-->
<!--      image: {},-->

<!--    }-->
<!--  },-->
<!--  // setImage(e) {-->
<!--  //   const file = e.target.files[0];-->
<!--  //   if (!file.type.includes("image/")) {-->
<!--  //     alert("Please select an image file");-->
<!--  //     return;-->
<!--  //   }-->
<!--  //   if (typeof FileReader === "function") {-->
<!--  //     const reader = new FileReader();-->
<!--  //     reader.onload = event => {-->
<!--  //       this.imgSrc = event.target.result;-->
<!--  //       // rebuild cropperjs with the updated source-->
<!--  //       this.$refs.cropper.replace(event.target.result);-->
<!--  //     };-->
<!--  //     reader.readAsDataURL(file);-->
<!--  //   } else {-->
<!--  //     alert("Sorry, FileReader API not supported");-->
<!--  //   }-->
<!--  // },-->
<!--  // cropImage() {-->
<!--  //   // get image data for post processing, e.g. upload or setting image src-->
<!--  //   this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();-->
<!--  // },-->
<!--  // rotate() {-->
<!--  //   // guess what this does :)-->
<!--  //   this.$refs.cropper.rotate(90);-->
<!--  // }-->

<!--  mounted() {-->
<!--    this.image = this.$refs.image;-->
<!--    this.cropper = new Cropper(this.image, {-->
<!--      zoomable: false,-->
<!--      scalable: false,-->
<!--      aspectRatio: 16 / 9,-->
<!--      crop: () => {-->
<!--        const canvas = this.cropper.getCroppedCanvas();-->
<!--        this.destination = canvas.toDataURL("image/png");-->
<!--      }-->
<!--    })-->
<!--  }-->
<!--}-->
<!--</script>-->
