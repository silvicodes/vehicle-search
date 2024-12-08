import axios from 'axios';

const apiUrl = 'https://m6zhmj6dggvrmepfanilteq4q40rlalu.lambda-url.eu-west-1.on.aws/vehicles';

export async function fetchVehicles(page = 1, resultsPerPage = 8, advertClassification = 'All') {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        page,
        results_per_page: resultsPerPage,
        advert_classification: advertClassification,
      },
    });
    
    if (response.data && response.data.data) {
      return response.data;
    } else {
      throw new Error('Invalid response structure');
    }
    
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return null;
  }
}
