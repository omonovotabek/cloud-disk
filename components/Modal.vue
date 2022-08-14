<template>
  <div>
    <button class="btn btn-success" @click="show">Создать папку</button>
    <div class="modal_x" v-if="showHide" @click="hide">
      <div class="col-4 offset-4" @click.stop>
        <div class="card">
          <div class="card-header p-3">
            <div class="d-flex justify-content-end">
              <b-icon-x-lg class="btn" @click="hide" />
            </div>
            <div class="input-group mt-3">
              <input
                type="text"
                class="form-control"
                placeholder="Name"
                @input="onInput"
                v-model="name"
              />
            </div>
              <p>{{name ? isValidName : 'Введите имя папки'}}</p>

            <button 
            :disabled="Boolean(isValidName || !name)" 
           @click="() => { onSubmit(); clearSubmit(); }"
            class="btn btn-success"
            >
             Отправыть
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["onSubmit", "onInput", "isValidName"],
  data() {
    return {
      showHide: false,
      name: "",
    };
  },
  methods: {
    clearSubmit(){
      this.name = ''
    },
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
