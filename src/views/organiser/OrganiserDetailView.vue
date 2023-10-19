<script setup lang="ts">
import { type Organiser } from '@/type'
import type { PropType } from 'vue'

defineProps({
  organiser: {
    type: Object as PropType<Organiser>,
    require: true
  }
})
</script>
<template>
  <div v-if="organiser">
    <p>{{ organiser.name }}</p>
    <p>{{ organiser.address }}</p>
    <div class=" flex flex-row flex-wrap justify-center">
      <img 
        v-for="image in organiser.images"
        :key="image"
        :src="image"
        alt="organizer image"
        class=" border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg"
      />
    </div>
  </div>
</template>
