<template>
  <h1>logout</h1>
</template>

<script>
export default {
  middleware: ['authGuard'],
  created() {
    this.$store.dispatch('auth/logout')
    this.$router.push('/auth/login?message=logout')  
  },
}
</script>