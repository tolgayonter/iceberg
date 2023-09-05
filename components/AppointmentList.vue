<script setup lang="ts">
const { data, pending, error } = useFetch("/api/appointments");
</script>

<template>
  <div>
    <p v-if="pending">fetching...</p>
    <pre v-else-if="data">{{ data }}</pre>
    <pre v-else-if="error">{{ error.data }}</pre>
  </div>
</template>
