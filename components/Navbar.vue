<template>
  <b-navbar type="dark" variant="dark" class="d-flex justify-content-center p-0">
    <b-navbar-nav class="d-flex justify-content-between align-items-center" style="width:90%">
      <div style="width:20%" class="d-flex justify-content-between align-items-center">
        <b-icon-disc-fill style="width:30px; height:30px" variant="light"></b-icon-disc-fill>
        <h1 class="text-light">Cloud disk</h1>
      </div>    
    <div class="d-flex">
      <b-nav-item v-for="nav of navs" :key="nav.index" :to="{path: nav.url}">{{nav.urlName}}</b-nav-item>
    </div>
    </b-navbar-nav>
  </b-navbar>
</template>   

<script>
export default {
  props:["navs"]
}
</script>