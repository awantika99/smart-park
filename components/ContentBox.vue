<template>
<div class="bg-white p-5 rounded-lg shadow-md mb-5">
      <div class="content_box_title" v-if="Contenttitle"> {{ Contenttitle }} </div>

     <slot> </slot>
     
     </div>
</template>

<script setup lang="ts">
const { id } = useRoute().params
import {onMounted} from 'vue'
const props = defineProps({
  Contenttitle: {
    type: String,
    required: true,
  }
   
})
onMounted(() => {
  console.log('isCompleteTitle:', props.isCompleteTitle)
})
</script>
