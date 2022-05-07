<template>
  <div>
    <div v-if="notPage">
      <app-error :error="notPage" :back="'/'" />
    </div>
    <div v-if="badRequest">
      <app-error :error="badRequest" :message="error" :back="back" />
    </div>
    <div v-if="serverError">
      <app-error :error="serverError" :back="'/'" />
    </div>
  </div>
</template>

<script>
import AppError from "@/components/Error.vue";
export default {
  layout: "empty",
  components: { AppError },
  data() {
    return {
      back: "",
      error: "",
      notPage: "",
      badRequest: "",
      serverError: "",
    };
  },
  created() {
    const path = this.$route.path;
    const error = this.$route.query;
    if (error.message && error.apiUrl) {
      const url = error.apiUrl.slice(4);
      this.back = url;
      this.badRequest = "badRequest";
      this.error = error.message;
      this.$router.push("/badRequest");
    }
    if (path === "/serverError") {
      this.serverError = "Server Error 500";
    } else if (path != "/badRequest") {
      this.notPage = "Not Page";
    }
  },
};
</script>