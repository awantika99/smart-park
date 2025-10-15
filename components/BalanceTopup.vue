<template>
  <div class="flex flex-col gap-4">
    <div class="font-bold text-red-700 dark:text-blue-300 text-xl leading-none">{{ title }}</div>
    <input
      type="text"
      v-model="input"
      class="border border-gray-400 dark:border-gray-600 px-3 py-1.5 text-xl w-72 text-red-700 dark:text-blue-300 font-bold bg-gray-300 dark:bg-gray-700 outline-1 focus:outline-red-500 dark:focus:outline-blue-500"
      :disabled="inputDisabled"
    />
    <button class="btn">Top Up</button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  inputDisabled: {
    type: Boolean,
    default: false,
  },
})
const input = ref(props.modelValue)
</script>
