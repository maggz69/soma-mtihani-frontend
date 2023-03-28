<template>
  <div class="grid grid-cols-3 gap-2">
    <div class="bg-white rounded shadow text-center">
      <h3 class="font-medium text-lg text-gray-700">Questions Loaded</h3>
      <p class="text-3xl font-semibold text-gray-800">
        {{ new Number(questionsLoaded).toLocaleString() }}
      </p>
    </div>

    <div class="bg-white rounded shadow text-center">
      <h3 class="font-medium text-lg text-gray-700">Questions Completed</h3>
      <p class="text-3xl font-semibold text-gray-800">
        {{ new Number(questionsCompleted).toLocaleString() }}
      </p>
    </div>

    <div class="bg-white rounded shadow text-center">
      <h3 class="font-medium text-lg text-gray-700">Number of Views</h3>
      <p class="text-3xl font-semibold text-gray-800">
        {{ new Number(numberOfViews).toLocaleString() }}
      </p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/api/axiosInstance";
export default {
  name: "ExaminationStats",
  setup() {
    const questionsLoaded = ref(0);
    const questionsCompleted = ref(0);
    const numberOfViews = ref(0);

    const route = useRoute();

    const getExaminationStatistics = async () => {
      // get the :id param from the route
      const examId = route.params.id;
      const response = await axiosInstance.get(
        `/examinations/${examId}/statistics`
      );
      return response.data;
    };

    onMounted(() => {
      getExaminationStatistics().then((data) => {
        questionsLoaded.value = data.questionsLoaded;
        questionsCompleted.value = data.questionsCompleted;
        numberOfViews.value = data.examinationViews;
      });
    });

    return {
      questionsLoaded,
      questionsCompleted,
      numberOfViews,
    };
  },
};
</script>

<style lang="scss" scoped></style>
