<template>
  <div>
    <alert-app :message="message" :alert="alert" />
    <navbar-app :navs="navs" />
    <div class="d-flex justify-content-center mt-3">
      <nuxt />
    </div>
  </div>
</template>

<script>
import NavbarApp from "@/components/Navbar.vue";
import AlertApp from "@/components/Alert.vue";
export default {
  components: {
    NavbarApp,
    AlertApp,
  },
  data() {
    return {
      navs: [
        { url: "/", urlName: "Обзор" },
        { url: "/logout", urlName: "Выход" },
      ],
      message: "",
      alert: "",
    };
  },
  created() {
    const data = this.$store.getters["auth/dataObj"];
    if (data.message) {
      this.message = data.message;
      this.alert = "alert-success";
    }
    setTimeout(() => {
      this.message = "";
      this.alert = "";
    }, 2000);
  },
};
</script>

