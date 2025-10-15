<template>
    <UModal v-model="isOpen" @close="closeModal()" class="custom-modal"
        :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <UCard class="card-primary">
            <template #header>
                <div class="custom-header">
                    <Icon name="material-symbols:close" @click="closeModal()"
                        class="absolute float-right top-2 right-2 w-19 h-14 pb-5 cursor-pointer" />
                </div>
            </template>
            <slot></slot>
        </UCard>
    </UModal>
</template>
<script setup lang="ts">
const isOpen = ref(false)
const remarks = ref('')
const emit = defineEmits(['close'])
const props = defineProps({
    isOpenModal: {
        type: Boolean,
        default: false,
    },
})
watch(
    () => props.isOpenModal,
    (newData) => {
        isOpen.value = newData

    })
function closeModal() {
    emit('close')
}
</script>
<style scoped>
.custom-modal {
    overflow-y: auto;
}
</style>