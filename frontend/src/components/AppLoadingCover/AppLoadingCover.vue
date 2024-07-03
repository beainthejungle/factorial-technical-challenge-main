<template>
  <div v-if="loading" class="app-loading-cover">
    <div class="app-loading-cover__spinner" />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  loading: { type: Boolean, default: false }
})
</script>

<style src="./AppLoadingCover.scss"></style>