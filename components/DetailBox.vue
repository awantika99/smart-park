<template>
  <div v-if="!hideDetailsBox" class="border border-gray-300 dark:border-gray-700 text-sm">
    <div class="px-4 py-2 bg-gray-200/90 dark:bg-gray-800/90 flex items-center gap-3 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100">
      <Icon name="material-symbols:menu-rounded" size="24px" />
      <div class="font-bold text-gray-800" v-if="!props.isCompleteTitle">{{ title + ':' }} {{ id ? 'Edit' : 'Create' }}</div>
      <!-- <div v-else-if="props.agreementTitle"></div>  -->
      <div class="font-bold text-gray-800" v-else>{{ title }}</div>
    </div>
    <div class="px-4 py-6 bg-white dark:bg-gray-900 text-black dark:text-gray-100">
      <slot v-if="!isLoading" />
      <div  v-else class="flex items-center justify-center">
        <Loader></Loader>
      </div>
    </div>
  </div>
  <div v-else>
    <slot v-if="!isLoading" />
    <div  v-else class="flex items-center justify-center">
        <Loader class="flex item-center" ></Loader>
    </div>
  </div>
</template>

<script setup lang="ts">
const { id } = useRoute().params
import {onMounted} from 'vue'
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  isCompleteTitle: {
    type: Boolean,
    required: false,
    default: false,
  },
  hideDetailsBox:{
    type:Boolean,
    default:false
  },
  isLoading:{
    type:Boolean,
    default:false
  },
  agreementTitle:{
    type:Boolean,
    default:false
  }
})
onMounted(() => {
  console.log('isCompleteTitle:', props.isCompleteTitle)
})
</script>
