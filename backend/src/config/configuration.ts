export default () => ({
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER || 'student',
    password: process.env.DB_PASSWORD || 'student',
    database: process.env.DB_NAME || 'kupipodariday',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    ttl: process.env.JWT_TTL || '3600s',
  },
});
