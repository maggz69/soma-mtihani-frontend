<template>
  <div>
    <router-view name="page-top" class="mb-5"></router-view>
    <div class="my-2">
      <ViewExaminationTabs></ViewExaminationTabs>
    </div>
    <router-view name="tab-selected"></router-view>
  </div>
</template>

<script>
import { reactive, ref, onMounted, provide } from "vue";
import ViewExaminationTabs from "./Components/ViewExaminationTabs.vue";
import axiosInstance from "@/api/axiosInstance";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();

    const examination = ref({
      name: "",
      description: "",
      course: "",
      taken_on: "",
      createdAt: "",
    });

    const courses = ref([]);

    const getExamination = async () => {
      // get the :id param from the route
      const examId = route.params.id;
      const response = await axiosInstance.get(`/examinations/${examId}`);
      return response.data;
    };

    const getCourses = async () => {
      const response = await axiosInstance.get("/courses");
      return response.data;
    };

    onMounted(() => {
      getExamination().then((data) => {
        examination.value = data;
        examination.value.createdAt = new Date(
          examination.value.createdAt
        ).toLocaleString();
      });

      getCourses().then((data) => {
        courses.value = data.data;
      });
    });

    provide("examination", examination);
    provide("courses", courses);
  },
  components: { ViewExaminationTabs },
};
</script>

<style lang="scss" scoped></style>
