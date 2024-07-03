import { ref, type Ref } from 'vue'

export default <T>() => {
  const data: Ref<T | undefined> = ref()
  const isLoading = ref(false)
  const isRejected = ref(false)
  const error = ref('')

  const request = (promise: Promise<T>) => {
    return new Promise<T>((resolve, reject) => {
      isLoading.value = true
      error.value = ''
      
      promise
      .then((response) => {
        data.value = response
        resolve(data.value)
      })      
      .catch((e) => {
        isRejected.value = true
        error.value = e.message
        reject(e)
      })
      .finally(() => {
        isLoading.value = false
      })
    })  
  }

  return {
    data,
    isLoading,
    isRejected,
    error,
    request
  }
}