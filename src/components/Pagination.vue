<template>
  <div class="flex justify-end items-center gap-3">
    <div>
      <p class="text-xs" @click="updateCurrentPage({ target: { value: 2 } })">
        Showing <span class="font-semibold">{{ recordStart }}</span> to
        <span class="font-semibold">{{ recordEnd }}</span> of
        <span class="font-semibold">{{ totalRecords }}</span> records
      </p>
    </div>
    <div class="bg-white rounded">
      <select
        class="block rounded-md border-gray-300 bg-transparent focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        v-on:change="updateCurrentPage($event)"
      >
        <option
          v-for="page in pages"
          :key="page"
          v-bind:selected="currentPage == page"
        >
          {{ page }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect, ref } from "vue";
export default {
  name: "Pagination",
  props: {
    pagination: {
      type: Object,
      required: true,
    },
  },
  emits: ["page-change"],
  setup(props, { emit }) {
    // const recordStart = ref(0);
    // const recordEnd = ref(0);

    const currentRecord = computed(() => {
      return props.pagination.currentRecordPageStart;
    });

    const currentPage = computed(() => {
      return props.pagination.currentPage;
    });
    const totalRecords = computed(() => {
      return props.pagination.totalRecords;
    });
    const recordsPerPage = computed(() => {
      return props.pagination.recordsPerPage;
    });

    const pages = ref([]);
    const recordStart = ref(0);
    const recordEnd = ref(0);

    watchEffect(() => {
      const totalPages = Math.ceil(totalRecords.value / recordsPerPage.value);
      pages.value = Array.from({ length: totalPages }, (_, i) => i + 1);
    });

    watchEffect(() => {
      if (isNaN(currentPage.value) || isNaN(recordsPerPage.value)) {
        return;
      }
      recordStart.value = currentRecord.value;
    });

    watchEffect(() => {
      if (
        isNaN(totalRecords.value) ||
        isNaN(currentRecord.value) ||
        isNaN(currentPage.value)
      ) {
        return 0;
      }

      // get the index of the last record on the current page
      recordEnd.value =
        currentPage.value * recordsPerPage.value -
        (props.pagination.data.length < props.pagination.recordsPerPage
          ? props.pagination.recordsPerPage - props.pagination.data.length
          : 0);
    });

    const updateCurrentPage = ($event) => {
      emit("page-change", $event.target.value);
    };

    return {
      pages,
      recordStart,
      recordEnd,
      currentRecord,
      updateCurrentPage,
      currentPage,
      totalRecords,
    };
  },
};
</script>

<style></style>
