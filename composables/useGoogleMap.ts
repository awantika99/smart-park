// composables/useGoogleMap.ts
import { ref, onMounted } from 'vue'

export const useGoogleMap = () => {
  const map = ref<google.maps.Map | null>(null)
  const marker = ref<google.maps.Marker | null>(null)
  const placeId = ref<string | null>(null)
  const placeDetails = ref<any>(null)

  const initMap = (mapEl: HTMLElement, options?: google.maps.MapOptions) => {
    if (!window.google || !window.google.maps) {
      console.error('Google Maps API not loaded')
      return
    }
    map.value = new google.maps.Map(mapEl, {
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 13,
      ...options
    })
  }

  const addMarker = (position: google.maps.LatLngLiteral, title?: string) => {
    if (!map.value) return
    if (marker.value) marker.value.setMap(null)
    marker.value = new google.maps.Marker({
      position,
      map: map.value,
      title
    })
    map.value.panTo(position)
  }

  const initAutocomplete = (inputEl: HTMLInputElement) => {
    const autocomplete = new google.maps.places.Autocomplete(inputEl, {
      fields: ['place_id', 'geometry', 'name', 'formatted_address']
    })

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (!place.geometry) return
      placeId.value = place.place_id || null
      placeDetails.value = place
      const location = {
        lat: place.geometry.location?.lat(),
        lng: place.geometry.location?.lng()
      }
      addMarker(location, place.name)
    })
  }

  return { map, marker, placeId, placeDetails, initMap, addMarker, initAutocomplete }
}
