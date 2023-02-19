<template>
  <div class="bg-white rounded shadow-sm px-6 py-4">
    <h3 class="text-2xl font-semibold text-gray-800">Exam Details</h3>

    <div class="mt-4">
      <div class="grid grid-cols-4 gap-1">
        <div class="col-span-2">
          <div class="flex flex-col">
            <label class="text-sm font-semibold text-gray-600">Name</label>
            <input
              type="text"
              v-model="examination.name"
              class="mt-1 rounded border border-gray-400 text-gray-800 max-w-sm text-sm"
            />
          </div>
        </div>
        <div class="col-span-2">
          <div class="flex flex-col">
            <label class="text-sm font-semibold text-gray-600"
              >Description</label
            >
            <input
              type="text"
              v-model="examination.description"
              class="mt-1 rounded border border-gray-400 text-gray-800 max-w-sm text-sm"
            />
          </div>
        </div>

        <div class="col-span-2">
          <div class="flex flex-col">
            <label class="text-sm font-semibold text-gray-600">Course</label>
            <select
              v-model="examination.course"
              class="mt-1 rounded border border-gray-400 text-gray-800 max-w-sm text-sm"
            >
              <option v-for="course in courses" :key="course">
                {{ course }}
              </option>
            </select>
          </div>
        </div>

        <div class="col-span-2">
          <div class="flex flex-col">
            <label class="text-sm font-semibold text-gray-600">Type</label>
            <select
              v-model="examination.type"
              class="mt-1 rounded border border-gray-400 text-gray-800 max-w-sm text-sm"
            >
              <option value="tutorial">Tutorial</option>
              <option value="practical">Practical</option>
              <option value="quiz">Quiz</option>
              <option value="final_examination">
                End of Semester Examination
              </option>
            </select>
          </div>
        </div>

        <div class="col-span-2">
          <div class="flex flex-col">
            <label class="text-sm font-semibold text-gray-600">Taken On</label>
            <input
              type="date"
              v-model="examination.taken_on"
              class="mt-1 rounded border border-gray-400 text-gray-800 max-w-sm text-sm"
            />
          </div>
        </div>

        <div class="col-span-2">
          <div class="flex flex-col">
            <label class="text-sm font-semibold text-gray-600"
              >Created At</label
            >
            <input
              type="text"
              v-model="examination.createdAt"
              class="mt-1 bg-gray-200 rounded font-semibold text-gray-600 max-w-sm text-sm"
            />
          </div>
        </div>

        <div class="col-span-2"></div>

        <div class="col-span-4 flex justify-end">
          <button
            @click="updateCourse"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center"
          >
            <PencilIcon class="h-5 w-5" />
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/api/axiosInstance";
import { PencilIcon } from "@heroicons/vue/24/outline";
export default {
  name: "ViewExamination",
  components: { PencilIcon },
  setup() {
    const route = useRoute();

    const examination = ref({
      name: "",
      description: "",
      course: "",
      taken_on: "",
      createdAt: "",
    });

    const courses = ref([
      {
        id: 1,
        name: "Course 1",
      },
      {
        id: 2,
        name: "Course 2",
      },
      {
        id: 3,
        name: "Course 3",
      },
    ]);

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

    const updateCourse = async () => {
      // get the :id param from the route
      const examId = route.params.id;
      const response = await axiosInstance.put(
        `/examinations/${examId}`,
        examination.value
      );
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
    return {
      examination,
      courses,
      updateCourse,
    };
  },
};
</script>
