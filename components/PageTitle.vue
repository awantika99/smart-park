<template>
  <div class="layout-page-header mt-8">
    <h4 class="page-title">{{ pageTitle }}</h4>
    <div class="flex items-center justify-between my-8">
      <div class="left-back">
        <button
          class="flex gap-2 py-2 bg-transparent text-gray-900 rounded-full border-0 border-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Back
        </button>
      </div>

      <div class="right-action flex gap-2">
        <button
          class="py-2 px-5 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:ring focus:bg-gray-600 focus:ring-opacity-75">
          Add
        </button>
        <button
          class="py-2 px-5 bg-white text-gray-800 border border-gray-500 rounded-md shadow-md hover:bg-gray-200 focus:outline-none focus:ring focus:bg-gray-100 focus:ring-opacity-75">
          Import Excel
        </button>
        <button
          class="py-2 px-5 bg-white text-gray-800 border border-gray-500 rounded-md shadow-md hover:bg-gray-200 focus:outline-none focus:ring focus:bg-gray-100 focus:ring-opacity-75">
          Export Excel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
const { id } = useRoute().params
const props = defineProps({
  pageTitle: {
    type: String,
    required: false
  }
})
onMounted(() => {
  console.log('isCompleteTitle:', props.pageTitle)
})
</script>