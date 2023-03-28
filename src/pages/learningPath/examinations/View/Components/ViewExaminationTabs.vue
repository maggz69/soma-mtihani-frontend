<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <div>
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
      <select
        id="tabs"
        name="tabs"
        class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      >
        <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">
          {{ tab.name }}
        </option>
      </select>
    </div>
    <div class="hidden sm:block">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <router-link
            v-for="tab in tabs"
            :key="tab.name"
            :to="{ name: tab.routeName, params: { id: $route.params.id } }"
            :class="[
              tab.current
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200',
              'whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm',
            ]"
            :aria-current="tab.current ? 'page' : undefined"
          >
            {{ tab.name }}
            <span
              v-if="tab.count"
              :class="[
                tab.current
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'bg-gray-100 text-gray-900',
                'hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block',
              ]"
              >{{ tab.count }}</span
            >
          </router-link>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
const tabs = [
  { name: "Applied", href: "#", count: "52", current: false },
  { name: "Phone Screening", href: "#", count: "6", current: false },
  { name: "Interview", href: "#", count: "4", current: true },
  { name: "Offer", href: "#", current: false },
  { name: "Disqualified", href: "#", current: false },
];

import learningPathRoutes from "@/routes/learningPath.js";
import { onMounted, reactive, watch } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "ViewExaminationTabs",
  setup() {
    const route = useRoute();
    const tabs = reactive([]);

    // watch if the route changes and update the tabs
    watch(route, () => {
      tabs.forEach((tab) => {
        tab.current = false;
      });

      const currentTab = tabs.find((tab) => tab.routeName === route.name);
      if (currentTab) {
        currentTab.current = true;
      }
    });

    const buildRoutesForVueExamination = () => {
      const nestedRoutes = function (route) {
        if (route.children) {
          return route.children.map(nestedRoutes);
        }
        return route;
      };

      // flatten all the nested routes into a single array recursively
      const routes = learningPathRoutes
        .map(nestedRoutes)
        .flat(Infinity)
        .filter((route) => route.path != undefined);

      // Match only routes with name view-examination-*
      const filteredRoutes = routes.filter((route) => {
        return route.name && route.name.includes("view-examination-");
      });

      const capitalizeWord = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      };

      const checkIfCurrentRoute = (routeName) => {
        return routeName === route.name;
      };

      filteredRoutes
        .map((route) => {
          return {
            name: capitalizeWord(route.name.replace("view-examination-", "")),
            routeName: route.name,
            current: checkIfCurrentRoute(route.name),
          };
        })
        .forEach((tab) => {
          tabs.push(tab);
        });
    };

    onMounted(() => {
      buildRoutesForVueExamination();
    });

    return { tabs };
  },
};
</script>
