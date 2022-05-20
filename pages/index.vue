<template>
  <div class="container">
    <div class="row">
      <button class="btn btn-danger">Назад</button>
     <app-modal/>
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

  },
};
</script>
 

