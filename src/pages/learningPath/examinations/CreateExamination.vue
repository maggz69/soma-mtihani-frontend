<template>
  <div class="bg-white rounded-md shadow py-3">
    <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        Create An Examination
      </h3>
    </div>

    <div class="px-5 py-8 grid grid-cols-6 gap-4">
      <div class="col-span-2">
        <label for="name" class="block text-sm font-medium text-gray-700"
          >Name</label
        >
        <input
          type="text"
          id="name"
          v-model="examination.name"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div class="col-span-4">
        <label for="description" class="block text-sm font-medium text-gray-700"
          >Description</label
        >
        <input
          type="text"
          id="description"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          v-model="examination.description"
        />
      </div>

      <div class="col-span-2">
        <label for="course" class="block text-sm font-medium text-gray-700"
          >Course</label
        >
        <select
          id="course"
          v-model="examination.course"
          class="relative block rounded-md border-gray-300 bg-transparent focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="1">Course 1</option>
          <option value="2">Course 2</option>
          <option value="3">Course 3</option>
        </select>
      </div>
      <div class="col-span-2">
        <label for="taken_on">Taken On</label>
        <input
          type="date"
          id="taken_on"
          class="block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          v-model="examination.taken_on"
        />
      </div>

      <div class="col-span-2">
        <label for="course" class="block text-sm font-medium text-gray-700"
          >Type of Examination</label
        >
        <select
          id="type"
          v-model="examination.type"
          class="relative block rounded-md border-gray-300 bg-transparent focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="tutorial">Tutorial</option>
          <option value="practical">Practical</option>
          <option value="quiz">Quiz</option>
          <option value="final_examination">End of Semester Examination</option>
        </select>
      </div>

      <div class="col-span-6">
        <button
          @click="createExamination"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axiosInstance from "@/api/axiosInstance.js";

export default {
  name: "CreateExamination",
  setup() {
    const examination = ref({
      name: "",
      description: "",
      course: "",
      taken_on: "",
      type: "",
    });

    const createExamination = () => {
      // import global axios prototype
      axiosInstance.post("/examinations", examination.value).then((res) => {
        console.log(res);
      });
    };

    return {
      examination,
      createExamination,
    };
  },
};
</script>

<style></style>
