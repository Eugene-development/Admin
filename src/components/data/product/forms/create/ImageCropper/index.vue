<template>
  <div>
    <div>
      <img ref="image" :src="src">
    </div>
    <button
      @click="crop"
      class="mx-auto p-2 mx-1 relative cursor-pointer bg-white rounded-md font-medium text-blue-900 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
      type="button">
      Обрезать
    </button>
    <button v-if="visibleSendImage"
      @click.prevent.once="upload"
      class="mx-auto p-2 mx-1 relative cursor-pointer bg-white rounded-md font-medium text-blue-900 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
      Отправить
    </button>
    <p v-else
      class="mx-auto p-2 mx-1 relative cursor-pointer bg-white rounded-md font-medium text-blue-900 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
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
  mounted() {
    this.cropper = new Cropper(this.$refs.image, {
      autoCrop: false,
      zoomable: false,
      scalable: false,
      aspectRatio: 457 / 320,
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
        this.$axios.$post('http://localhost:7701/upload-image', formData)
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
