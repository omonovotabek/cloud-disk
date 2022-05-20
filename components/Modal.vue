<template>
  <div>
    <button class="btn btn-success" @click="show">Создать папку</button>
    <div class="modal_x" v-if="showHide" @click="hide">
      <div class="col-4 offset-4" @click.stop>
        <div class="card">
          <div class="card-header">
            Salom
            <button @click="hide">ddf</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showHide: false,
    };
  },
  methods: {
    show() {
      this.showHide = true;
    },
    hide() {
      this.showHide = false;
    },
  },
};
</script>

<style scoped>
.modal_x {
  position: fixed;
  background: rgba(221, 221, 221, 0.64);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
}
.col-4 {
  position: fixed;
  top: 200px;
}
</style>

