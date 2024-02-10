const axios = require('axios');
const fs = require('fs');
const path = require('path');

const jsonFilesDirectory = '/home/hussain/CodeBase/ps-sql/json_files';
const endpointUrl = 'http://localhost:9001/process-json';

// Function to read and send data from a JSON file
async function sendDataFromJsonFile(fileName) {
    try {
        const filePath = path.join(jsonFilesDirectory, fileName);
        const jsonData = JSON.parse(fs.readFileSync(filePath));

        // Create and connect the PostgreSQL client
        const client = new (require('pg').Client)({
            user: 'hussain',
            host: 'localhost',
            database: 'test',
            password: 'password',
            port: 5432,
        });

        await client.connect();

        const response = await axios.post(endpointUrl, {
            tableName: path.parse(fileName).name,
            jsonData: jsonData
        });

        console.log(`Response for ${fileName}:`);
        console.log(`Request Payload:`, {
            tableName: path.parse(fileName).name,
            jsonData: jsonData
});
// console.log(`Response Message:`, response.data.message);
// console.log(`Response Details:`, response);
console.log('\nData processed successfully!');

        // Disconnect the client after the request is completed
        await client.end();
    } catch (error) {
        console.error(`Error sending data for ${fileName}:`, error.message);
    }
}

// Iterate through each JSON file and send data to the endpoint
fs.readdirSync(jsonFilesDirectory).forEach(fileName => {
    sendDataFromJsonFile(fileName);
});
