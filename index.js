const express = require('express');
const { Client } = require('pg');

const app = express();
const port = 9001;

app.use(express.json());

async function createTableAndInsertData(tableName, jsonData) {
    const client = new Client({
        user: 'hussain',
        host: 'localhost',
        database: 'test',
        password: 'password',
        port: 5432,
    });

    try {
        await client.connect();

        // Create the table creation query
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS ${tableName} (
                ${Object.keys(jsonData).map(columnName => `${columnName} varchar`).join(',\n')}
            );
        `;

        // Execute the table creation query
        const promiseArr = []
        promiseArr.push(client.query(createTableQuery))

        // Create the INSERT query
        const insertQuery = `
            INSERT INTO ${tableName} (${Object.keys(jsonData).join(', ')})
            VALUES (${Object.values(jsonData).map(value => `'${value}'`).join(', ')});
        `;

        // Execute the INSERT query
        promiseArr.push(client.query(insertQuery))
        await Promise.all(promiseArr)
        console.log(`Table created successfully for ${tableName}`);
        console.log(`Data insert successful for ${tableName}`);
    } catch (err) {
        console.error('Error processing data:', err.message);
        console.error('Error details:', err);
        throw err; // Re-throw the error to be caught in the calling function
    } finally {
        await client.end();
    }
}

app.post('/process-json', async (req, res) => {
    try {
        const { tableName, jsonData } = req.body;

        // Validate input
        if (!tableName || !jsonData) {
            return res.status(400).json({ error: 'Invalid request payload' });
        }

        await createTableAndInsertData(tableName, jsonData);

        res.status(200).json({ message: 'Data processed successfully' });
    } catch (err) {
        console.error('Error processing data:', err.message);
        console.error('Error details:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
