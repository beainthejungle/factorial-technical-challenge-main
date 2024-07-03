<template>
  <div class="metric-visualization-chart">
    <header class="metric-visualization-chart__header">
      <h3>{{ title }}</h3>
      <slot name="header-extra" />
    </header>
    <app-chart :options="chartOptions" :height="500" />
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref, computed, type ComputedRef, onBeforeMount, watch } from 'vue'
import AppChart from '@/components/AppChart'
import type { Granularity, MetricType, Metric } from '@/features/metrics'
import type { EChartsCoreOption } from 'echarts/core'

const props = defineProps({
  granularity: { type: String as () => Granularity, required: true },
  title: { type: String, default: '' },
  data: { type: Object as () => Record<MetricType, Metric[]>, default: () => ({}) }
})

const chartOptions: ComputedRef<Partial<EChartsCoreOption>> = computed(() => {
  const revenueSeries = props.data.revenue.map(metric => ([metric.day, metric.averageValue]))
  const costSeries = props.data.cost.map(metric => ([metric.day, metric.averageValue]))

  return {
    grid: {
      containLabel: true,
      left: '2%',
      right: '5%'
    },
    xAxis: {
      type: 'time',
      name: 'Date',
      axisLabel: {
        formatter: '{d} {MMM} {yyyy} \n {HH}:{mm}'
      }
    },
    yAxis: {
      type: 'value',
      name: 'Amount (€)'
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    series: [
      {
        name: 'Revenue',
        type: 'line',
        data: revenueSeries
      },
      {
        name: 'Cost',
        type: 'line',
        data: costSeries
      }
    ]
  }
})
</script>

<style src="./MetricVisualizationChart.scss"></style>
