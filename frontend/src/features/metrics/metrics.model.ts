export const AVAILABLE_METRICS = ['revenue', 'cost'] as const

export type MetricType = typeof AVAILABLE_METRICS[number]

export type Granularity = 'minute' | 'hour' | 'day'

export interface MetricFormBody {
  name: string;
  value: number;
}

export class Metric {
  public readonly day: Date = new Date();
  public readonly averageValue: number = 0;

  constructor (data: Metric) {
    Object.assign(this, data)
  }
}