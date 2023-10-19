<script setup lang="ts">
import type { Organiser } from '@/type'
import type { PropType } from 'vue'

const props = defineProps({
  organiser: {
    type: Object as PropType<Organiser>,
    require: true
  }
})
</script>

<template>
  <p>Edit the organiser here</p>
</template>
