<template>
    <label class="form-label mb-1">
        <slot></slot> <span v-if="required" class="text-red-500 ml-1">*</span>
        <!-- v-if="required" -->
    </label>
</template>
<script setup lang="ts">
const props = defineProps({
    required: {
        type: Boolean,
        default: false,
    }
})
</script>