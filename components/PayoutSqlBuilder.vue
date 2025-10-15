<template>
  <div class="">
    <UButton  @click="copyToClipboard" class="float-right" square color="white" title="Copy Content" id="table-edit-modal">
        <Icon name="material-symbols:content-copy" class="cursor-pointer" />
     </UButton><br/>
      <!-- <button @click="copyToClipboard">Copy Text</button> -->
     
      <div class="">
        {{ props.modalContent || '' }}
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import {useToast} from 'vue-toastification'

const sqlQueryBuilder = ref('');
const props = defineProps({
  isOpenModal: {
    type: Boolean,
    required: true,
  },
  modalContent: {
    type: String,
    required: true,
  
  },
});

onMounted(() => {
  // console.log("sqlQueryBuilder",sqlQueryBuilder.value)
   console.log('PayoutSqlbuilder', props.payoutMethod);
  sqlQueryBuilder.value = '';
});
const copyToClipboard=()=> {
      const textToCopy =props. modalContent;
      // Create a textarea element dynamically
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';

      // Append the textarea to the DOM
      document.body.appendChild(textarea);

      // Select and copy the text
      textarea.select();
      document.execCommand('copy');

      // Remove the textarea from the DOM
      document.body.removeChild(textarea);
      const toast = useToast()
      toast.success('Successfully copied to clipboard.')
}
  
</script>

  