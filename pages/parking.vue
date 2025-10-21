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

const mapRef = ref<HTMLElement | null>(null)
const searchInput = ref<HTMLInputElement | null>(null)
const placeId = ref('')
const placeDetails = ref<any>(null)

let map: google.maps.Map | null = null
let autocomplete: google.maps.places.Autocomplete | null = null

/**
 * ✅ Load Google Maps JS dynamically
 * - Reads API key from runtime config
 * - Prevents duplicate loading
 */
const loadGoogleMaps = () =>
  new Promise<void>((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve()
      return
    }

    const config = useRuntimeConfig()
    const apiKey = config.public.GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      console.error('❌ Missing GOOGLE_MAPS_API_KEY in .env or nuxt.config.ts')
      reject('Missing API key')
      return
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = (err) => reject(err)
    document.head.appendChild(script)
  })

/**
 * ✅ Initialize map + autocomplete after script loads
 */
onMounted(async () => {
  try {
    await loadGoogleMaps()

    // Initialize Map
    map = new google.maps.Map(mapRef.value as HTMLElement, {
      center: { lat: 37.7749, lng: -122.4194 }, // Default: San Francisco
      zoom: 13,
    })

    // Initialize Autocomplete
    autocomplete = new google.maps.places.Autocomplete(searchInput.value as HTMLInputElement, {
      fields: ['place_id', 'geometry', 'name', 'formatted_address'],
    })

    // Handle place selection
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete!.getPlace()

      if (!place.geometry || !place.geometry.location) {
        alert('No details found for this location.')
        return
      }

      // Update reactive data
      placeId.value = place.place_id || ''
      placeDetails.value = {
        name: place.name,
        formatted_address: place.formatted_address,
      }

      // Move map and add marker
      map!.setCenter(place.geometry.location)
      new google.maps.Marker({
        map,
        position: place.geometry.location,
      })
    })
  } catch (err) {
    console.error('❌ Google Maps failed to load:', err)
    alert('Something went wrong while loading Google Maps.')
  }
})
</script>
