import * as mssql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

async function initializeDatabase() {
    let pool: mssql.ConnectionPool | null = null;
    try {
        // First connect to master database
        const masterConfig = {
            server: 'localhost\\SQL_EXPRESS_2022',
            database: 'master',
            user: 'sa',
            password: 'freebsd',
            options: {
                trustServerCertificate: true,
                encrypt: true
            }
        };
        
        console.log('Attempting to connect to SQL Server master database...');
        pool = await mssql.connect(masterConfig);
        console.log('Connected to SQL Server master database successfully');

        const dbName = 'ServiceBridgeDB';

        // Check if database exists
        console.log('Checking if database exists...');
        const result = await pool.request()
            .input('dbName', mssql.VarChar, dbName)
            .query`
                SELECT name 
                FROM sys.databases 
                WHERE name = @dbName
            `;

        if (result.recordset.length === 0) {
            // Create database if it doesn't exist
            console.log(`Creating database ${dbName}...`);
            await pool.request()
                .query`
                    CREATE DATABASE [${dbName}]
                `;
            console.log(`Database ${dbName} created successfully`);
        } else {
            console.log(`Database ${dbName} already exists`);
        }

        // Close master connection
        await pool.close();

        // Connect to ServiceBridgeDB
        const dbConfig = {
            server: 'localhost\\SQL_EXPRESS_2022',
            database: dbName,
            user: 'sa',
            password: 'freebsd',
            options: {
                trustServerCertificate: true,
                encrypt: true
            }
        };

        console.log(`Connecting to ${dbName}...`);
        pool = await mssql.connect(dbConfig);
        console.log(`Connected to ${dbName} successfully`);

        // Test the connection with a simple query
        const testResult = await pool.request().query('SELECT @@VERSION as version');
        console.log('SQL Server version:', testResult.recordset[0].version);

    } catch (err) {
        console.error('Error initializing database:', err);
        console.error('Error details:', err instanceof Error ? err.message : 'Unknown error');
        throw err;
    } finally {
        if (pool) {
            await pool.close();
            console.log('Database connection closed');
        }
    }
}

initializeDatabase().catch(console.error); 