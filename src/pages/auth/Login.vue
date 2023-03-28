<template>
  <div class="max-w-7xl mx-auto py-8 text-center">
    <div class="bg-white rounded shadow-sm px-8 py-5">

      <div class="bg-red-200 px-4 py-2 rounded text-red-800 inline-block">
        {{ message }} You can try again
      </div>

      <h3 class="text-3xl mx-auto text-gray-700 font-medium">Login</h3>
      <p class="text-sm">
        As at this moment, we only support login with Google and Github. This is
        to guarantte a seamless login experience without the extra overhead of
        another password
      </p>

      <div class="flex justify-center gap-4 mt-6">
        <a :href="googleAuthUrl">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login with Google
          </button>
        </a>

        <a :href="githubAuthUrl">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login with Github
          </button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted,ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();

    // get the message from the url


    const message = ref(router.currentRoute.value.query.message);


    return {
      googleAuthUrl: "http://localhost:3001/auth/google",
      githubAuthUrl: "http://localhost:3001/auth/github",
      message,
    };
  },
};
</script>

<style lang="scss" scoped></style>
