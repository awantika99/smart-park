<template>
  <div class="rounded-md">
      <ckeditor :editor="editor" v-model="local" :config="editorConfig"></ckeditor>
  </div>
</template>

<script setup lang="ts">

//import '@ckeditor/ckeditor5-build-classic/build/ckeditor.css';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
//import ListPlugin from '@ckeditor/ckeditor5-list/src/list';
//import HeadingPlugin from '@ckeditor/ckeditor5-heading/src/heading';
//import { Essentials } from '@ckeditor/ckeditor5-essentials';
    // import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
    // import { Link } from '@ckeditor/ckeditor5-link';
    // import { Paragraph } from '@ckeditor/ckeditor5-paragraph';

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type:  String,
    default: null,
  },
  label: {
    type: String,
    default: 'nameEn',
  },
  value: {
    type: String,
    default: 'id',
  },
  placeholder: {
    type: String,
    default: 'Select ...',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})



const editor = ClassicEditor
const editorConfig = {
       // plugins: [ ListPlugin ],
       // toolbar: ['bulletedList', 'numberedList', 'heading'],
            // toolbar: {
            //     items: [
            //         'bold',
            //         'italic',
            //         'link',
            //         'undo',
            //         'redo',
            //         'heading'
            //     ]
            // }
  }

const local = ref(props.modelValue)
watch(
  () => props.modelValue,
  () => {
    local.value = props.modelValue
  }
)

watch(local, (value) => {
  emit('update:modelValue', value)
})
</script>
<style>

/* Apply custom typography to CKEditor content */

/* Set the font family and basic text styles */
.ck-editor__editable {
  font-family: 'your-tailwind-font-stack', sans-serif;
  font-size: 16px; /* Adjust as needed */
  line-height: 1.5; /* Adjust line height as needed */
  color: #333; /* Adjust text color */
}

/* Apply heading styles to CKEditor headings */
/* You can customize these styles to match your Tailwind CSS classes */
.ck-editor__editable h1 {
  font-size: 2rem; /* Adjust heading 1 font size */
  font-weight: bold; /* Adjust heading 1 font weight */
  margin-top: 1rem; /* Adjust heading 1 margin */
  margin-bottom: 1rem; /* Adjust heading 1 margin */
  color: #333; /* Adjust heading 1 text color */
}

.ck-editor__editable h2 {
  font-size: 1.5rem; /* Adjust heading 2 font size */
  font-weight: bold; /* Adjust heading 2 font weight */
  margin-top: 1rem; /* Adjust heading 2 margin */
  margin-bottom: 1rem; /* Adjust heading 2 margin */
  color: #333; /* Adjust heading 2 text color */
}

.ck-editor__editable h4 {
  font-size: 1.25rem; /* Adjust heading 3 font size */
  font-weight: bold; /* Adjust heading 3 font weight */
  margin-top: 1rem; /* Adjust heading 3 margin */
  margin-bottom: 1rem; /* Adjust heading 3 margin */
  color: #333; /* Adjust heading 3 text color */
}

/* Style CKEditor paragraphs */
/* Customize paragraph styles to match your design */
.ck-editor__editable .p {
  margin-bottom: 1rem; /* Adjust paragraph margin */
  color: #333; /* Adjust paragraph text color */
}

/* Customize list styles if needed */
/* Replace with your Tailwind CSS classes */
.ck-editor__editable ul, ol {
  margin-bottom: 1rem; /* Adjust list margin */
  list-style-position: inside; /* Adjust list style position */
}

/* Customize list item styles if needed */
/* Replace with your Tailwind CSS classes */
.ck-editor__editable li {
  margin-bottom: 0.25rem; /* Adjust list item margin */
}
.ck-powered-by {
  display: none;
}
/* Style links in CKEditor content */
.ck-editor__editable a {
  text-decoration: underline; /* Add underline to links */
  color: #007bff; /* Change link text color */
}

/* Style visited links */
.ck-editor__editable a:visited {
  color: #551a8b; /* Change color for visited links */
}

/* Style hovered links */
.ck-editor__editable a:hover {
  color: #ff4500; /* Change color for hovered links */
}

/* Style active links (when clicked) */
.ck-editor__editable a:active {
  color: #dc143c; /* Change color for active links */
}

.ck-editor__editable .page-break {
    position: relative;
    clear: both;
    padding: 5px 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
/* @ckeditor/ckeditor5-page-break/theme/pagebreak.css */
.ck-editor__editable .page-break::after {
    content: '';
    position: absolute;
    border-bottom: 2px dashed hsl(0, 0%, 77%);
}
.ck-editor__editable .media {
    clear: both;
    margin: 0.9em 0;
    display: block;
    min-width: 15em;
}
    

</style>



