<template lang="">
  <div >
    <router-view></router-view>
  </div>
</template>
<script>
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout.vue";
export default {
  name: "LearningPathLayout",
  components: {
    AuthenticatedLayout,
  },
};
</script>
<style lang=""></style>
