<template>
  <div class="container">
    <div class="row">
      <div class="col-4 d-flex justify-content-between">
        <button 
        class="btn btn-dark" 
        @click="exitDir"
        >Назад</button>
        <app-modal
         :onInput="onInputName"
         :onSubmit="onCreateDir"
         :isValidName="isValidName"
        />
        <input 
        id="file" 
        type="file" 
        style="display: none" 
        @change="(e) => {onChangeFile(e); onUploadFile()}" 
        /> 
        <label 
        for="file" 
        class="btn m-0" 
        style="border:1px dashed black"
        >Загрузить файл</label>
      </div>
      <div class="col-2 d-flex justify-content-center"></div>
      <div class="col-2 d-flex justify-content-center">
           <input type="text" v-model="searchName" @input="searchNameChange" />
      </div>
      <div class="col-2 d-flex justify-content-center"></div>
      <div class="col-2 d-flex justify-content-between">
        <select value="sort" @change="onChange">
          <option value="date">По датe</option>
          <option value="name">По имени</option>
          <option value="type">По типу</option>
        </select>
      </div>
    </div>

    <app-table
      :files="files"
      :openDir="openDir"
      :onDownload="onDownloadFile"
      :onDelete="onDelete"
      v-if="delay"
    />

    <app-loading v-else />

  </div>
</template>

<script>
import AppTable from "@/components/Table.vue";
import AppModal from "@/components/Modal.vue";
import AppLoading from "@/components/Loading.vue";
export default {
  middleware: ["authGuard"],
  components: { AppTable, AppModal, AppLoading },
  data() {
    return {
      delay: true,
      searchName: "",
      isValidName: "",
      file: {},
      name: "",
      fileInput: null,
      files: [],
      parentIds: [],
      dirIds: [],
    };
  },

  async asyncData({ store }) {
    const files = await store.dispatch("file/getFiles");
    return { files };
  },


  
  methods: {
    onInputName(e) {
      this.name = e.target.value;
      const uniqName = this.files.filter(
        (file) => file.name === this.name
      ).length;
      if (uniqName) this.isValidName = "имя существующей папки";
      else this.isValidName = "";
    },

    onChangeFile(e) {
      this.fileInput = e.target.files[0];
    },

    async searchNameChange() {
      if (this.searchName) {
        this.files = await this.$store.dispatch(
          "file/searchFile",
          this.searchName
        );
      } else {
        this.files = await this.$store.dispatch("file/getFiles");
      }
    },
    async onChange(e) {
      const sort = e.target.value;
      const parentIdsCopy = [...this.dirIds]
      const dirId = parentIdsCopy.pop();
      this.files = await this.$store.dispatch("file/getFiles", { sort, dirId });
    },

    async openDir(file) {
      this.files = await this.$store.dispatch("file/getFiles", {
        dirId: file._id,
      });
      this.file = file;
      this.dirIds.push(file._id);
      this.parentIds.push(file.parent);
      this.delay = false;
      setTimeout(() => {
        this.delay = true;
      }, 500);
    },

    async exitDir() {
      if (this.parentIds.length) {
        const dirId = this.parentIds.pop();
        const files = await this.$store.dispatch("file/getFiles", { dirId });
        this.files = files;
        this.delay = false;
        setTimeout(() => {
          this.delay = true;
        }, 500);
      }
      this.dirIds.pop();
    },

    async onCreateDir() {
      const dirId = this.dirIds.pop();
      const formData = {
        name: this.name,
        dirId,
      };
      const file = await this.$store.dispatch("file/createFile", formData);
      this.files.push(file);
    },

    async onUploadFile() {
      const dirId = this.dirIds.pop();
      const formData = {
        file: this.fileInput,
        dirId,
      };
      const file = await this.$store.dispatch("file/uploadFile", formData);
      this.files.push(file);
    },

    async onDownloadFile(file) {
      const response = await this.$store.dispatch(
        "file/downloadFile",
        file._id
      );
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
    },

    async onDelete(file) {
        const isEmpty = await this.$store.dispatch("file/getFiles", {
        dirId: file._id,
      });
      if(!isEmpty.length){
        const res = await this.$store.dispatch("file/deleteFile", file._id);
        this.files = this.files.filter((item) => item._id !== file._id);
        console.log(res);
      }
    },
  },
};
</script>
