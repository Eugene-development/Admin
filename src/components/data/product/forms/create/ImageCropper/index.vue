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
