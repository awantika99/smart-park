<template>
  <UCard class="card-primary" style="width: 100vw; max-width: 800px;">
    <template #header>
      <div class="custom-header">
        <Icon name="material-symbols:close" @click="closeModal()"
          class="absolute float-right top-2 right-2 w-19 h-14 cursor-pointer" />
      </div>
    </template>
    <div class="p-6">
      <h2 class="text-xl font-semibold mb-4">Success!</h2>
      <p class="text-gray-600">{{ successMessage }}</p>
      <button @click="closeModal" class="mt-4 btn bg-green-500 text-white">Close</button>
    </div>
  </UCard>
</template>
  
<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';

const isOpen = ref(false);
const successMessage = ref('');
const emit = defineEmits(['close']);

const props = defineProps({
  isOpenModal: {
    type: Boolean,
    default: false,
  },
});

watch(() => props.isOpenModal, (newData) => {
  isOpen.value = newData;
  // You can set your success message here
  successMessage.value = 'Your success message goes here.';
});

function closeModal() {
  emit('close');
}
</script>
  
<style scoped>
.custom-modal {
  overflow-y: auto;
}
</style>
  