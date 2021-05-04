<template>
  <div class="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
    <div class="overflow-hidden shadow rounded-lg max-w-lg w-full lg:max-w-xs">
      <label class="sr-only" for="search">Поиск</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path clip-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  fill-rule="evenodd"/>
          </svg>
        </div>
        <input id="search"
               class="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-blueGray-600 text-gray-100 placeholder-gray-100 focus:outline-none focus:bg-gray-700 focus:text-gray-100 sm:text-sm transition duration-150 ease-in-out"
               placeholder="Глобальный поиск" type="search">
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "index"
}
</script>

<style scoped>

</style>
