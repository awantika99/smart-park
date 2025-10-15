
<template>
    <div class="flex flex-row">
        <label class="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
            {{ label }}
            <input type="file" class="hidden" @change="onFileChange($event)">
        </label>
        <div v-if="filename" class="ms-2 mt-3">
            <Icon  name="mdi:eye-circle" @click="showPopup=true" />
        </div>
    </div>
      <ImageViewer v-if="showPopup" :title=filename :imageBuffer="previewImage" @close="showPopup=false"></ImageViewer>
  </template>
  
  <script setup lang="ts">
  
  const emit = defineEmits(['update:modelValue'])
  const filename = ref('')
  const previewImage: Ref<ArrayBuffer> | null = ref(new ArrayBuffer(1024))
  const showPopup:Ref<boolean> = ref(false)
  const props = defineProps({
    modelValue: {
      type: Number || String,
      default: null,
    },
    endpoint: {
      type: String,
    },
    label:{
      type: String,
      default:'Upload Image'
    }
  })
 const  onFileChange=(event:any)=> {
      let reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
        let file = event.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                //previewImage.value = reader.result;
            };
        }
        filename.value = file.name
        var params = [{ fileType: "jpg,png,jpeg" }]
        let extensions = params.filter(item => item.fileType)[0];
        if (extensions.fileType.toLowerCase().split(",").indexOf(file.name.toLowerCase().split(".").pop()) === -1) {
          alert("Invalid file format. Supported file formats (" + extensions.fileType + ")");
          return;
        }
        console.log('file',file)
        emit('update:modelValue', file)
      
      }
    }
  </script>
  
