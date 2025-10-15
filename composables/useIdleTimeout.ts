import { ref, onMounted, onUnmounted } from 'vue'

export default function useIdleTimeout(timeoutDuration, onTimeout) {
  const timeoutRef = ref(null)
  const hasInactiveLimitExist = ref(false)
  function resetTimeout() {
    if(!hasInactiveLimitExist.value){
      clearTimeout(timeoutRef.value)
      timeoutRef.value = setTimeout(onTimeout, timeoutDuration)
    }
  }
  function setInactiveLimit(value:boolean){
    hasInactiveLimitExist.value = value
  }
  function startTimeout() {
    resetTimeout()
    document.addEventListener('mousemove', resetTimeout)
    document.addEventListener('keypress', resetTimeout)
  }
  function extendTimeout(){
    hasInactiveLimitExist.value = false;
    startTimeout()
  }

  function stopTimeout() {
    clearTimeout(timeoutRef.value)
    document.removeEventListener('mousemove', resetTimeout)
    document.removeEventListener('keypress', resetTimeout)
  }
 
  onMounted(() => {
    console.log('start timeout')
    startTimeout()
  })

  onUnmounted(() => {
    stopTimeout()
  })

  return {
    startTimeout,
    stopTimeout,
    extendTimeout,
    setInactiveLimit
  }
}
