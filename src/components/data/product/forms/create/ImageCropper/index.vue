<template>
  <div>
    <div>
      <img ref="image" :src="src">
    </div>
    <img :src="destination" alt="">
  </div>
</template>

<script>
import Cropper from "cropperjs";
export default {
  name: "index",
  props:{
    src: String
  },
  data(){
    return {
      cropper: {},
      destination: {},
      image: {},

    }
  },
  mounted() {
    this.image = this.$refs.image;
    this.cropper = new Cropper(this.image, {
      zoomable: false,
      scalable: false,
      aspectRatio: 16 / 9,
      crop: () => {
        const canvas = this.cropper.getCroppedCanvas();
        this.destination = canvas.toDataURL("image/png");
      }
    })
  }
}
</script>

<style scoped>

</style>
