import { CookieRef } from '#app'

export interface UserData {
  id: any
  Token: any
  user: any
  redirect_url?: string
}

// type UserData = Record<string, any>

const LOGIN_ROUTE = '/login'
const POST_LOGIN_ROUTE = '/dashboard'
const POST_LOGOUT_ROUTE = '/login'

// 🚫 Disable route protection
const PROTECT_BY_DEFAULT = false

export default defineNuxtPlugin(async (nuxtApp) => {
  // Skip plugin when rendering error page
  if (nuxtApp.payload.error) {
    return {}
  }

  // Fake user cookie (not needed for now)
  const user: CookieRef<UserData | null> = useStatefulCookie('auth')

  // 🔹 Disabled localStorage-based token logic
  // const storedToken = localStorage.getItem('authToken')
  // if (storedToken) {
  //   user.value = {
  //     Token: storedToken,
  //     User: JSON.parse(localStorage.getItem('authUser') || '{}')
  //   }
  // }

  // 🔹 Disable loggedIn computed property
  const loggedIn: ComputedRef<boolean> = computed(() => true) // always logged in ✅

  // 🔹 Skip redirect tracking
  const redirectTo: Ref<string | undefined> = useStatefulCookie('authRedirect')

  const setUser = (userData: UserData) => {
    user.value = userData
  }

  const logIn = (userData: UserData) => {
    // setUser(userData)
    // handleRedirect()
    console.log('Login bypassed — user automatically logged in.')
  }

  const logOut = async () => {
    // user.value = null
    // await navigateTo(POST_LOGOUT_ROUTE)
    console.log('Logout bypassed — no redirect applied.')
  }

  // 🔹 Disable localStorage user sync
  // watch(user, (newUser) => {
  //   if (newUser) {
  //     localStorage.setItem('authToken', newUser.Token)
  //     localStorage.setItem('authUser', JSON.stringify(newUser.User))
  //   } else {
  //     localStorage.removeItem('authToken')
  //     localStorage.removeItem('authUser')
  //   }
  // })

  const clearRedirect = () => {
    // No-op
  }

  async function handleRedirect(redirect?: string) {
    // 🔹 Skip redirect logic
    console.log('Redirect bypassed — direct navigation allowed.')
  }

  function getRedirectUrl() {
    return '/'
  }

  // 🚫 Disable global route auth middleware
  // addRouteMiddleware(
  //   'auth',
  //   async (to) => {
  //     if (
  //       (to.meta.auth || (PROTECT_BY_DEFAULT && to.meta.auth !== false)) &&
  //       !loggedIn.value && to.fullPath !== LOGIN_ROUTE
  //     ) {
  //       return LOGIN_ROUTE
  //     }
  //     if (loggedIn.value && ['login', 'forgetpassword'].includes(to.name)) {
  //       return '/payout'
  //     }
  //   },
  //   { global: true }
  // )

  // Disable loggedIn watcher
  // const currentRoute = useRoute()
  // if (process.client) {
  //   watch(loggedIn, async (loggedIn) => {
  //     if (!loggedIn && currentRoute.meta.auth) {
  //       redirectTo.value = currentRoute.path
  //       await navigateTo(LOGIN_ROUTE)
  //     }
  //   })
  // }

  // Always allow login page access
  // if (loggedIn.value && currentRoute.path === LOGIN_ROUTE) {
  //   await navigateTo(redirectTo.value || '/')
  // }

  return {
    provide: {
      auth: {
        user,
        loggedIn,
        redirectTo,
        setUser,
        logIn,
        logOut,
        clearRedirect,
      },
    },
  }
})
