<template>
     <div 
     role="alert"
     class="alert text-center fixed col-4 offset-4" 
     :class="alert"  
     v-if="message"
     >
      {{ message }}
    </div> 
</template>

<script>
export default {
  props:['message', 'alert']
};
</script>

<style scoped>
.fixed {
  position: fixed;
  z-index: 10;
  top:50px;
  animation:live .3s linear;  
  animation-iteration-count: 1;
}
@keyframes live{
    from{
        top: -50px;
    }
    to{
        top: 50px;
    }
}
</style>
