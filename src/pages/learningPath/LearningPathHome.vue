<template>
  <div class="flex items-center justify-center">
    <my-stats></my-stats>
  </div>

  <div class="">
    <div class="flex items-center mt-5 justify-center">
      <div class="bg-white px-5 py-4 rounded-md shadow-md max-w-4xl">
        <h3 class="text-2xl font-semibold">Select Learning Topics</h3>
        <p class="text-gray-700 text-sm mb-5">
          Apply a filter for the topics you would like to view examination /
          test questions and community notes for
        </p>

        <fieldset>
          <legend class="text-lg font-medium text-gray-900">
            Available Topics
          </legend>
          <div
            class="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200"
          >
            <div
              v-for="topic in topics"
              :key="topic.uuid"
              class="relative flex items-start py-4"
            >
              <div class="min-w-0 flex-1 text sm">
                <label
                  :for="`topic-${topic.uuid}`"
                  class="font-medium text-gray-700"
                >
                  {{ topic.name }}
                </label>
              </div>
              <div class="ml-5 flex-shrink-0">
                <input
                  type="checkbox"
                  :id="`topic-${topic.uuid}`"
                  v-model="selectedTopics"
                  :value="topic.uuid"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        </fieldset>

        <div class="flex justify-end mt-5">
          <button
            class="bg-green-600 text-white px-7 py-2 font-semibold hover:bg-green-700 rounded-lg shadow-md"
            @click="startLearning"
          >
            Start Learning
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MyStats from "@/pages/learningPath/home/MyStats.vue";
import { ref } from "vue";

export default {
  name: "LearningPathHome",
  components: {
    MyStats,
  },
  setup() {
    const availableTopics = [
      {
        uuid: "a1b2c3d4e5f6g7h8i9j0",
        name: "Topic 1",
        description: "This is a description of topic 1",
        questions: 10,
        points: 100,
      },
      {
        uuid: "a2b2c3d4e5f6g7h8i9j0",
        name: "Topic 2",
        description: "This is a description of topic 2",
        questions: 10,
        points: 100,
      },
      {
        uuid: "a3b2c3d4e5f6g7h8i9j0",
        name: "Topic 3",
        description: "This is a description of topic 3",
        questions: 10,
        points: 100,
      },
      {
        uuid: "a4b2c3d4e5f6g7h8i9j0",
        name: "Topic 4",
        description: "This is a description of topic 4",
        questions: 10,
        points: 100,
      },
    ];

    const startLearning = () => {
      console.log("Start Learning");
    };

    const selectedTopics = ref([]);

    return {
      topics: availableTopics,
      selectedTopics,
      startLearning,
    };
  },
};
</script>
<style lang=""></style>
