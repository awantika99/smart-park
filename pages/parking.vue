<template>
  <div class="flex flex-col md:flex-row p-6 gap-6">
    <!-- Search Box -->
    <div class="w-full md:w-1/3">
      <h2 class="text-xl font-bold mb-2">Search Location</h2>
      <input
        ref="searchInput"
        type="text"
        placeholder="Enter parking location"
        class="border p-2 w-full rounded"
      />
      <div v-if="placeDetails" class="mt-4 text-sm text-gray-700">
        <p><strong>Name:</strong> {{ placeDetails.name }}</p>
        <p><strong>Address:</strong> {{ placeDetails.formatted_address }}</p>
        <p><strong>Place ID:</strong> {{ placeId }}</p>
      </div>
    </div>

    <!-- Map Container -->
    <div class="w-full md:w-2/3 h-[500px] border rounded" ref="mapRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGoogleMap } from '~/composables/useGoogleMap'

const mapRef = ref<HTMLElement | null>(null)
const searchInput = ref<HTMLInputElement | null>(null)
const { initMap, initAutocomplete, placeId, placeDetails } = useGoogleMap()

onMounted(() => {
  if (mapRef.value) initMap(mapRef.value)
  if (searchInput.value) initAutocomplete(searchInput.value)
})
</script>
