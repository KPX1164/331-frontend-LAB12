<script setup lang="ts">
import type { Organiser } from '@/type'
import type { PropType } from 'vue'
const props = defineProps({
  organiser: {
    type: Object as PropType<Organiser>,
    require: false
  }
})
</script>

<template>
  <RouterLink class="event-link" :to="{ name: 'organiser-detail', params: { id: organiser?.id } }">
    <div class="event-class">
      <div class="event-card">
        <span>At {{ organiser?.address }}</span>
        <h4>By {{ organiser?.name }}</h4>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.event-link {
  color: #2c3e50;
  text-decoration: none;
}
</style>
