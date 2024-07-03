<template>
  <div ref="chartEl" :height="height" />
</template>

<script lang="ts" setup>
import { ref, type Ref, watch, shallowRef, onMounted, nextTick, onBeforeUnmount } from 'vue'
import { LineChart } from 'echarts/charts'
import { type ECharts, type EChartsCoreOption, init, use } from 'echarts/core'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

const props = defineProps({
  height: { type: Number, default: 400 },
  options: { type: Object as () => Partial<EChartsCoreOption>, default: () => ({})}
})

use([LineChart, CanvasRenderer, GridComponent, TooltipComponent])

const chartEl: Ref<HTMLElement | null> = ref(null)
const chart: Ref<ECharts | null> = shallowRef(null)

onMounted(() => {
  nextTick(() => {
    chart.value = chartEl.value && init(chartEl.value, null, {
      renderer: 'canvas',
      width: 'auto',
      height: props.height
    })

    chart.value && chart.value.setOption(props.options)
  })

  window.addEventListener('resize', resize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
})

watch(() => props.options, newValue => {
  chart.value && chart.value.setOption(newValue)
}, { deep: true })

/*
* Resize
*/
watch(() => props.height, () => {
  chart.value && chart.value.resize({ height })
})

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const { width } = entry.contentRect
    chart.value && chart.value.resize({ width })
  }
})

const resize = () => {
  chartEl.value && resizeObserver.observe(chartEl.value)
}
</script>