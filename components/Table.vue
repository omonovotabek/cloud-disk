<template>
     <div class="row mt-5">
      <div class="d-flex col-12 font-weight-bold">
        <div class="col-2"></div>
        <div class="col-4">Название</div>
        <div class="col-1"></div>
        <div class="col-1"></div>
        <div class="col-2 text-center">Дата</div>
        <div class="col-2 text-center">Размер</div>
      </div>
      <div
        class="d-flex align-items-center col-12 table-hover py-1 px-0"
        v-for="file of files"
        :key="file.index"
      >
        <div class="col-2 text-center">
          <img 
          v-if="file.type === 'dir'" 
          src="~/assets/dir.svg" 
          alt="" 
          class="dir"
          @click="openDir(file)"
          />
          <img v-else src="~/assets/file.svg" alt="" />
        </div>
        <div class="col-4">{{ file.name }}</div>
        <div class="col-1">
          <button  
          v-if="file.type !== 'dir'" 
          @click="onDownload(file)"
          >downlaod</button></div>
         <div class="col-1">
          <button 
          @click="onDelete(file)"
          :disabled="Boolean(file.childs.length)"
          >delete</button></div>
        <div class="col-2 text-center">{{ file.date.slice(0, 10) }}</div>
        <div class="col-2 text-center">{{ sizeFormat(file.size) }}</div>
      </div>
    </div>
</template>
<script>
export default {
    props:['files', 'openDir', 'onDownload', 'onDelete'],
    methods:{
       sizeFormat(size){
        if(size === 0){
          return "dir"
        }
        if(size>(1024*1024*1024)){
          return (size/(1024*1024*1024)).toFixed(1) + 'Gb'
        }
        if(size>1024*1024){
          return (size/(1024*1024)).toFixed(1) + 'Mb'
        }
         if(size>1024){
          return (size/1024).toFixed(1) + 'Kb'
        }
     }
    }
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
.dir{
  cursor: pointer;
}
</style>