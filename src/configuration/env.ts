import process from 'node:process';

export default {
  //application
  mode: process.env.MODE ?? 'dev',
  port: process.env.PORT ?? 9000,
  //database
  database: {
    host: process.env.DB_HOST ?? 'localhost',
    port: process.env.DB_PORT ?? 5432,
    user: process.env.DB_USER ?? 'user',
    pass: process.env.DB_PASS ?? 'password',
    name: process.env.DB_NAME ?? 'asgen',
  },
  //api rest external
  apiRestUrl: process.env.API_REST_URL ?? 'localhost:8000',
  // genetic algorithm
  limitExecuted: Number(process.env.LIMIT_EXECUTED ?? 0),
};
