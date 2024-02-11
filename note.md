const { Client } = require('pg');
// const app`

const client = new Client({
    user: 'hussain',
    host: 'localhost',
    database: 'test',
    password: 'password',
    port: 5432,
});

client.connect();



/**
 * create querry
 * 
 * const query = `
    CREATE TABLE users (
        email varchar,
        firstName varchar,
        lastName varchar,
        age int
    );
`;



client
    .query(query)
    .then(res => {
        console.log('Table is successfully created');
    })
    .catch(err => {
        console.error(err);
    })
    .finally(() => {
        client.end();
    });

 */

/** 
 * Insert querry
    const query = `
    INSERT INTO users (email, firstName, lastName, age)
    VALUES ('johndoe@gmail.com', 'john', 'doe', 21)
    `;

    client.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data insert successful');
        client.end();
    });

    */

################################################################################################################################################
//working script to send json files to databases by creating tables = json_file
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const client = new Client({
    user: 'hussain',
    host: 'localhost',
    database: 'test',
    password: 'password',
    port: 5432,
});

async function main() {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL');

        // Directory where JSON files are located
        const jsonFilesDirectory = '/home/hussain/CodeBase/ps-sql/json_files';

        // Function to create a table based on JSON file
        async function createTableFromJsonFile(tableName, filePath) {
            try {
                // Check if the file exists
                if (!fs.existsSync(filePath)) {
                    throw new Error(`File not found - ${filePath}`);
                }

                // Read the JSON file content
                const jsonData = fs.readFileSync(filePath);
                const data = JSON.parse(jsonData);

                // Create the table creation query
                const createTableQuery = `
                    CREATE TABLE IF NOT EXISTS ${tableName} (
                        ${Object.keys(data).map(columnName => `${columnName} varchar`).join(',\n')}
                    );
                `;

                // Execute the table creation query
                await client.query(createTableQuery);
                console.log(`Table created successfully for ${tableName}`);

                // Create the INSERT query
                const insertQuery = `
                    INSERT INTO ${tableName} (${Object.keys(data).join(', ')})
                    VALUES (${Object.values(data).map(value => `'${value}'`).join(', ')});
                `;

                // Execute the INSERT query
                await client.query(insertQuery);
                console.log(`Data insert successful for ${tableName}`);
            } catch (err) {
                console.error(`Error processing file ${filePath}:`, err.message);
                console.error('PostgreSQL error details:', err);

                // Close the database connection in case of an error
                await client.end();
            }
        }

        // Iterate through each JSON file and create table and insert data
        const jsonFiles = fs.readdirSync(jsonFilesDirectory);
        for (const fileName of jsonFiles) {
            const filePath = path.join(jsonFilesDirectory, fileName);
            const tableName = path.parse(fileName).name; // Use the file name as the table name
            await createTableFromJsonFile(tableName, filePath);
        }

        // Close the database connection after all operations
        await client.end();
    } catch (err) {
        console.error('Error connecting to PostgreSQL:', err.message);
        await client.end();
    }
}

// Run the main function
main();



#########################################################################################################################################
u = usename d = databse 
## start psql
> sudo -i -u hussain 
> psql -d test -U hussain 

## to list all your tables
test=# \dt

## to see inside your table (replace my_table with your table name)    
test=# \d+ my_table

## to see table in excel format (replace my_table with your table name)
SELECT * from my_table;

# check what's running on 5432
    $ lsof -i tcp:5432

# kill process on port 5432
    $ kill -9 <pid>