<template>
  <div class="h-screen flex overflow-hidden ">
    <Sidebar/>
    <div class="flex-1 overflow-auto focus:outline-none" tabindex="0">
      <Navbar/>
      <main class="flex-1 relative pb-8 z-0 overflow-y-auto">
        <nuxt/>
      </main>
    </div>
  </div>

</template>

<script>

import Logo from './components/Logo'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'


export default {
  middleware: 'access',

  name: "index",
  components: {
    Logo,
    Sidebar,
    Navbar
  }
}


</script>


