<template lang="">
  <div class="min-h-screen bg-gray-50">
    <AuthenticatedNavigation />
    <router-view></router-view>
  </div>
</template>
<script>
import AuthenticatedNavigation from "@/layouts/AuthenticatedNavigation.vue";
export default {
  name: "AppLayout",
  components: {
    AuthenticatedNavigation,
  },
};
</script>
