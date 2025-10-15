<template>
    <FormUserprofile :editing-id="id" ></FormUserprofile>
</template>
<script setup lang="ts">
const { id } = useRoute().params
</script>