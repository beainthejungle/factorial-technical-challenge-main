<template>
  <button class="app-button" :disabled="disabled" @click="emit('click')">
    <slot name="default" />
  </button>
</template>

<script setup lang="ts">
defineProps({
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits<{
  click: []
}>()
</script>

<style src="./AppButton.scss"></style>

