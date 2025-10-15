import { useCookie, useState, watch } from '#imports'
import { CookieRef } from '#app'

// https://github.com/nuxt/nuxt/issues/13020

// Expires in a year
const expires = new Date()
expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000)

// Make cookie use state across app
export default function useStatefulCookie<T = Record<string, any>>(
    name: string
): CookieRef<T> {
    const cookie = useCookie<T>(name, { expires })
    const state = useState<T>(name, () => cookie.value)

    watch(
        state,
        () => {
            cookie.value = state.value
        },
        { deep: true }
    )

    return state
}
