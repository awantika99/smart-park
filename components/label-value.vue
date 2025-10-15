<template>
    <div class="col">
      <div class="flex flex-col ...">
        <b class="py-1.5">{{label}}</b>
        <p>{{ value===null || value===''?'N/A':value}}</p>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  const props = defineProps({
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },

  })
  </script>
  