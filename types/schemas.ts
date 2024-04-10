export interface ParkImage {
  credit: string;
  altText: string;
  title: string;
  caption: string;
  url: string;
  id?: number;
}

export interface ParkDetail {
  states: string;
  weatherInfo: string;
  directionsInfo: string;
  addresses: unknown[];
  entranceFees: {
    cost: string;
    description: string;
    title: string;
  }[];
  topics: unknown[];
  name: string;
  latitude: string;
  activities: {
    id: string;
    name: string;
  }[];
  operatingHours: unknown[];
  url: string;
  longitude: string;
  contacts: Record<string, any>;
  entrancePasses: unknown[];
  parkCode: string;
  designation: string;
  images?: ParkImage[];
  fullName: string;
  latLong: string;
  id: string;
  directionsUrl: string;
  description: string;
  visited: boolean;
  fees: unknown[];
  relevanceScore?: number;
}

export interface ParkResponse {
  total: string;
  data: ParkDetail[];
  limit: string;
  start: string;
}
