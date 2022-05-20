<template>
  <div>
    <alert-app :message="message || messs" :alert="alert" />
    <navbar-app :navs="navs" />
    <div class="d-flex justify-content-center mt-5">
      <nuxt />
    </div>
  </div>
</template>

<script>
import NavbarApp from "@/components/Navbar.vue";
import AlertApp from "@/components/Alert.vue";
export default {
  name: "auth",
  components: {
    NavbarApp,
    AlertApp,
  },
  data() {
    return {
      navs: [
        { url: "/auth/login", urlName: "Вход" },
        { url: "/auth/registr", urlName: "Регистрация" },
      ],
      message: "",
      alert: "",
    };
  },
  computed: {
    messs() {
      const data = this.$store.getters["auth/dataObj"];
      const { message } = this.$route.query;
      if (data.message && !(message === 'logout')) {
        this.message = data.message;
        this.alert = "alert-success";
      }
      setTimeout(() => {
        this.message = "";
        this.alert = "";
      }, 2000);
    },
  },
  created() {
    const data = this.$store.getters["auth/dataObj"];
    const { message } = this.$route.query;
    if (message === "session") {
      this.message = "Время сессии истекло, пожалуйста зайдите заного";
      this.alert = "alert-warning";
    } else if (message === "logout") {
      this.message = "Bы успешно вышли из систему";
      this.alert = "alert-info";
    }
    if (!message && !data.message) {
      this.message = "Для начала войдите в систему";
      this.alert = "alert-info";
    }
    setTimeout(() => {
      this.message = "";
      this.alert = "";
    }, 2000);
  },
};
</script>