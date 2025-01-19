import axios from 'axios';

const API_URL = 'https://tracking.bosta.co/shipments/track/';

export const fetchShipmentData = async (trackingNumber) => {
  try {
    const response = await axios.get(`${API_URL}${trackingNumber}`, {
      headers: {
        'x-requested-by': 'Bosta', 
      },
    });
    console.log(`Fetching data for tracking number: ${trackingNumber}`);
    console.log(response.data);

    return response.data;
    
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || 'An error occurred');
    }
    throw new Error('An error occurred while fetching shipment data.');
  }
};
