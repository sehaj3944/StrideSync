export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
  metric?: string;
  metricLabel?: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  highlight: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatarUrl: string;
  impactMetric?: string;
}

export interface InsoleLayer {
  id: string;
  name: string;
  thickness: string;
  description: string;
  color: string;
  specs: string[];
}
