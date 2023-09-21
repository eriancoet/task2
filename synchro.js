const axios = require('axios');
require('dotenv').config(); // Load environment variables

// Pipedrive API credentials
const pipedriveApiKey = '744cc977d27294cfd65794cffe6a7c7238163209';
const pipedriveApiUrl = 'https://Rian-Sandbox.pipedrive.com/v1';

// HubSpot API credentials
const hubspotApiKey = 'pat-na1-1f542875-eda4-488d-a424-39b792d53aa8';
const hubspotApiUrl = 'https://api.hubapi.com/crm/v3/objects/contacts';

// Axios configurations for headers
const pipedriveConfig = {
  headers: {
    'Authorization': `Bearer ${pipedriveApiKey}`,
  },
};

const hubspotConfig = {
  headers: {
    'Authorization': `Bearer ${hubspotApiKey}`,
  },
};

console.log(hubspotConfig)

// Function to get contacts from HubSpot
async function getHubSpotContacts() {
  try {
    const response = await axios.get(`${hubspotApiUrl}`, {
      params: {
        count: 100, // Adjust the count as needed
      },
      headers: hubspotConfig.headers,
    });

    const hubSpotContacts = response.data.results; // Adjust the property based on the actual response structure

    if (!Array.isArray(hubSpotContacts)) {
      console.error('HubSpot contacts response is not an array:', hubSpotContacts);
      return; // Exit the function or handle the error as needed
    }

    return hubSpotContacts;
  } catch (error) {
    console.error('Error fetching HubSpot contacts:', error.message);
    throw error;
  }
}

// Rest of your code (createOrUpdatePipedriveContact and syncHubSpotToPipedrive functions) remains the same.

// Start the HubSpot to Pipedrive synchronization
syncHubSpotToPipedrive();
