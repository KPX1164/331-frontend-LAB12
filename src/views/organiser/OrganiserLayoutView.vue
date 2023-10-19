<script setup lang="ts">
import { useOrganiserStore } from '@/stores/organiser'
import { storeToRefs } from 'pinia'
const store = useOrganiserStore()
const organiser = storeToRefs(store).orgganiser
</script>
<template>
  <div v-if="organiser">
    <h1>{{ organiser.name }}</h1>
    <div id="nav">
      <RouterLink :to="{ name: 'organiser-detail' }">Details</RouterLink>
      |
      <RouterLink :to="{ name: 'organiser-register' }">Register</RouterLink>
      |
      <RouterLink :to="{ name: 'organiser-edit' }">Edit</RouterLink>
    </div>

    <RouterView :organiser="organiser"></RouterView>
  </div>
</template>
