<template>
  <div class="container">
    <div class="row">
      <button class="btn btn-danger">Назад</button>
      <button class="btn btn-success" @click="show = !show">
        Создать папку
      </button>
      <app-modal v-if="show"/>
    </div>
   <app-table :files="files"/>
  </div>
</template>

<script>
import AppTable from '@/components/Table.vue'
import AppModal from '@/components/Modal.vue'
export default {
  middleware: ["authGuard"],
  components:{AppTable, AppModal},
  async asyncData({ store }) {
    const files = await store.dispatch("file/getFiles");
    return { files };
  },
  methods: {
    // async createDirHandler() {
    //   const data = {
    //     name: "123456",
    //     type: "dir",
    //   };
    //   const res = await this.$store.dispatch("file/createFile", data);
    //   this.files.push(res)
    //   console.log(res);
    // },
  },
};
</script>

