<template>
  <div class="border-b-2">
    <nav class="mx-6">
      <div class="max-w-full mx-auto">
        <div class="relative flex items-center justify-between h-16">
          <Hamburger/>
          <Breadcrumbs/>
          <GlobalSearch/>
          <Office/>
        </div>
      </div>
    </nav>
    <Tab/>
  </div>
</template>

<script>
import GlobalSearch from './GlobalSearch'
import Tab from './Tab'
import Office from './Office'
import Breadcrumbs from './Breadcrambs'
import Hamburger from './Hamburger'

export default {
  components: {
    GlobalSearch,
    Tab,
    Office,
    Breadcrumbs,
    Hamburger
  },

}
</script>

<style scoped>

</style>
