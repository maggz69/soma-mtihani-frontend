<template>
  <div class="flex justify-end">
    <router-link :to="{ name: 'create-examination' }">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center"
      >
        <PlusIcon class="h-5 w-5" />
        Create Examination
      </button>
    </router-link>
  </div>

  <div class="mt-5">
    <div>
      <label class="block text-sm font-medium text-gray-700"> Search</label>
      <input
        type="text"
        placeholder="Examination Name"
        v-model="search"
        class="block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
    <div>
      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
          >
            <div
              class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Taken On
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Created At
                    </th>

                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="exam in examinations.data" :key="exam._id">
                    <td
                      class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                    >
                      {{ exam.name }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ exam.type }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ new Date(exam.taken_on).toLocaleDateString() }}
                    </td>
                    <td
                      class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                    >
                      {{ new Date(exam.createdAt).toLocaleString() }}
                    </td>
                    <td
                      class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                    >
                      <router-link
                        :to="{
                          name: 'view-examination-stats',
                          params: { id: exam._id },
                        }"
                        class="text-indigo-600 hover:text-indigo-900"
                        >Edit<span class="sr-only"
                          >, {{ "Y" }}</span
                        ></router-link
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-3">
      <Pagination
        :pagination="examinations"
        v-on:page-change="handlePageChange($event)"
        v-if="examinations.data && examinations.data.length > 0"
      ></Pagination>
    </div>
  </div>
</template>

<script>
import { PlusIcon } from "@heroicons/vue/20/solid";
import { onMounted } from "@vue/runtime-core";
import { ref, watch } from "vue";
import axiosInstance from "@/api/axiosInstance";
import Pagination from "@/components/Pagination.vue";

export default {
  name: "ListExamination",
  components: { PlusIcon, Pagination },
  setup() {
    const examinations = ref([]);
    const examinationSearch = ref("");

    const getExaminations = async () => {
      const response = await axiosInstance.get("/examinations");
      return response.data;
    };

    const handlePageChange = async (page) => {
      const response = await axiosInstance.get(`/examinations?page=${page}`);
      examinations.value = response.data;
    };

    // handle search when examinationSearch changes

    const handleSearchChange = async () => {
      const response = await axiosInstance.get(
        `/examinations?search=${examinationSearch.value}`
      );
      examinations.value = response.data;
    };

    watch(examinationSearch, handleSearchChange);

    onMounted(async () => {
      examinations.value = await getExaminations();
    });

    return {
      examinations,
      handlePageChange,
      search: examinationSearch,
    };
  },
};
</script>

<style></style>
