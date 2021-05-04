<template>
  <div class="px-6 py-3">
    <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-3 ">
      <div class="overflow-hidden shadow rounded-lg bg-gradient-to-b from-blueGray-200 to-gray-50 ring-2 ring-blueGray-200">
        <div class="px-2 py-1 sm:p-4">
          <dl>
            <dt class="text-sm leading-5 font-medium text-gray-600 truncate">
              Таблица:
            </dt>
            <dd class="mt-1 text-3xl leading-9 font-semibold text-gray-900">
              Меню
            </dd>
          </dl>
        </div>
      </div>
      <div class="overflow-hidden shadow rounded-lg bg-gradient-to-b from-blueGray-200 to-gray-50 ring-2 ring-blueGray-200">
        <div class="px-2 py-1 sm:p-4">
          <dl>
            <dt class="text-sm leading-5 font-medium text-gray-600 truncate">
              Последнее изменение:
            </dt>
            <dd class="mt-1 text-3xl leading-9 font-semibold text-gray-900">
              25.06.2020
            </dd>
          </dl>
        </div>
      </div>
      <div class="overflow-hidden shadow rounded-lg bg-gradient-to-b from-blueGray-200 to-gray-50 ring-2 ring-blueGray-200">
        <div class="px-2 py-1 sm:p-4">
          <dl>
            <dt class="text-sm leading-5 font-medium text-gray-600 truncate">
              Поиск в таблице:
            </dt>
            <dd class="mt-1 text-3xl leading-9 font-semibold text-gray-900">
              <div class="flex-1 flex justify-center lg:justify-end py-1">
                <div class="w-full">
                  <label for="search" class="sr-only">Поиск в таблице:</label>
                  <div class="relative text-gray-400 focus-within:text-gray-400">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <input id="search" class="shadow rounded-lg block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5  text-gray-500 placeholder-gray-500 focus:outline-none focus:bg-white focus:placeholder-gray-500 focus:text-gray-900 sm:text-sm transition duration-150 ease-in-out" placeholder="Найти" type="search">
                  </div>
                </div>
              </div>
            </dd>
          </dl>
        </div>
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
