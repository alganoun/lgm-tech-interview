export type AnalyticsData = {
  message: string;
  userId: string;
  timestamp: number;
  to: string;
  content?: string;
};

export interface IAnalytics {
  analytics: Array<AnalyticsData>;
  track(data: AnalyticsData): Promise<void>;
}
