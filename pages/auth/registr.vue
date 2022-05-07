<template>
  <ValidationObserver ref="form" v-slot="{ invalid }">
    <form @submit.prevent="onSubmit">
      <div class="card">
        <div class="card-body">
          <p class="mb-2 display-3">Cоздать аккаунт</p>
          <ValidationProvider
            rules="required|min:3|email"
            v-slot="{ errors, valid }"
          >
            <label for="email" class="mt-3">Email</label>
            <b-form-input
              @keydown.space.prevent
              @keyup="emailCheck"
              :state="errors[0] || setError ? false : valid ? true : null"
              id="email"
              v-model="form.email"
            />
            <b-form-invalid-feedback>
              {{ errors[0] ? errors[0].replace("{field}", "") : setError }}
            </b-form-invalid-feedback>
          </ValidationProvider>
          
          <ValidationProvider
            rules="required|min:3|max:10"
            v-slot="{ errors, valid }"
          >
            <label for="password" class="mt-3">Парол</label>
            <b-form-input
              @keydown.space.prevent
              :state="errors[0] ? false : valid ? true : null"
              id="password"
              type="password"
              v-model="form.password"
            />
            <b-form-invalid-feedback>
              {{ errors[0] ? errors[0].replace("{field}", "") : "" }}
            </b-form-invalid-feedback>
          </ValidationProvider>
        </div>
        <div class="card-footer">
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="invalid || Boolean(setError)"
          >
            Создать
          </button>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
export default {
  layout:'auth',
  data() {
    return {
      setError: "",
      submitError: "",
      submitFormEmail: "",
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    emailCheck() {
      if (this.submitFormEmail === this.form.email)
        this.setError = this.submitError;
      if (this.setError && !(this.submitFormEmail === this.form.email))
        this.setError = "";
    },
    async onSubmit() {
      const formData = {
        email: this.form.email,
        password: this.form.password,
      };
      const data = await this.$store.dispatch("auth/register", formData);
      if (data.type === "error") {
        this.setError = data.message;
        this.submitError = data.message;
        this.submitFormEmail = this.form.email;
      }
      if (data.type === "created")
        this.$router.push("/auth/login?message=created");
    },
  },
};
</script>

<style scoped>
label::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
</style>