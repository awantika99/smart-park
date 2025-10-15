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
const PROTECT_BY_DEFAULT = true

export default defineNuxtPlugin(async (nuxtApp) => {
  // Skip plugin when rendering error page
  if (nuxtApp.payload.error) {
    return {}
  }

  const user: CookieRef<UserData | null> = useStatefulCookie('auth')
  const storedToken = localStorage.getItem('authToken')
  if (storedToken) {
    user.value = {
      Token: storedToken,
      User: JSON.parse(localStorage.getItem('authUser') || '{}')
    }
  }
  const loggedIn: ComputedRef<boolean> = computed(() => !!useStatefulCookie('auth').value?.User?.Id)

  // Create a ref to know where to redirect the user when logged in
  // if this is set to login route, it might create infinite redirect?
  const redirectTo: Ref<string | undefined> = useStatefulCookie('authRedirect')

  /**
   * Toggle route protection using:
   *
   * definePageMeta({
   *  auth: boolean
   * })
   */
  //

  const setUser = (userData: UserData) => {
    user.value = userData
  }

  const logIn = (userData: UserData) => {

    setUser(userData)
    handleRedirect()
  }

  const logOut = async () => {
    user.value = null
    await navigateTo(POST_LOGOUT_ROUTE)
  }

  watch(user, (newUser) => {
    if (newUser) {
      console.log('newuser',newUser)
      localStorage.setItem('authToken', newUser.Token)
      localStorage.setItem('authUser', JSON.stringify(newUser.User))
    } else {
      localStorage.removeItem('authToken')
      localStorage.removeItem('authUser')
    }
  })
  const clearRedirect = () => {
    if (user.value) {
      // user.value.redirect_url = undefined
    }
    //redirectTo.value = undefined
  }

  async function handleRedirect(redirect?: string) {
    if (typeof redirect === 'undefined') {
      redirect = redirectTo.value || getRedirectUrl()
    }
    if (redirect) {
      clearRedirect()
      if (redirect.startsWith('http')) {
        await navigateTo(POST_LOGIN_ROUTE)
      } else {
        await navigateTo(redirect)
      }
    } else {
      await navigateTo(POST_LOGIN_ROUTE)
    }
  }

  function getRedirectUrl() {
    const route = useRoute()
    return (route.query.return_url as string) || user.value?.redirect_url
  }

  addRouteMiddleware(
    'auth',
    async (to) => {
      console.log('meta', to)
      if (
        (to.meta.auth || (PROTECT_BY_DEFAULT && to.meta.auth !== false)) &&
        !loggedIn.value && to.fullPath !== LOGIN_ROUTE
      ) {
        console.log('logout')
        //redirectTo.value = to.path
        console.log('login',LOGIN_ROUTE)
        return LOGIN_ROUTE
      }
      if(loggedIn.value && ['login','forgetpassword'].includes(to.name)){
        return '/payout'
      }
    },
    { global: true }
  )

  const currentRoute = useRoute()

  if (process.client) {
    watch(loggedIn, async (loggedIn) => {
      if (!loggedIn && currentRoute.meta.auth) {
        redirectTo.value = currentRoute.path
        await navigateTo(LOGIN_ROUTE)
      }
    })
  }

  if (loggedIn.value && currentRoute.path === LOGIN_ROUTE) {
    await navigateTo(redirectTo.value || '/')
  }

  return {
    provide: {
      auth: {
        user: user,
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
