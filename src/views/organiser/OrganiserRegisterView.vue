<script setup lang="ts">
import { type Organiser } from '@/type'
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
const props = defineProps({
  organiser: {
    type: Object as PropType<Organiser>,
    require: true
  }
})
const router = useRouter()
const store = useMessageStore()
function register() {
  store.updateMessage('You are successfully registered for ' + props.organiser?.name)
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({
    name: 'organiser-detail',
    params: {
      id: props.organiser?.id
    }
  })
}
</script>

<template>
  <p>Registration from here</p>
  <button @click="register">Register Me</button>
</template>
