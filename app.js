const axios = require('axios');

// Pipedrive API credentials
const pipedriveApiKey = 'YOUR_PIPEDRIVE_API_KEY';
const pipedriveApiUrl = 'https://api.pipedrive.com/v1';

// HubSpot API credentials
const hubspotApiKey = 'YOUR_HUBSPOT_API_KEY';
const hubspotApiUrl = 'https://api.hubapi.com';

// Function to get contacts from Pipedrive
async function getPipedriveContacts() {
  try {
    const response = await axios.get(`${pipedriveApiUrl}/persons`, {
      params: {
        api_token: pipedriveApiKey,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error fetching Pipedrive contacts:', error.message);
    throw error;
  }
}

// Function to create a contact in HubSpot
async function createHubSpotContact(contact) {
  try {
    const response = await axios.post(
      `${hubspotApiUrl}/contacts/v1/contact`,
      contact,
      {
        params: {
          hapikey: hubspotApiKey,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating HubSpot contact:', error.message);
    throw error;
  }
}

// Main function to migrate contacts
async function migrateContacts() {
  try {
    const pipedriveContacts = await getPipedriveContacts();

    for (const pipedriveContact of pipedriveContacts) {
      // Customize the contact mapping according to your needs
      const hubspotContact = {
        properties: [
          {
            property: 'firstname',
            value: pipedriveContact.first_name,
          },
          {
            property: 'lastname',
            value: pipedriveContact.last_name,
          },
          // Add more properties as needed
        ],
      };

      const hubspotResponse = await createHubSpotContact(hubspotContact);
      console.log('Contact migrated to HubSpot:', hubspotResponse);
    }

    console.log('Migration completed.');
  } catch (error) {
    console.error('Error during migration:', error.message);
  }
}

// Start the migration process
migrateContacts();
