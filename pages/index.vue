<template>
  <div class="container">
    <div class="row">
      <button class="btn btn-danger" @click="exitDir">Назад</button>
      <app-modal :onInput="onInput" :onSubmit="onSubmit" />
      <input type="file" @change="one" />
      <button @click="onUpload">upload</button>
    </div>
    <app-table 
    :files="files" 
    :openDir="openDir" 
    :onDownload="onDownload" 
    :onDelete="onDelete"
    />
  </div>
</template>

<script>
import AppTable from "@/components/Table.vue";
import AppModal from "@/components/Modal.vue";
export default {
  middleware: ["authGuard"],
  components: { AppTable, AppModal },
  data() {
    return {
      file: null,
      files: [],
      parentIds: [],
      name: "",
      dirId: "",
    };
  },
  async asyncData({ store }) {
    const files = await store.dispatch("file/getFiles");
    return { files };
  },

  methods: {
    async onDelete(file) {
      const res = await this.$store.dispatch("file/deleteFile", file._id)
      this.files.pop(res)
    },
    async onDownload(file) {
      const response = await this.$store.dispatch("file/downloadFile", file._id);
      if (response.status === 200) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
      console.log(response);
    },
    one(e) {
      this.file = e.target.files[0];
    },
    async onUpload() {
      const formData = {
        file: this.file,
        dirId: this.dirId,
      };
      const res = await this.$store.dispatch("file/uploadFile", formData);
      this.files.push(res);
      console.log(res);
    },
    async exitDir() {
      const dirId = this.parentIds.pop();
      const files = await this.$store.dispatch("file/getFiles", dirId);
      this.files = files;
    },
    async openDir(file) {
      const dirId = file._id;
      const files = await this.$store.dispatch("file/getFiles", dirId);
      this.files = files;
      this.dirId = dirId;
      this.parentIds.push(file.parent);
    },
    async onSubmit() {
      const formData = {
        name: this.name,
        dirId: this.dirId,
      };
      const file = await this.$store.dispatch("file/createFile", formData);
      this.files.push(file);
    },
    onInput(e) {
      this.name = e.target.value;
    },
  },
};
</script>
