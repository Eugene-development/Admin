<template>
    <section>
      <div class="h-screen flex items-center justify-center">
        <div class=" animate-bounce rounded-full px-24 py-24 shadow-2xl bg-white">
          <div class="text-9xl font-bold flex">
            <span class="block text-purple-500 transform translate-y-4">4</span>
            <span class="block text-purple-700 transform -translate-y-4">0</span>
            <span class="block text-purple-900 transform -translate-y-1">4</span>
          </div>
          <div class="text-center text-xl mt-4 text-purple-900 font-bold uppercase">Ошибка</div>
        </div>
      </div>
      <nuxt-link to="/">Вернуться на главную</nuxt-link>
    </section>
</template>

<script>
    export default {
      layout: 'empty',

        name: "error"
    }
</script>

<style scoped>
  section {
    width: 600px;
    margin: auto;
    padding-top: 5rem;
  }

  h1 {
    color: red;
  }

</style>
