<template>
  <b-nav-item :to="{path: url}">{{urlName}}</b-nav-item>
</template>

<script>
export default {
  props:["url", "urlName"]
}
</script>