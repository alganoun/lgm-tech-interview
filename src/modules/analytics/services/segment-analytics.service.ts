import { AnalyticsData, IAnalytics } from '../types/analytics-data.type';

export class SegmentAnalyticsService implements IAnalytics {
  analytics: Array<AnalyticsData>;

  constructor() {
    this.analytics = [];
  }

  async track(data: AnalyticsData) {
    this.analytics.push(data);
  }
}
