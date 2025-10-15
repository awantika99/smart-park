import Popup from '~/components/Popup.vue'
import { createApp,ref } from 'vue'
const { $auth } = useNuxtApp()

export const useModal = (timer=0) => {
  const confirmAction = (action?: string) => {
    return new Promise((resolve, reject) => {
      var ComponentApp = createApp(Popup, {
        title: 'Confirmation',
        subtitle: `Are you sure you want to ${action}?`,
        timer:timer,
        onOk() {
          resolve('confirmed')
        },
        onCancel() {},
      })
      const wrapper = document.createElement('div')
      ComponentApp.mount(wrapper)
      document.body.appendChild(wrapper)
    })
  }

  const confirmSave = () => {
    return new Promise((resolve, reject) => {
      var ComponentApp = createApp(Popup, {
        title: 'Confirmation',
        subtitle: `You are about to activate this season. All the other season will be deactivated`,
        onOk() {
          resolve('confirmed')
        },
        onCancel() {},
      })
      const wrapper = document.createElement('div')
      ComponentApp.mount(wrapper)
      document.body.appendChild(wrapper)
    })
  
  }


  const confirmLogout = () => {
    return new Promise((resolve, reject) => {
      var ComponentApp = createApp(Popup, {
        title: 'Confirmation',
        subtitle: 'Are you sure you want to Logout?',
        okButtonText: 'Confirm',
        onOk() {
          resolve('confirmed')
        },
        onCancel() {
          reject()
        },
      })
      const wrapper = document.createElement('div')
      ComponentApp.mount(wrapper)
      document.body.appendChild(wrapper)
    })
  }
  const forceLogout = (timer=0) => {
    return new Promise((resolve, reject) => {
      let remainingTime = timer/60000
      const subTitle = ref('')
      const countDown = ref('')
      const updatePopupSubtitle = (time:Number) => { 
        subTitle.value = 'You are about to logged out in '+timer/60000+' minutes due to inactivity. Do You wants to extend?'
        countDown.value = 'Logout ('+time+')';
      }
      updatePopupSubtitle(remainingTime)
        const countdownInterval = setInterval(() => {
          if (remainingTime > 0) {
            --remainingTime;
            updatePopupSubtitle(remainingTime);
          } else {
            clearInterval(countdownInterval);
            reject('Countdown expired');
          }
        }, 60000);
    
      const ComponentApp = createApp(Popup, {
        title: 'Logout',
        subtitle: subTitle.value,
        okButtonTextRef:countDown,
        cancelButtonText:'Extend',
        timer:timer-5000,
        onOk() {
          resolve('confirmed')
        },
        onCancel() {
          reject()
        },
      })

      
      const wrapper = document.createElement('div')
       const appInstance =ComponentApp.mount(wrapper)
      document.body.appendChild(wrapper)
    })
  
  }
  


  return {
    confirmAction,
    confirmLogout,
    forceLogout,
    confirmSave
  }
}
