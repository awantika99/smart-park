// composables/usePlaces.ts
import { ref, onMounted } from 'vue'

export const usePlaces = () => {
  const placeId = ref<string | null>(null)
  const placeDetails = ref<any>(null)

  /**
   * Initialize Google Places Autocomplete on an input element
   * @param inputEl HTMLInputElement
   */
  const initAutocomplete = (inputEl: HTMLInputElement) => {
    return new Promise<void>((resolve, reject) => {
      if (!window.google || !window.google.maps) {
        reject('Google Maps API not loaded')
        return
      }

      const autocomplete = new google.maps.places.Autocomplete(inputEl, {
        fields: ['place_id', 'geometry', 'name', 'formatted_address'],
      })

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        if (place.place_id) {
          placeId.value = place.place_id
          placeDetails.value = place
          localStorage.setItem('last_place_id', place.place_id)
        }
      })

      resolve()
    })
  }

  /**
   * Retrieve place details by Place ID
   * @param id string
   */
  const getPlaceDetails = (id: string) => {
    return new Promise<any>((resolve, reject) => {
      if (!window.google || !window.google.maps) {
        reject('Google Maps API not loaded')
        return
      }

      const service = new google.maps.places.PlacesService(document.createElement('div'))
      service.getDetails(
        {
          placeId: id,
          fields: ['name', 'formatted_address', 'geometry', 'photos'],
        },
        (result, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            placeDetails.value = result
            resolve(result)
          } else {
            reject(status)
          }
        }
      )
    })
  }

  /**
   * Retrieve last stored Place ID from localStorage
   */
  const loadLastPlace = async () => {
    const storedId = localStorage.getItem('last_place_id')
    if (storedId) {
      placeId.value = storedId
      await getPlaceDetails(storedId)
    }
  }

  // auto-load last place on composable mount
  onMounted(() => {
    loadLastPlace()
  })

  return {
    placeId,
    placeDetails,
    initAutocomplete,
    getPlaceDetails,
    loadLastPlace,
  }
}
