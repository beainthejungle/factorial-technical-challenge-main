<template>
  <section class="metrics-viz">
    <h1 class="metrics-viz__title">Metrics Visualization</h1>
    <div v-if="hasError" class="metrics-viz__error">Oops! There seems to be an error</div>
    <template v-else>
      <app-loading-cover :loading="isLoading" />
      <template v-if="!isLoading">
        <metric-visualization-chart :granularity="granularity" :title="chartTitle" :data="metricsData">
          <template #header-extra>
            <app-select v-model="granularity" :options="granularityOptions" label="Granularity" />
          </template>
        </metric-visualization-chart>
        <div class="metrics-viz__form">
          <upload-metrics-form @upload:metric="onMetricUploaded" />
        </div>
      </template>
    </template>
  </section>
</template>

<script setup lang="ts">
import { shallowRef, type ShallowRef, ref, type Ref, computed, type ComputedRef, onBeforeMount, watch } from 'vue'
import MetricVisualizationChart from './components/MetricVisualizationChart'
import UploadMetricsForm from './components/UploadMetricsForm'
import AppSelect, { type Option } from '@/components/AppSelect'
import AppLoadingCover from '@/components/AppLoadingCover'
import { postMetric, getAverageMetrics, AVAILABLE_METRICS, type MetricFormBody, type Granularity, type MetricType, Metric } from '@/features/metrics'
import useRequest from '@/composables/useRequest'

const granularityOptions: ShallowRef<Option[]> = shallowRef([
  {
    value: 'minute',
    label: 'Per minute'
  },
  {
    value: 'hour',
    label: 'Hourly'
  }, 
  {
    value: 'day',
    label: 'Daily'
  }
])

const granularity: Ref<Granularity> = ref('hour')

const chartTitle: ComputedRef<string> = computed(() => `Average per ${granularity.value}`)

const metricsData: Ref<Record<MetricType, Metric[]>> = ref({
  revenue: [],
  cost: []
})

// Get metrics
const { request: requestMetrics, isLoading: isMetricsLoading, error: getMetricsError } = useRequest<Metric[]>()

const getAllAverageMetrics = (granularity: Granularity) => {
  AVAILABLE_METRICS.forEach(metric => {
    requestMetrics(getAverageMetrics(metric, granularity)).then(data => {
      metricsData.value[metric] = data
    })
  })
}

onBeforeMount(() => {
  getAllAverageMetrics(granularity.value)
})

watch(granularity, newValue => {
  getAllAverageMetrics(newValue)
})

// Upload metrics
const { request: requestPostMetrics, isLoading: isPostMetricsLoading, error: postMetricsError } = useRequest<void>()

const onMetricUploaded = async (form: MetricFormBody) => {
  await requestPostMetrics(postMetric(form))
  getAllAverageMetrics(granularity.value)
}

// Loading
const isLoading: ComputedRef<boolean> = computed(() => isMetricsLoading.value || isPostMetricsLoading.value)

// Error
const hasError: ComputedRef<boolean> = computed(() => !!getMetricsError.value || !!postMetricsError.value)
</script>

<style src="./MetricsViz.scss"></style>