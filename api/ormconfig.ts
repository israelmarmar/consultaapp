/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require('path');
require('dotenv').config({ path: './.env.development' });

const config = {
  name: 'default',
  type: 'postgres',
  host: `${process.env.HOST}`,
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: `${process.env.DATABASE_USER}`,
  password: `${process.env.DATABASE_PASS}`,
  database: `${process.env.DATABASE_DBNAME}`,
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [
    `${__dirname}/dist/**/*.entity.{js,ts}`,
    `${__dirname}/dist/**/**/*.entity.{js,ts}`,
  ],
  migrations: [`${__dirname}/dist/src/database/migrations/*.{js,ts}`],
  cli: {
    migrationsDir: `${__dirname}/src/database/migrations`,
  },
};

module.exports = config;
