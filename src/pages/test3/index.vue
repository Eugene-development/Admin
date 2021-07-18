<template>
  <div class="container">
    <div class="top">
      <p>
        <nuxt-link to="/">Back To Home</nuxt-link>
        <button @click="reloadWindow" class="button--grey">Reload For Server Test</button>
      </p>
      <h2>Is SSR? {{isSSR}}</h2>
    </div>

    <no-ssr placeholder="Loading Your Editor...">
      <vue-editor placeholder="Write Something..." v-model="content"></vue-editor>
    </no-ssr>
  </div>
</template>

<script>
// let VueEditor

// if (process.browser) {
//   VueEditor = require('vue2-editor').VueEditor
// }

export default {
  asyncData() {
    return {
      content: "",
      pageIsMounted: false,
      isSSR: process.server ? true : false
    };
  },

  // components: { VueEditor },

  methods: {
    reloadWindow() {
      window.location.reload(true);
    }
  }
};
</script>

<style scoped>
button {
  cursor: pointer;
}
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
}
h1 {
  font-weight: 400;
  margin-bottom: -0.5em;
}
.name {
  color: #3b8070;
}
p {
  margin-top: 20px;
}
.top {
  margin-bottom: 2.5em;
  text-align: center;
}
button {
  font-size: 16px;
  font-weight: 900;
}
</style>
