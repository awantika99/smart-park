<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <FormChangePassword @close-modal="isOpenModal = false" :isOpenModal="isOpenModal"
      :forceChangePassword="forceChangePassword" :editing-id="editingId"></FormChangePassword>
    <nav
      class="flex b justify-between items-center pr-5 bg-white dark:bg-gray-900  dark:border-red-700 bg-red dark:bg-red-900 flex text-red-500 dark:text-red-400  text-sm ">
      <div class=" w-[100px] h-[63px] bg-color-logo">
        <a href="#"> <img src="/images/logo.svg" alt="logo" class="h-full object-center dark:invert" /></a>
      </div>


      <div class="lg:hidden">
        <Icon name="ic:outline-menu" size="24" class="text-gray-600 dark:text-gray-400"
          @click="showSideBar = !showSideBar" />
      </div>
      <div class="flex gap-4 items-center ">
        <button type="button"
          class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 mr-4">
          <span class="absolute -inset-1.5" />
          <span class="sr-only">View notifications</span>
          <!--  <BellIcon class="h-6 w-6" aria-hidden="true" />-->
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
        </button>
        <div
          class="relative btnCon text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover::text-gray-300"
          tabindex="555" @focusout="showSettingsDropDown = false">
          <div @click="showSettingsDropDown = !showSettingsDropDown" data-testid='loggedInuser'
            class="flex items-center gap-2 focus:text-gray-700 cursor-pointer btns" id="loggeduser">
            <div class="">
              <div id="loggedInuser" class="hidden lg:block">{{ loggedInUser?.User.Name }}</div>
              <div class="text-xs	">Admin</div>
            </div>
            <img class="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="" />


          </div>
          <div v-if="showSettingsDropDown"
            class="dashboard absolute flex-col right-0 top-7 text-sm w-48 bg-white dark:bg-gray-900 border border-gray-300 z-10">
            <div class="py-2 text-center bg-gray-600 dark:bg-gray-600 font-bold text-white">Settings</div>
            <NuxtLink @click="handleChangePassword()"
              class="py-2 border-t hover:bg-gray-200 dark:bg-gray-800 cursor-pointer border-gray-300 flex gap-5 px-4">
              <Icon name="carbon:password" size="20" class="text-gray-400" />
              <div data-testid="ChangePassword">Change Password</div>
            </NuxtLink>
            <NuxtLink @click="handleLogout()"
              class="py-2 border-t hover:bg-gray-200 dark:bg-gray-800 cursor-pointer border-gray-300 flex gap-5 px-4">
              <Icon name="material-symbols:lock" size="20" class="text-gray-400 dark:text-gray-600" />
              <div data-testid="logoutPointer">Logout</div>
            </NuxtLink>
          </div>
        </div>


      </div>
    </nav>
    <div class="flex flex-1 overflow-y-auto">
      <aside class="w-[10px] min-w-[100px] left-aside-bar"
        :class="showSideBar ? 'block w-full' : 'hidden lg:block'">

        <div class="aside-main-menu flex">
          <MainMenu></MainMenu>
                <!-- <ul class="main_menu">
                  <li class="">
                    <NuxtLink class="hover:text-red-500 dark:hover:text-blue-500"  href="/payout">
                       
                      <Icon name="material-symbols:attach-money" class="text-inherit max-w-[30px] text-green-600	" size="30px" color="#FF5B5B"/>
                      <span>Payout</span>
                    </NuxtLink>
                    <NuxtLink class="hover:text-red-500 dark:hover:text-blue-500"  href="/payoutcountry/payment">
                      <Icon name="material-symbols:flag" class="text-inherit max-w-[30px]" size="30px" color="#FFBB54" />

                       <img src="/images/icon/home.svg"> 
                      <span>Payout Country</span>
                    </NuxtLink>
                   
                  </li>
                    <li >
                    <a href="#" class="flex">
                    <img src="/images/icon/user.svg">
                      <span>Account Setup</span>
                    </a>
                    <MegaMenu >
                      
                    </MegaMenu>
                  </li> 
                    <li >
                    <a href="#" class="dflex">
                    <img src="/images/icon/settings.svg">
                      <span>Configurations</span>
                    </a>
                  </li>
                  <li >
                      <a href="#" class="flex">
                        <img src="/images/icon/bar-chart-2.svg">
                        <span>Reports</span>
                      </a>
                    </li> 
                  </ul> -->
                </div>
        <!-- <div>
          <div class="text-sm py-1" :class="{
            'bg-gray-200 dark:bg-gray-800': openMenuIndex === i,
            'mb-2': i > 0,
          }" v-for="(item, i) in items" :key="`item-${i}`" @click="openMenuIndex = i">
            <div class="flex justify-between text-white items-center py-2.5 px-5" @click="() => {
              openMenuIndex < 0 ? (openMenuIndex = i) : (openMenuIndex = -1)
            }
              ">
              <div class="flex items-center gap-5 text-gray-700 dark:text-gray-300 font-bold">
              
                <NuxtLink class="hover:text-cyan-500 dark:hover:text-blue-500" v-if="item.menu.link" :to="item.menu.link">
                  {{ item?.menu.name }}</NuxtLink>
                <div v-else>{{ item?.menu?.name }}</div>
              </div>
               
            </div>
            
            <div v-for="(sub_item, index) in item.sub_menu" :key="sub_item.name"
              class="text-gray-700 dark:text-gray-300 py-1 ms-5">
              <NuxtLink :to="sub_item?.link"
                class="flex items-center gap-5 hover:text-cyan-500 dark:hover:text-blue-500 border-r-2 py-1 border-transparent px-5">
                <Icon :name="sub_item?.icon" class="text-inherit max-w-[20px]" size="17px" />
                <div>{{ sub_item?.name }}</div>
              </NuxtLink>
            </div>
          
          </div>
        </div> -->
      </aside>
      <div class="flex-grow bg-gray-50 dark:bg-gray-900 overflow-y-auto" :class="showSideBar ? 'hidden' : ''">
        <div class="px-6 py-6 text-primary">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//import Auth from 'plugins/0.auth'
import useIdleTimeout from '~/composables/useIdleTimeout'
const colorMode = useColorMode()
const { forceLogout } = useModal(0)
colorMode.value = 'light'
colorMode.preference = 'light'
const showSideBar = ref(false)
const route = useRoute()
const isOpenModal = ref(false)
const editingId = ref(0)
const timeoutDuration = 10 * 60 * 1000 //screen inactive time to show popup
const logoutDuration = 5 * 60 * 1000  //logout time after showing popup
const idleTimeout = useIdleTimeout(timeoutDuration, handleIdleTimeout)
function handleIdleTimeout() {
  let logOutRef = setTimeout(() => {
    clearTimeout(logOutRef)
    $auth.logOut()
    location.reload()
    idleTimeout.stopTimeout()
    idleTimeout.setInactiveLimit(false)
  }, logoutDuration)
  idleTimeout.setInactiveLimit(true)
  forceLogout(logoutDuration)
    .then(() => {
      idleTimeout.setInactiveLimit(false)
    })
    .catch(() => {
      clearTimeout(logOutRef)
      idleTimeout.extendTimeout(timeoutDuration)
    })
}

const items = [
  {
    menu: { name: 'Dashboard', icon: 'pajamas:dashboard', icon_color: 'green-500', link: '/dashboard' },
  },
  // {
  //   menu: { name: 'Marketing', icon: 'material-symbols:notifications', icon_color: 'red-500' },
  // },

  // {
  //   menu: { name: 'Agent Management', icon: 'material-symbols:account-circle', icon_color: 'green-500' },
  //   sub_menu: [
  //     {
  //       name: 'Agent',
  //       icon: 'ic:baseline-portrait',
  //       link: '/agent-management/agent',
  //       icon_color: 'red-500',
  //     },
  //     {
  //       name: 'Branch',
  //       icon: 'ic:baseline-portrait',
  //       link: '/agent-management/branch',
  //       icon_color: 'red-500',
  //     },
  //   ],
  // },
  {
    menu: { name: 'User Management', icon: 'material-symbols:account-circle', icon_color: 'green-500' },
    sub_menu: [
      {
        name: 'User Profile',
        icon: 'ic:baseline-portrait',
        link: '/user-management/userprofile',
        icon_color: 'red-500',
      },
      {
        name: 'User Role',
        icon: 'ic:baseline-portrait',
        link: '/user-management/userrole',
        icon_color: 'red-500',
      },


    ],
  },

  {
    menu: { name: 'Customer Management', icon: 'material-symbols:account-circle', icon_color: 'green-500' },
    sub_menu: [
      // {
      //   name: 'Beneficiary Management',
      //   icon: 'ic:baseline-circle',
      //   link: '/customer-management/beneficiary-management',
      //   icon_color: 'red-500',
      // },
      {
        name: 'Customer Registration',
        icon: 'ic:baseline-circle',
        link: '/customer-management/customer-registration',
        icon_color: 'red-500',
      },
      // {
      //   name: 'CustomerB2B Registration',
      //   icon: 'ic:baseline-circle',
      //   link: '/customer-management/customerb2b-registration',
      //   icon_color: 'red-500',
      // },
      // {
      //   name: 'Customer Profile',
      //   icon: 'ic:baseline-circle',
      //   link: '/customer-management/customer-profile',
      //   icon_color: 'red-500',
      // },
      // {
      //   name: 'Registration Checker',
      //   icon: 'ic:baseline-circle',
      //   link: '/customer-management/registration-checker',
      //   icon_color: 'red-500',
      // },
      // {
      //   name: 'Registration Maker',
      //   icon: 'ic:baseline-circle',
      //   link: '/customer-management/registration-maker',
      //   icon_color: 'red-500',
      // },

    ],
  },




]

const openMenuIndex = ref(-1)
const showSettingsDropDown = ref(false)

const { $auth } = useNuxtApp()

const loggedInUser: any = ref($auth.user.value)
console.log('loggedInUser', loggedInUser.value)
const handleChangePassword = () => {
  // editingId.value = 0
  isOpenModal.value = true
  // modal.confirmLogout().then(() => {
  //   console.log('confirm logout')
  // })
}
if (loggedInUser.value?.User?.ForcePasswordReset) {
  nextTick(() => {
    isOpenModal.value = true
  })

}
console.log('auth')
watch(route, () => {
  showSideBar.value = false
})
const forceChangePassword = computed(() => {
  return loggedInUser.value?.User?.ForcePasswordReset;
})
console.log('forceChangePassword', forceChangePassword.value)
const handleLogout = () => {
  console.log('logout')
  const modal = useModal()
  modal.confirmLogout().then(() => {
    $auth.logOut()
  })
  //$auth.logOut()
}




</script>

<style scoped lang="scss">.router-link-active {
  @apply text-cyan-500 border-cyan-500 dark:text-blue-500 dark:border-blue-500;
}</style>
