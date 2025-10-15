
<template>
  <div class="w-full md:w-1/2"
    style="background-image: url('/images/back.jpg'); background-size: cover; background-position: center center;">
    <div class="d-flex flex-column align-items-center justify-content-center background-light">
      <div class="row align-items-center">
        <div class="d-flex flex-column justify-content-center align-items-center mt-40 px-10 ">
          <div class="h-50 w-50 lg:ml-5 flex items-center justify-center">

            <img src="/images/logo.jpg" alt="logo"
                    class="h-full object-center dark:invert" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Number || String || Object,
    default: null,
  },
  label: {
    type: String,
    default: 'nameEn',
  },
  selectObject: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    default: 'id',
  },
  placeholder: {
    type: String,
    default: 'Select Option',
  },
  options: {
    type: Array,
    default: null,
  },
  processOptions: {
    type: Function || undefined,
  },
  endpoint: {
    type: String,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  customDropDownWidth: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})


</script>