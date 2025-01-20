import axios from 'axios';

const API_URL = 'https://tracking.bosta.co/shipments/track/';

export const fetchShipmentData = async (trackingNumber) => {
  try {
    const response = await axios.get(`${API_URL}${trackingNumber}`, {
      headers: { 'x-requested-by': 'Bosta' },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'An error occurred');
  }
};

export const transformTrackingDetails = (data) => {
  if (!data.TransitEvents) return [];
  return data.TransitEvents.map((event) => ({
    date: event.timestamp,
    event: event.state,
    location: event.hub || null,
    reason: event.reason || null,
  }));
};
