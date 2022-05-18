<template>
     <div class="row mt-5">
      <div class="d-flex col-12 font-weight-bold">
        <div class="col-2"></div>
        <div class="col-6">Название</div>
        <div class="col-2 text-center">Дата</div>
        <div class="col-2 text-center">Размер</div>
      </div>
      <div
        class="d-flex align-items-center col-12 table-hover py-1 px-0"
        v-for="file of files"
        :key="file.index"
      >
        <div class="col-2 text-center">
          <img v-if="file.type === 'dir'" src="~/assets/dir.svg" alt="" />
          <img v-else src="~/assets/file.svg" alt="" />
        </div>
        <div class="col-6">{{ file.name }}</div>
        <div class="col-2 text-center">{{ file.date.slice(0, 10) }}</div>
        <div class="col-2 text-center">{{ file.size }}</div>
      </div>
    </div>
</template>
<script>
export default {
    props:['files']
}
</script>

<style scoped>
.col-12 {
  border-bottom: 2px solid rgb(75, 79, 94);
}
.table-hover:hover {
  background-color: rgb(193, 193, 193);
  transform: scale(1.01);
}
</style>