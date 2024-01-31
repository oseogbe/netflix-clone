export interface Genre {
  id: number
  name: string
}

export interface Movie {
  title: string
  backdrop_path: string
  media_type?: string
  release_date?: string
  first_air_date: string
  genre_ids: number[]
  id: number
  name: string
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  vote_average: number
  vote_count: number
}

export interface Element {
  type:
  | 'Bloopers'
  | 'Featurette'
  | 'Behind the Scenes'
  | 'Clip'
  | 'Trailer'
  | 'Teaser'
}

export interface Price {
  id: string;
  product: string;
  active: boolean;
  currency: string;
  unit_amount: number | null;
  description: string | null;
  type: "one_time" | "recurring";
  interval: "day" | "month" | "week" | "year" | null;
  interval_count: number | null;
  trial_period_days: number | null;
  [propName: string]: any;
}

export interface SubscriptionPlan {
  id: string;
  active: boolean;
  name: string;
  description: string | null;
  role: string | null;
  images: string[];
  prices: Price[];
  metadata: {
    [key: string]: string | number | null;
  };
  [propName: string]: any;
}

export type SubscriptionStatus = "active" | "canceled" | "incomplete" | "incomplete_expired" | "past_due" | "trialing" | "unpaid";

export interface Subscription {
  cancel_at: string | null;
  cancel_at_period_end: boolean;
  canceled_at: string | null;
  created: {
    seconds: number;
    nanoseconds: number;
  };
  current_period_end: string;
  current_period_start: string;
  ended_at: string | null;
  id: string;
  metadata: {
    [name: string]: string;
  };
  prices: Array<{
    product: string;
    price: string;
  }>;
  product: string;
  quantity: number | null;
  role: string | null;
  status: SubscriptionStatus;
  stripe_link: string;
  trial_end: string | null;
  trial_start: string | null;
  uid: string;
  [propName: string]: any;
}