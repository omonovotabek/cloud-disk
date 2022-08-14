<template>
  <div class="row mt-5">
    <div class="d-flex col-12 font-weight-bold">
      <div class="col-2"></div>
      <div class="col-5">Название</div>
      <div class="col-1"></div>
      <div class="col-2 text-center">Дата</div>
      <div class="col-2 text-center">Размер</div>
    </div>

    <div
      class="d-flex align-items-center col-12 table-hover py-1 px-0"
      v-for="file of files"
      :key="file.index"
      @mousemove="inputHover(files, file._id)"
      @mouseout="outputHover"
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

      <div class="col-5">{{ file.name }}</div>

      <div class="col-1 d-flex justify-content-between">
        <div v-show="file._id === id">
          <b-icon-cloud-download-fill
            class="btn text-secondary"
            v-if="file.type !== 'dir'"
            @click="onDownload(file)"
          />

          <b-icon-archive-fill
            class="btn text-secondary"
            @click="onDelete(file)"
          />
        </div>
      </div>
      <div class="col-2 text-center">{{ file.date.slice(0, 10) }}</div>
      <div class="col-2 text-center">{{ sizeFormat(file) }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["files", "openDir", "onDownload", "onDelete"],
  data() {
    return {
      id:""
    };
  },

  methods: {
    inputHover(files, id) {
     const file = files.filter(file => file._id === id)
     this.id = file[0]._id
    },
    outputHover() {
     this.id = ""
    },
    sizeFormat(file) {
      this.file  = file
      // if (size === 0) {
      //   return "dir";
      // }
      // if (size > 1024 * 1024 * 1024) {
      //   return (size / (1024 * 1024 * 1024)).toFixed(1) + "Gb";
      // }
      // if (size > 1024 * 1024) {
      //   return (size / (1024 * 1024)).toFixed(1) + "Mb";
      // }
      // if (size > 1024) {
      //   return (size / 1024).toFixed(1) + "Kb";
      // }
    },
  },
};
</script>

<style scoped>
.col-12 {
  border-bottom: 2px solid rgb(75, 79, 94);
}
.table-hover:hover {
  background-color: rgb(193, 193, 193);
  transform: scale(1.01);
}
.dir {
  cursor: pointer;
}
</style>
