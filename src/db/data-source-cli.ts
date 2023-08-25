import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import { SeederOptions } from 'typeorm-extension';
// import { MainSedeer } from "./seeds/main-seeder";

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',

  host: process.env.DB_HOST,

  port: Number(process.env.DB_PORT),

  username: process.env.DB_USERNAME,

  password: process.env.DB_PASSWORD,

  database: process.env.DB_DATABASE,

  entities: [__dirname + '/../**/*.entity.{js,ts}'],

  migrations: [__dirname + '/migrations/*.{js,ts}'],

  // subscribers: ["dist/src/subscriber/**/*.entity.js"],

  // migrationsTransactionMode: "each",

  extra: {
    charset: 'utf8mb4_unicode_ci',
  },

  // synchronize: false,

  // seeds: [MainSedeer],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
