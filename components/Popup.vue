<template>
  <div
    class="grid place-content-center bg-gray-700 bg-opacity-50 absolute top-0 left-0 w-screen h-screen z-50"
    v-if="showModal"
  >
    <div class="w-96 bg-white relative">
      <h1 class="w-full bg-gray-600 text-white text-lg p-4">{{ title }}</h1>
      <h2 class="p-4 text-sm text-gray-700">{{ subtitle }}</h2>
      <div class="flex text-gray-600 text-sm">
        <button data-testid='confirm' class="w-1/2 border p-2 hover:bg-gray-100" @click="onOK">{{ okButtonTextRef.value || okButtonText }}</button>
        <button class="w-1/2 border p-2 hover:bg-gray-100" @click="onCancel">{{ cancelButtonText }}</button>
      </div>
      <button class="absolute top-2 right-2" @click="closeModal">
        <Icon name="ic:baseline-close" class="text-white hover:bg-white hover:bg-opacity-10" size="16" />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits(['close', 'ok', 'cancel','save'])
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  okButtonText:{
    type: String,
    required:false,
    default:'OK'
  },
  okButtonTextRef:{
    type:ref,
    required:false,
    default:'OK'
  },
  cancelButtonText:{
    type:String,
    required:false,
    default:'Cancel'
  },
  timer:{
    type:Number,
    default:0
  }
})

const showModal = ref(true)
if(props.timer){
  setTimeout(() => {
      showModal.value=false
  }, props.timer)
}


watch(
  () => props.timer,
  (newData) => {
    console.log('newData',newData)
    if(newData>0){
     setTimeout(() => {
      showModal.value=false
    }, newData)
    }
 
  }
)
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
