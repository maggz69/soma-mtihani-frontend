<template lang="">
  <div class="max-w-7xl mx-auto py-8">
    <router-view></router-view>
  </div>
</template>
<script>
import AppLayout from "@/layouts/AppLayout.vue";
import AuthenticatedNavigation from "@/layouts/AuthenticatedNavigation.vue";

export default {
  name: "AuthenticatedLayout",
  components: {
    AppLayout,
    AuthenticatedNavigation,
  },
};
</script>
<style lang=""></style>
