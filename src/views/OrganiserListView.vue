<script setup lang="ts">
import OrganiserCard from '../components/OrganiserCard.vue'
import type { Organiser } from '@/type'
import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import type { AxiosResponse } from 'axios'
// import axios from 'axios'
import OrganiserService from '@/services/OrganiserService'
import NProgress from 'nprogress'
import { useRouter } from 'vue-router'
const organisers: Ref<Organiser[]> = ref([])
const totalOrganiser = ref<number>(0)
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})
const router = useRouter()

OrganiserService.getOrganisers(3, props.page)
  .then((response: AxiosResponse<Organiser[]>) => {
    organisers.value = response.data
    totalOrganiser.value = response.headers['x-total-count']
  })
  .catch(() => {
    router.push({ name: 'network-error' })
  })

onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  OrganiserService.getOrganisers(3, toPage)
    .then((response: AxiosResponse<Organiser[]>) => {
      organisers.value = response.data
      totalOrganiser.value = response.headers['x-total-count']
      next()
    })
    .catch(() => {
      next({ name: 'NetworkError' })
    })
})
const hasNextPage = computed(() => {
  // first calculate the total page
  const totalPages = Math.ceil(totalOrganiser.value / 2)
  return props.page.valueOf() < totalPages
})
</script>

<template>
  <h1>Organiser For Good</h1>
  <main class="flex flex-col items-center">
    <OrganiserCard v-for="organiser in organisers" :key="organiser.id" :organiser="organiser"></OrganiserCard>

    <div class="pagination">
      <RouterLink
        :to="{ name: 'organiser-list', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        id="page-prev"
      >
        Prev Page
      </RouterLink>

      <RouterLink
        :to="{ name: 'organiser-list', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        id="page-next"
      >
        Next Page
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>


.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
