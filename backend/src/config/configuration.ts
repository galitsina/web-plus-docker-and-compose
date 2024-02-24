export default () => ({
  database: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER || 'student',
    password: process.env.POSTGRES_USER || 'student',
    database: process.env.POSTGRES_DB || 'kupipodariday',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    ttl: process.env.JWT_TTL || '3600s',
  },
});
