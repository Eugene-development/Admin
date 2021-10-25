<template>
  <div class="flex items-center px-2 lg:px-0  mx-10">
    <nav aria-label="Breadcrumb" class="flex">
      <div class="flex items-center space-x-4">
          <div>
            <NuxtLink class="text-gray-700 hover:text-gray-900" to="/">
              <!-- Heroicon name: home -->
              <svg aria-hidden="true" class="flex-shrink-0 h-5 w-5 transition duration-150 ease-in-out"
                   fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
            </NuxtLink>
            <span class="sr-only">Главная</span>
          </div>
          <div class="flex items-center space-x-4">
            <!-- Heroicon name: chevron-right -->
            <svg aria-hidden="true" class="flex-shrink-0 h-5 w-5 text-gray-700"
                 fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    fill-rule="evenodd"/>
            </svg>
            <div aria-current="page"
                 class="text-sm leading-5 font-medium text-gray-700 hover:text-gray-700 transition duration-150 ease-in-out"
                 href="#">{{ breadcrumbsEndPoint }}
            </div>
          </div>
      </div>
    </nav>
  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters({
      // breadcrumbs: 'navbar/breadcrumbs/breadcrumbs',
      breadcrumbsEndPoint: 'navbar/breadcrumbs/breadcrumbsEndPoint',
    }),
  },
}
</script>
