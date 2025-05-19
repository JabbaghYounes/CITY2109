import axios from 'axios';
import { Earthquake } from '../types/earthquake';

const USGS_API_URL =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

interface USGSResponse {
  features: Earthquake[];
}

export const fetchEarthquakes = async (): Promise<Earthquake[]> => {
  try {
    const response = await axios.get<USGSResponse>(USGS_API_URL);
    return response.data.features;
  } catch (error) {
    console.error('Error fetching earthquake data:', error);
    throw error;
  }
};
