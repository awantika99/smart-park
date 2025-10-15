<template>
  <div class="image-upload bg-gray-200 dark:bg-gray-800 max-w-[200px] rounded-md">
    <div
      class="text-center border-2 mx-auto cursor-pointer rounded relative h-full">
      <div v-if="enableDelete && isDeletable" class="absolute top-0 right-0 bg-red-500 dark:bg-blue-500 p-2 rounded-md z-10"
        @click="deleteFile">
        <Icon name="delete-white" />
      </div>
      <label v-if="!isUploading" :for="id" class="h-full flex justify-center relative">
        <span v-if="multiple && filePointer?.length > 1"
          class="absolute right-2 bg-green-500 dark:bg-purple-500 text-white dark:text-gray-900 rounded-full px-2">{{ filePointer.length }}</span>
        <img v-if="isImage && imageUrl" :src="imageUrl" class="h-full object-contain" />
        <video v-else-if="isVideo && imageUrl" :src="imageUrl" class="h-full object-contain w-full bg-white dark:bg-gray-900" controls
          autoplay playsinline />
        <span v-else-if="!isImage && fileName"
          class="h-full flex justify-center items-center w-full p-4 text-gray-400 dark:text-gray-600 break-all">{{ fileNameMessage }}</span>
        <span v-else-if="placeholder"
          class="h-full flex justify-center items-center w-full p-4 text-gray-400 dark:text-gray-600 break-words">{{ placeholder }}</span>
        <span v-else-if="$slots.default">
          <slot />
        </span>
        <span v-else class="h-full flex justify-center items-center w-full p-4 font-thin text-4xl">+</span>
      </label>
      <label v-else :for="id" class=" mt-10 h-full flex justify-center relative">
        <loader></loader>
      </label>

      <!-- <input type="file"
      :name="id"
      :id="id"
      @change="previewFiles"
       accept="image/png, image/jpeg"
       > -->

      <div v-if="label" class="bg-gray-100 dark:bg-gray-900 block font-bold py-1 m-0.5">
        {{ label }}
      </div>
    </div>
    <div class="mt-1" v-if="showHelpLabel">
      <p class="text-[12px] font-light">
        Max file size {{ humanFileSize(maxSize) }}
      <p>Supported formats:
        {{
          allowedExtensions.reduce((a, b, i) => {
            return a + ', ' + b
          })
        }}</p>
      </p>
    </div>
    <div>
      <file-upload v-if="!readOnly" ref="upload" v-model="filePointer" class="p-2 text-center"
        :extensions="allowedExtensions" :accept="mimeTypes" :name="id" :drop="true" :multiple="false"
        @input-filter="inputFilter" @input-file="inputFile">
      </file-upload>

      <div v-if="helptext" class="-mt-6 text-gray-900 dark:text-gray-100 text-xs">
        {{ helptext }}
      </div>
      <div v-if="errorMessage" class="-mt-0">
        <ValidationMessage>{{ errorMessage }}</ValidationMessage> 
      </div>

      <div v-show="!autoUpload && endpoint && !isUploaded && filePointer.length" class="mt-4 p-2 text-center">
        <button
          class="bg-pr hover:bg-primary-light2 text-white dark:text-gray-900 font-bold py-2 px-12 focus:outline-none focus:shadow-outline"
          type="button" @click="uploadFiles">
          Upload
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FileUpload from 'vue-upload-component'
import * as pkg from 'vue-toastification'
export default {
  components: { FileUpload },
  props: {
    modelValue: {
      required: false,
      type: Array || String,
      default() {
        return []
      },
    },
    initial: {
      required: false,
      type: String,
      default() {
        return null
      },
    },
    endpoint: {
      required: false,
      type: String,
      default() {
        return null
      },
    },
    errorMessage:{
      required: false,
      type: String,
      default() {
        return null
      },
    },
    placeholder: {
      required: false,
      type: String,
      default: () => {
        return ''
      },
    },
    helptext: {
      required: false,
      type: String,
      default: () => {
        return ''
      },
    },
    label: {
      required: false,
      type: String,
      default: () => {
        return ''
      },
    },
    extensions: {
      required: false,
      type: [Array, String],
      default: () => {
        return ['jpg', 'png']
      },
    },
    multiple: {
      required: false,
      type: Boolean,
      default: false,
    },
    enableDelete: {
      required: false,
      type: Boolean,
      default: false,
    },
    maxSize: {
      required: false,
      type: Number,
      default: null,
    },
    uploadKey: {
      required: false,
      type: String,
      default: 'file',
    },
    readOnly: {
      required: false,
      type: Boolean,
      default: false,
    },
    patch: {
      required: false,
      type: Boolean,
      default: false,
    },
    extraParams: {
      required: false,
      type: Object,
      default: null,
    },
    autoUpload: {
      required: false,
      type: Boolean,
      default: false,
    },
    showHelpLabel: {
      type: Boolean,
      default: true,
    },
    isPrivateUrl: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { useToast } = pkg
    const toast = useToast()
    const isUploading = ref(false)
    const id = (Math.random() + 1).toString(36).substring(7)

    const filePointer = ref()
    const initialUrl = ref(props.initial)

    const updateUrl = () => {
      if (typeof props.modelValue == 'string') {
        initialUrl.value = props.modelValue
        // if (props.modelValue.startsWith('http')) {
        //   initialUrl.value = props.modelValue
        // }
      }
    }

    watch(
      () => props.modelValue,
      () => {
        updateUrl()
      }
    )

    updateUrl()

    const isUploaded = ref(false)

    const getExtension = (path) => {
      return path.split(/[#?]/)[0].split('.').pop().trim().toLowerCase()
    }

    const newExtension = ref(null)

    if (props.modelValue) {
      filePointer.value = props.modelValue
    }

    const inputFilter = (newFile, oldFile, prevent) => {
      if (newFile && !oldFile) {
        const variable = allowedExtensions.value.join('|')
        const expression = `.(${variable})$`
        const re = new RegExp(expression, 'i')
        newExtension.value = getExtension(newFile.name)
        if (!re.test(newFile.name)) {
          toast.error(fileTypeMessage.value + '!')
          return prevent()
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        newFile.url = ''
        const URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.url = URL.createObjectURL(newFile.file)
        }
      }
      // If file size greater than max size, alert.
      if (newFile.size > props.maxSize) {
        toast.error(
          `Please choose a file with size no more than ${humanFileSize(
            props.maxSize
          )}.`
        )
        return prevent()
      }
      isUploaded.value = false
    }
    const uploadToS3 = (file, url, fields,proxyURL) => {
      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append('file', file);
      let resourceURL = (proxyURL || url) + fields.key
      useApi(url, { method: 'POST', body: formData }, true).then((response) => {
          isUploading.value = false;
          emit('update:modelValue',resourceURL )
        }).catch(()=>{
            isUploading.value = false;
            emit('update:modelValue',resourceURL )
        })
        //temporart fixes due to cros from aws upload
      
    }

    const uploadFiles = async () => {
      if (filePointer.value.length) {
        isUploading.value = true;
        let file = filePointer.value[0].file
        let url = '/file-upload/generate-public-post-url/'
        if(props.isPrivateUrl){
          url = '/file-upload/generate-private-post-url/'
        }
        useApi(url, { method: 'POST', body: { key:formatedFileNameForUpload.value,content_type:file.type } }).then((response) => {
          uploadToS3(file, response.url, response.fields,response.proxy_url)
        })
        // console.log('data',data)
        // const formData = new FormData()
        // formData.append(props.uploadKey, filePointer.value[0].file)
        // if (props.extraParams) {
        //   for (const [key, value] of Object.entries(props.extraParams)) {
        //     formData.append(key, value)
        //   }
        // }
        // const method = props.patch ? $axios.$patch : $axios.$post
        // method(props.endpoint, formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //   },
        // })
        //   .then((response) => {
        //     // const existing = initial.value
        //     // const merged = Object.assign({}, existing, response)
        //     // initial.value = merged
        //     isUploaded.value = true
        //     filePointer.value[0].success = true
        //     filePointer.value[0].upload_response = response
        //     toast.success('Uploaded!')
        //     emit('uploaded')
        //   })
        //   .catch(() => {
        //     toast.error('Upload failed!')
        //   })
      }
    }

    const deleteFile = () => {
      const deleteParams = props.extraParams
      // $axios
      //   .delete(props.endpoint, {
      //     data: deleteParams,
      //   })
      //   .then(() => {
      //     filePointer.value = []
      //     initialUrl.value = null
      //     emit('delete', { files: filePointer.value, initial: props.initial })
      //     toast.success('Deleted!')
      //   })
    }

    // When using HTML native input file instead of file-upload component
    // const previewFiles = (event) => {
    //   if (props.multiple){
    //     filePointer.value = [...event.target.files]
    //   }else{
    //     filePointer.value = event.target.files[0]
    //   }
    //   emit('update:modelValue', filePointer.value)
    // }

    const inputFile = (newFile, oldFile, prevent) => {
      // Image post processing can be done here
      if (
        props.autoUpload
        // props.endpoint &&
        // !isUploaded.value &&
        // filePointer.value.length
      ) {
        uploadFiles()
      }
      // if (props.modelValue) {
      //   if (filePointer.value.length) {
      //     if (props.multiple) {
      //       emit('update:modelValue', filePointer.value.map(o => o.file))
      //     } else {
      //       emit('update:modelValue', filePointer.value[0].file)
      //     }
      //   }
      // } else {
      //   emit('update:modelValue', filePointer.value)
      // }
    }

    const isDeletable = computed(() => {
      return filePointer.value.length || initialUrl.value
    })

    const imageUrl = computed(() => {
      if (filePointer.value.length && filePointer.value[0].url) {
        return filePointer.value[0].url
      }
      if (initialUrl.value) {
        return getImagePreview(initialUrl.value)
      }
      return null
    })

    const fileExtension = computed(() => {
      if (newExtension.value) {
        return newExtension.value
      }
      if (initialUrl.value) {
        return getExtension(initialUrl.value)
      }
      return null
    })

    const isImage = computed(() => {
      return [
        'png',
        'jpg',
        'jpeg',
        'bmp',
        'gif',
        'webp',
        'tif',
        'tiff',
      ].includes(fileExtension.value)
    })

    const isVideo = computed(() => {
      return ['mp4', 'mpeg', 'mpg', 'avi', 'mov'].includes(fileExtension.value)
    })

    const allowedExtensions = computed(() => {
      let extensions = props.extensions
      if (typeof extensions === 'string') {
        extensions = extensions.split(',')
      }
      if (extensions.includes('jpg') && !extensions.includes('jpeg')) {
        extensions.push('jpeg')
      }
      if (extensions.includes('jpeg') && !extensions.includes('jpg')) {
        extensions.push('jpg')
      }
      if (extensions.includes('mpeg') && !extensions.includes('mpg')) {
        extensions.push('mpg')
      }
      if (extensions.includes('mpg') && !extensions.includes('mpeg')) {
        extensions.push('mpeg')
      }
      return extensions
    })

    const mimeTypes = computed(() => {
      const types = []
      const dct = {
        jpg: 'image/jpeg',
        png: 'image/png',
        pdf: 'application/pdf',
        mov: 'video/quicktime',
        avi: 'video/x-msvideo',
        wmv: 'video/x-ms-wmv',
        flv: 'video/x-flv',
        mp4: 'video/mp4',
        mpg: 'video/mpeg',
        webm: 'video/webm',
        '3gp': 'video/3gp',
        csv:'text/csv',
        xlsx:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
      allowedExtensions.value.forEach((extension) => {
        if (extension in dct) {
          types.push(dct[extension])
        }
      })
      return types.join()
    })

    const humanFileSize = (size) => {
      const i = Math.floor(Math.log(size) / Math.log(1024))
      return (
        (size / Math.pow(1024, i)).toFixed(2) * 1 +
        ' ' +
        ['B', 'kB', 'MB', 'GB', 'TB'][i]
      )
    }

    const fileTypeMessage = computed(() => {
      let st = 'Please select '
      if (!props.multiple) {
        st += 'a '
      }
      const extensions = allowedExtensions.value

      // Remove jpeg because jpg already exists
      const filtered = extensions
        .filter(function (value, index, arr) {
          return !['jpeg'].includes(value)
        })
        .sort()
      // Join with commas
      let extStr = filtered.join(', ')
      const lastJoiner = filtered.length === 2 ? ' or' : ', or'
      // Replace last comma with " or" or ", or"
      extStr = extStr.replace(/,(?=[^,]*$)/, lastJoiner)
      st += extStr + ' '
      if (props.multiple) {
        st += 'files'
      } else {
        st += 'file'
      }
      return st
    })

    const getImagePreview = (src) => {
      const fileIcon =
        'data:image/png;base64, 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'
      let extension
      if (typeof src === 'string') {
        // Return blob if file upload
        if (src.startsWith('blob:')) return src
        // get the file extension
        extension = getExtension(src)
        if (['jpg', 'jpeg', 'png'].includes(extension)) return src
        if (extension === 'pdf') {
          return fileIcon
        }
        return src
      } else if (
        typeof src === 'object' &&
        Array.isArray(src) &&
        'name' in src[0]
      ) {
        extension = getExtension(src[0].name)
        if (['jpg', 'jpeg', 'png'].includes(extension)) return src[0].file
        return fileIcon
      }
    }

    const fileName = computed(() => {
      if (filePointer.value?.length && filePointer.value[0]?.name) {
        let name = filePointer.value[0].name
        // let timestamp = "_" + Date.now();
        // name = name.replace(/\s/g, "_");
        // name=name.replace(/(\.[^.]+)$/, timestamp + "$1");
        return name
      }
      if (initialUrl.value) {
        // Get name from url
        let name = initialUrl.value.split('/').pop().split('#')[0].split('?')[0]
 
        // Remove UUID from name
        name = name
          .replace(
            /[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/,
            ''
          )
          .replace('-.', '.')
          // name = name.replace(/\s/g, "_");
          // name=name.replace(/(\.[^.]+)$/, timestamp + "$1");
        return name
      }
      return null
    })
    const formatedFileNameForUpload =computed(()=>{
      let timestamp = "_" + Date.now();
      let name = fileName.value
      name = name.replace(/\s/g, "_");
      name=name.replace(/(\.[^.]+)$/, timestamp + "$1");
      return name;
    })

    const fileNameMessage = computed(() => {
      let st = ''
      if (isUploaded.value || !newExtension.value) {
        st += 'Uploaded '
      } else {
        st += 'Selected '
      }
      st += fileName.value
      return st
    })

    return {
      filePointer,
      fileExtension,
      imageUrl,
      inputFile,
      inputFilter,
      uploadFiles,
      getImagePreview,
      allowedExtensions,
      mimeTypes,
      isImage,
      isVideo,
      fileNameMessage,
      isUploaded,
      fileName,
      id,
      isUploading,
      isDeletable,
      deleteFile,
      initialUrl,
      humanFileSize,
      // previewFiles
    }
  },
}
</script>
