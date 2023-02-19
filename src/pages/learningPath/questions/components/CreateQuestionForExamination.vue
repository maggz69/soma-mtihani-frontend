<template>
  <div class="bg-white rounded shadow-sm px-8 py-5">
    <div class="grid grid-cols-6 gap-3">
      <div class="col-span-6 sm:col-span-3">
        <label for="order" class="block text-sm font-medium text-gray-700">
          Order
        </label>
        <p class="text-xs text-gray-500">
          This is similar to the question number. By default, this is how the
          question will be ordered when the Examination Paper is viewed
        </p>
        <div class="mt-1">
          <input
            v-model="question.order"
            type="number"
            name="order"
            id="order"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div class="col-span-6 sm:col-span-3">
        <label for="sequence" class="block text-sm font-medium text-gray-700">
          Sequence
        </label>
        <p class="text-xs text-gray-500">
          This is similar to the question sub-number. By default, this is how
          the question will be ordered when multiple orders are found
        </p>
        <div class="mt-1">
          <input
            v-model="question.order"
            type="number"
            name="sequence"
            id="sequence"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div class="col-span-6 sm:col-span-3">
        <label for="type" class="block text-sm font-medium text-gray-700">
          Type
        </label>

        <div class="mt-1">
          <select
            v-model="question.type"
            id="type"
            name="type"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          >
            <option value="multiple-choice">Multiple Choice</option>
            <option value="true-false">True False</option>
            <option value="long-form-answer">Long Form Answer</option>
          </select>
        </div>
      </div>

      <div class="col-span-6">
        <label for="title" class="block text-sm font-medium text-gray-700">
          Title
        </label>
        <p class="text-xs text-gray-500 max-w-2xl">
          The question being asked in the examination. Any additional
          information related to the question should be included in the
          description field. For multiple choice questions, the options should
          be placed in the description field.
        </p>
        <div class="mt-1">
          <input
            v-model="question.title"
            type="text"
            name="title"
            id="title"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div class="col-span-6">
        <label
          for="description"
          class="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <div class="mt-1">
          <textarea
            v-model="question.description"
            id="description"
            name="description"
            rows="3"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          ></textarea>
        </div>
      </div>

      <div class="col-span-3">
        <label for="add-topic" class="block text-sm font-medium text-gray-700">
          Add Topic
        </label>
        <p class="text-xs text-gray-600">
          Type the topic name if it does not exist from the list of available
          topics for this course and press enter. It will be added into the
          catalog for future Questions.
        </p>
        <input
          type="text"
          id="add-topic"
          class="shadow-sm focus:ring-indigo-500 w-full focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
          v-on:keyup.enter="addTypedTopicToQuestion($event)"
        />
      </div>
      <div class="col-span-3" v-if="courseTopics.length > 0">
        <label
          for="select-topic"
          class="block text-sm font-medium text-gray-700"
        >
          Select Topic
        </label>
        <select
          v-model="question.topics"
          id="select-topic"
          name="select-topic"
          multiple
          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        >
          <option v-for="topic in topics" :value="topic.id">
            {{ topic.name }}
          </option>
        </select>
      </div>
      <div class="col-span-3" v-else></div>
      <div class="col-span-6" v-if="question.topics.length > 0">
        <label
          for="Added Topics"
          class="block text-sm font-medium text-gray-700"
        >
          Added Topics
        </label>
        <div class="mt-1">
          <div
            v-for="(topic, indx) in question.topics"
            :key="topic.indx"
            class="inline-flex"
          >
            <div
              class="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span>{{ topic }}</span>
              <XCircleIcon
                class="h-4 w-4 ml-2 text-gray-400 hover:text-gray-500 cursor-pointer"
                @click="removeTopicFromQuestion(indx)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-3">
        <label
          for="image-attachment"
          class="block text-sm font-medium text-gray-700"
          >Attach an Image</label
        >
        <input
          type="file"
          id="image-attachment"
          name="image-attachment"
          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          @change="handleQuestionImageUpload($event)"
          accept=".png,.jpg"
        />
      </div>
    </div>

    <div class="flex justify-end">
      <button
        type="button"
        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        @click="createQuestion"
      >
        Create Question
      </button>
    </div>
  </div>
</template>

<script>
import { XCircleIcon } from "@heroicons/vue/20/solid";
import { reactive, ref, inject } from "vue";
import axiosInstance from "@/api/axiosInstance";

export default {
  name: "CreateQuestionForExamination",
  props: {
    examinationId: {
      id: String,
      required: false,
    },
  },
  setup(props) {
    const question = reactive({
      order: 1,
      sequence: 1,
      title: "",
      description: "",
      type: "",
      examinationId: "",
      topics: [],
    });
    const courseTopics = ref([]);
    const examinationInjections = inject("examination");

    if (examinationInjections) {
      const examination = examinationInjections.value;
      question.examinationId = examination._id;
    }
    const questionImages = reactive([]);
    const handleQuestionImageUpload = (event) => {
      const files = event.target.files;
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      axiosInstance
        .post("/upload", formData)
        .then((response) => {
          questionImages.value = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const addTypedTopicToQuestion = (event) => {
      const topicName = event.target.value;
      question.topics.push(topicName);
      // clear the input field
      event.target.value = "";
    };

    const removeTopicFromQuestion = (index) => {
      question.topics.splice(index, 1);
    };

    const createQuestion = () => {
      axiosInstance
        .post("/questions", question)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    return {
      question,
      questionImages,
      handleQuestionImageUpload,
      courseTopics,
      addTypedTopicToQuestion,
      removeTopicFromQuestion,
      handleQuestionImageUpload,
      createQuestion,
    };
  },
  components: { XCircleIcon },
};
</script>

<style lang="scss" scoped></style>
