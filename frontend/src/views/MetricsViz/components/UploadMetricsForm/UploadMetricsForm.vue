<template>
  <div class="upload-metrics-form">
    <h2>Add metric</h2>
    <div class="upload-metrics-form__form">
      <app-select v-model="form.name" :options="metricOptions" label="Metric Type" class="upload-metrics-form__item" />
      <app-input type="number" label="Metric Value" v-model="form.value" class="upload-metrics-form__item" />
    </div>
    <app-button :disabled="!isValid" @click="handleSubmitClick" class="upload-metrics-form__submit">Add metric for the next interval</app-button>
  </div>
</template>

<script lang="ts" setup>
import { computed, type ComputedRef, ref, type Ref } from 'vue'
import AppButton from '@/components/AppButton'
import AppInput from '@/components/AppInput'
import AppSelect, { type Option } from '@/components/AppSelect'
import { type MetricFormBody, AVAILABLE_METRICS } from '@/features/metrics'

const emit = defineEmits<{
  'upload:metric': [value: MetricFormBody],
}>()

const form: Ref<MetricFormBody> = ref({
  name: 'revenue',
  value: 0
})

const isValid: ComputedRef<boolean> = computed(() => {
  return !!form.value.name
})

const metricOptions: ComputedRef<Option[]> = computed(() => {
  return AVAILABLE_METRICS.map(metric => ({ value: metric, label: metric.toUpperCase() }))
})

const handleSubmitClick = () => {
  emit('upload:metric', form.value)
}
</script>

<style src="./UploadMetricsForm.scss"></style>