<script setup lang="ts">
const config = useRuntimeConfig();

const { data, pending, error } = useFetch(
  () => `${config.public.apiBase}/Appointments`,
  {
    headers: {
      Authorization: `Bearer ${config.apiSecret}`,
    },
  }
);
</script>

<template>
  <div>
    <p v-if="pending">fetching...</p>
    <pre v-else-if="data">{{ data }}</pre>
    <pre v-else-if="error">{{ error.data }}</pre>
  </div>
</template>
