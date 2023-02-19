<template>
  <div class="relative max-w-4xl mx-auto">
    <div
      class="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500"
    >
      <label for="title" class="sr-only">Title</label>
      <textarea
        type="text"
        id="title"
        class="block w-full border-l-0 border-r-0 border-t-0 border-gray-200 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0 border-b"
        placeholder="Title"
      ></textarea>
      <label for="description" class="sr-only">Description</label>
      <textarea
        rows="2"
        name="description"
        id="description"
        class="block w-full resize-none border-0 py-3 placeholder-gray-500 focus:ring-0 sm:text-sm"
        placeholder="Write a description..."
      />

      <!-- Spacer element to match the height of the toolbar -->
      <div aria-hidden="true">
        <div class="py-2">
          <div class="h-9" />
        </div>
        <div class="h-px" />
        <div class="py-2">
          <div class="py-px">
            <div class="h-9" />
          </div>
        </div>
      </div>
    </div>

    <div class="absolute inset-x-px bottom-0">
      <!-- Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. -->
      <div class="flex flex-nowrap justify-end space-x-2 py-2 px-2 sm:px-3">
        <Listbox as="div" v-model="selectedTopic" class="flex-shrink-0">
          <ListboxLabel class="sr-only"> Topic </ListboxLabel>
          <div class="relative">
            <ListboxButton
              class="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 py-2 px-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3"
            >
              <TagIcon
                v-if="selectedTopic === null"
                class="h-5 w-5 flex-shrink-0 text-blue-300 sm:-ml-1"
                aria-hidden="true"
              />
              <!-- <span
              v-else
                :class="[
                  selectedTopic === null ? '' : 'text-gray-900',
                  'hidden truncate sm:ml-2 sm:block',
                ]"
                >{{ selectedTopic === null ? "Topic" : selectedTopic.name }}</span
              > -->
              <!-- <img
                v-else
                :src="assigned.avatar"
                alt=""
                class="h-5 w-5 flex-shrink-0 rounded-full"
              /> -->

              <TagIcon
                v-if="selectedTopic != null"
                class="h-5 w-5 flex-shrink-0 text-blue-500 sm:-ml-1"
                aria-hidden="true"
              />

              <span
                :class="[
                  selectedTopic === null ? '' : 'text-gray-900',
                  'hidden truncate sm:ml-2 sm:block',
                ]"
                >{{
                  selectedTopic === null ? "Topic" : selectedTopic.name
                }}</span
              >
            </ListboxButton>

            <transition
              leave-active-class="transition ease-in duration-100"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <ListboxOption
                  as="template"
                  v-for="topic in availableTopics"
                  :key="topic.uuid"
                  :value="topic"
                  v-slot="{ active }"
                >
                  <li
                    :class="[
                      active ? 'bg-gray-100' : 'bg-white',
                      'relative cursor-default select-none py-2 px-3',
                    ]"
                  >
                    <div class="flex items-center">
                      <!-- <img
                        v-if="assignee.avatar"
                        :src="assignee.avatar"
                        alt=""
                        class="h-5 w-5 flex-shrink-0 rounded-full"
                      />
                      <UserCircleIcon
                        v-else
                        class="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      /> -->
                      <span class="ml-3 block truncate font-medium">{{
                        topic.name
                      }}</span>
                    </div>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>

        <Listbox as="div" v-model="selectedExamination" class="flex-shrink-0">
          <ListboxLabel class="sr-only"> Select Examination </ListboxLabel>
          <div class="relative">
            <ListboxButton
              class="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 py-2 px-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3"
            >
              <BookOpenIcon
                :class="[
                  selectedExamination === null
                    ? 'text-orange-300'
                    : 'text-orange-500',
                  'h-5 w-5 flex-shrink-0 sm:-ml-1',
                ]"
                aria-hidden="true"
              />
              <span
                :class="[
                  selectedExamination === null ? '' : 'text-gray-900',
                  'hidden truncate sm:ml-2 sm:block',
                ]"
                >{{
                  selectedExamination === null
                    ? "Examination"
                    : selectedExamination.name
                }}</span
              >
            </ListboxButton>

            <transition
              leave-active-class="transition ease-in duration-100"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <ListboxOption
                  as="template"
                  v-for="examination in availableExaminations"
                  :key="examination.uuid"
                  :value="examination"
                  v-slot="{ active }"
                >
                  <li
                    :class="[
                      active ? 'bg-gray-100' : 'bg-white',
                      'relative cursor-default select-none py-2 px-3',
                    ]"
                  >
                    <div class="flex items-center">
                      <span class="block truncate font-medium">{{
                        examination.name
                      }}</span>
                    </div>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>

        <Listbox
          as="div"
          v-model="selectedExaminationType"
          class="flex-shrink-0"
        >
          <ListboxLabel class="sr-only"> Examination Type </ListboxLabel>
          <div class="relative">
            <ListboxButton
              class="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 py-2 px-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3"
            >
              <PencilSquareIcon
                :class="[
                  selectedExaminationType === null
                    ? 'text-gray-300'
                    : 'text-gray-500',
                  'h-5 w-5 flex-shrink-0 sm:-ml-1',
                ]"
                aria-hidden="true"
              />
              <span
                :class="[
                  selectedExaminationType === null ? '' : 'text-gray-900',
                  'hidden truncate sm:ml-2 sm:block',
                ]"
                >{{
                  selectedExaminationType === null
                    ? "Examination Type"
                    : selectedExaminationType.name
                }}</span
              >
            </ListboxButton>

            <transition
              leave-active-class="transition ease-in duration-100"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <ListboxOption
                  as="template"
                  v-for="examType in availableExaminationTypes"
                  :key="examType.uuid"
                  :value="examType"
                  v-slot="{ active }"
                >
                  <li
                    :class="[
                      active ? 'bg-gray-100' : 'bg-white',
                      'relative cursor-default select-none py-2 px-3',
                    ]"
                  >
                    <div class="flex items-center">
                      <span class="block truncate font-medium">{{
                        examType.name
                      }}</span>
                    </div>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
      <div
        class="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3"
      >
        <div class="flex">
          <button
            type="button"
            for="file-upload"
            class="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
            @click=""
          >
            <PaperClipIcon
              class="-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500"
              aria-hidden="true"
            />
            <label class="text-sm italic text-gray-500 group-hover:text-gray-600"
              >Attach a file</label>

          </button>

          <input
            type="file"
            class="sr-only"
            id="file-upload"
            name="file-upload"
            accept="image/*, .pdf"
            placeholder="Attach a file"
            multiple
          />
        </div>
        <div class="flex-shrink-0">
          <button
            type="submit"
            class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import {
  CalendarIcon,
  PaperClipIcon,
  TagIcon,
  UserCircleIcon,
  BookOpenIcon,
  PencilSquareIcon,
} from "@heroicons/vue/20/solid";
const assignees = [
  { name: "Unassigned", value: null },
  {
    name: "Wade Cooper",
    value: "wade-cooper",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  // More items...
];
const labels = [
  { name: "Unlabelled", value: null },
  { name: "Engineering", value: "engineering" },
  // More items...
];
const dueDates = [
  { name: "No due date", value: null },
  { name: "Today", value: "today" },
  // More items...
];

const assigned = ref(assignees[0]);
const labelled = ref(labels[0]);
const dated = ref(dueDates[0]);

export default {
  name: "CreateQuestion",
  components: {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
    CalendarIcon,
    PaperClipIcon,
    TagIcon,
    UserCircleIcon,
    BookOpenIcon,
    PencilSquareIcon,
  },
  setup() {
    const availableTopics = [
      { uuid: "abcde12345", name: "Topic 1" },
      { uuid: "abcde12346", name: "Topic 2" },
      { uuid: "abcde12347", name: "Topic 3" },
      { uuid: "abcde12348", name: "Topic 4" },
    ];

    const selectedTopic = ref(null);

    const availableExaminations = [
      { uuid: "abcd12345", name: "Examination 1" },
      { uuid: "abcd12346", name: "Examination 2" },
      { uuid: "abcd12347", name: "Examination 3" },
    ];

    const selectedExamination = ref(null);

    const availableExaminationTypes = [
      { uuid: "abcd12345", name: "Examination Type 1" },
      { uuid: "abcd12346", name: "Examination Type 2" },
      { uuid: "abcd12347", name: "Examination Type 3" },
    ];

    const selectedExaminationType = ref(null);

    const selectFileToUpload = () => {
      // file upload to file-upload

    };

    return {
      assignees,
      labels,
      dueDates,
      assigned,
      labelled,
      dated,
      availableTopics,
      selectedTopic,
      availableExaminations,
      selectedExamination,
      availableExaminationTypes,
      selectedExaminationType,
    };
  },
};
</script>
