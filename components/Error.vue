<template>
  <div class="text-center mt-5">
    <nuxt-link :to="{path: back}" class="btn btn-danger">to Back</nuxt-link>
    <h1 class="text-danger">{{ error }}</h1>
    <h2>{{ message }}</h2>
  </div>
</template>

<script>
export default {
  props: ["error", "message", "back"],
};
</script>

<style scoped>
</style>