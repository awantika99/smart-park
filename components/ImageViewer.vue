<template>
    <div
      class="mt-2 grid place-content-center bg-gray-700 bg-opacity-50 absolute top-20 left-0 w-screen h-screen z-50"
      v-if="showModal">
      <div class="w-96 bg-white relative">
        <h1 class="w-full bg-red-400 text-white text-lg p-4">{{ title }}</h1>
        <div class="w-50 h-50 overflow-hidden">
            <img class="w-full h-full object-cover object-center" :src="imageBuffer || imageUrl" alt="Image">
        </div>
        <button class="absolute top-2 right-2" @click="closeModal">
          <Icon name="ic:baseline-close" class="text-white hover:bg-white hover:bg-opacity-10" size="16" />
        </button>
      </div>
    </div>
  </template>
  <script setup lang="ts">
  const emit = defineEmits(['close', 'ok', 'cancel'])
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
    imageBuffer: {
      type: String,
      required: false,
    },
    imageUrl: {
      type: String,
      required: false,
    },
  })
  
  const showModal = ref(true)
 
  
  function closeModal() {
    showModal.value = false
    emit('close')
  }
  
  function onOK() {
    showModal.value = false
    emit('ok')
  }
  
  function onCancel() {
    showModal.value = false
    emit('cancel')
  }
  </script>
  