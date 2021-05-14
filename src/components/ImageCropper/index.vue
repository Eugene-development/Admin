<template>
  <div>
    <img ref="image" :src="src">
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
      image: {}
    }
  },
  mounted() {
    this.image = this.$refs.image;
    this.cropper = new Cropper(this.image, {
      zoomable: false,
      scalable: false,
      aspectRatio: 1
    })
  }
}
</script>

<style scoped>

</style>
