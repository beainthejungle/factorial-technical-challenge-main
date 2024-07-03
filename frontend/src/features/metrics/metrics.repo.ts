import axiosInstance from '@/infra/axios'
import { type MetricType, type MetricFormBody, type Granularity, Metric } from './metrics.model'

interface AverageMetricsResponse {
  day: Date;
  avg_value: number;
}

export const getAverageMetrics = async (metricType: MetricType, granularity: Granularity): Promise<Metric[]> => {
  const response: AverageMetricsResponse[] = (await axiosInstance.get(`/metrics/${metricType}`, {
    params: {
      granularity
    }
  })).data

  return response.map(data => new Metric({ day: data.day, averageValue: data.avg_value }))
}

export const postMetric = async (body: MetricFormBody): Promise<void> => {
  const { name, value } = body
  await axiosInstance.post('/metrics', {
    name,
    value
  })
}