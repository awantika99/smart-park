
import * as pkg from 'vue-toastification'
import { withoutTrailingSlash, joinURL } from 'ufo'

const { useToast } = pkg
const toast = useToast()
export const useApi = async (
  url: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    body?: Record<string, any>
    headers?: Record<string, any>
  } = {
      method: 'GET',
    },
  isThirdPartyURl: boolean = false
) => {
  try {
    const config = useRuntimeConfig()
    const { $auth } = useNuxtApp()

    options = {
      ...options,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Authorization': `Bearer ${$auth?.user.value?.Token}`
      }
    }
    console.log('options',options)
    let response: any = ''
    if (isThirdPartyURl) {
      response = await $fetch(url, options)
      return response
    }
    if (url.endsWith('/')) {
      url = withoutTrailingSlash(url)
    }
    response=  await $fetch(`${config.public.API_BASE_URL}${url}`, options)
    //response = await $fetch(withoutTrailingSlash(joinURL(config.public.API_BASE_URL, url)), options)
    return response
    } catch (error: any) {
    const toast = useToast()

    if (error.response.status == 400) {
      let message = error.response._data.detail
      message = Array.isArray(message) ? message[0]?.msg || message[0] : message
      if (message) {
        toast.error(message, {
          timeout: 2000,
        })
      }
      return false
    }
    if (error.response.status == 422) {
      throw error
    }
    else {
      console.log('error',error)
      let message = error.response._data.detail
      console.log('message', message)
      message = Array.isArray(message) ? message[0]?.msg || message[0] : message
      if (message) {
        toast.error(message, {
          timeout: 2000,
        })
      }
      return false;
    }
  }
}
