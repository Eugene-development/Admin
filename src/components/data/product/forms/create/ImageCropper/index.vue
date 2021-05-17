<template>
  <div>
    <div>
      <!--      <img ref="image" src="/test/5adf1b97742a65d0a3c98299c545570b.jpg">-->
      <img ref="image" :src="src">
    </div>
    <button class="text-white" type="button" @click="crop">Обрезать</button>
    <button @click.prevent="upload" class="text-white">Загрузить</button>

  </div>
</template>
<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default {
  props: {
    src: String
  },
  data: () => ({
    cropper: null,
  }),
  mounted() {
    this.cropper = new Cropper(this.$refs.image, {
      autoCrop: false,
    })
  },
  methods: {
    crop() {
      this.cropper.replace(this.cropper.getCroppedCanvas().toDataURL('image/jpeg'))
    },
    upload() {
      const fd = new FormData;
      fd.append('image', this.selectedFile, 'test')
      this.$axios.$post('http://localhost:7701/upload-image', fd)
        .then(res => {
          console.log(res)
        });
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
