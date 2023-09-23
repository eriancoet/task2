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


// Function to sync contacts from HubSpot to Pipedrive
async function syncHubSpotToPipedrive() {
  try {
    const hubSpotContacts = await getHubSpotContacts();

    if (!Array.isArray(hubSpotContacts)) {
      console.error('HubSpot contacts response is not an array:', hubSpotContacts);
      return; // Exit the function or handle the error as needed
    }

    for (const contact of hubSpotContacts) {
      // Check if required properties are defined before accessing them
      if (
        contact.properties &&
        contact.properties.first_name &&
        contact.properties.last_name &&
        contact.properties.email &&
        contact.properties.phone
      ) {
        // Customize the contact mapping according to your needs
        const pipedriveContact = {
          firstname: contact.properties.first_name.value,
          lastname: contact.properties.last-name.value,
          email: contact.properties.email.value,
          phone: contact.properties.phone.value,
        };
// Function to create or update a contact in Pipedrive
async function createOrUpdatePipedriveContact(contact) {
  // ... (your existing code for this function)
}
// Inside the for loop in syncHubSpotToPipedrive function
if (
  contact.properties &&
  contact.properties.first_name &&
  contact.properties.last_name &&
  contact.properties.email &&
  contact.properties.phone
) {
  // Continue with syncing
} else {
  console.error('Contact data is incomplete or missing:', contact);
  continue; // Skip this contact and continue with the next one
}
        await createOrUpdatePipedriveContact(pipedriveContact);
        console.log('Contact synced from HubSpot to Pipedrive:', contact.properties.first_name.value, contact.properties.last_name.value);
      } else {
        console.error('Contact data is incomplete or missing:', contact);
      }
    }

    console.log('HubSpot to Pipedrive sync completed.');
  } catch (error) {
    console.error('Error during HubSpot to Pipedrive sync:', error.message);
  }
}

// Function to start the synchronization
async function startSync() {
  await syncHubSpotToPipedrive();
}

// Call the function to start the synchronization
startSync();

