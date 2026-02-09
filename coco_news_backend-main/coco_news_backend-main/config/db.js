import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();

const { Client } = pkg;

const client = new Client({
  host: process.env.DB_HOST, // ✅ Only hostname here (without `/coconews`)
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME, // ✅ Database name should go here
  port: process.env.DB_PORT || 5432, // Default PostgreSQL port
  ssl: { rejectUnauthorized: false } // ✅ Required for cloud-hosted PostgreSQL
});

await client.connect()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection error:', err));

export default client;
