const axios = require('axios');

// Pipedrive API credentials
const pipedriveApiKey = 'process.env.PIPEDRIVE_API_TOKE';
const pipedriveApiUrl = 'https://Rian-Sandbox.pipedrive.com/v1';

// HubSpot API credentials
const hubspotApiKey = 'process.env.HUBSPOT_API_KEY';
const hubspotApiUrl = 'https://api.hubapi.com/v1';

const axiosConfig = {
  headers: {
    'Authorization': `Bearer ${pipedriveApiKey}`, // Pipedrive API token
  },
};

const hubspotConfig = {
  headers: {
    'Authorization': `Bearer ${hubspotApiKey}`, // HubSpot API token
  },
};

// Function to get contacts from Pipedrive
async function getPipedriveContacts() {
  try {
    const response = await axios.get(`${pipedriveApiUrl}/persons`, {
      params: {
        api_token: pipedriveApiKey,
      },
    });

    console.log(response); // Log the response here
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
            {
              property: 'Company',
              value: pipedriveContact.org_id.name,
            },
            {
              property: 'email',
              value: pipedriveContact.primary_email,
            },
            {
              property: 'phone',
              value: pipedriveContact.phone.value,
            },
            {
              property: 'added',
              value: pipedriveContact.add_time,
            },
            {
              property: 'deals',
              value: pipedriveContact.closed_deals_count,
            },
            {
              property: 'companyID',
              value: pipedriveContact.company_id,
            },
            {
              property: 'address',
              value: pipedriveContact.org_id.address,
            },
            {
              property: 'followers',
              value: pipedriveContact.followers_count,
            }
           
            
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
