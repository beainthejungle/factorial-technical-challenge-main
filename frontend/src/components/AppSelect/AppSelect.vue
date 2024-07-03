<template>
  <div class="app-select">
    <label class="app-select__label" :for="id">{{ label }}</label>
    <select class="app-select__select" v-model="localModelValue" :id="id">
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref, watch } from 'vue'
import type { Option } from './typings'

const props = defineProps({
  modelValue: { type: String, default: '' },
  options: { type: Array as () => Option[], default: () => [] },
  label: { type: String, default: '' },
  id: { type: String, default: '' }
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const localModelValue: Ref<string> = ref(props.modelValue)

watch(localModelValue, (newValue: string) => {
  emit('update:modelValue', newValue)
})
</script>

<style src="./AppSelect.scss"></style>