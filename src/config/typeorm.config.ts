import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',

      host: process.env.DB_HOST,

      port: Number(process.env.DB_PORT),

      database: process.env.DB_DATABASE,

      username: process.env.DB_USERNAME,

      password: process.env.DB_PASSWORD,

      entities: [__dirname + '/../**/*.entity{.js,.ts}'],

      migrations: [__dirname + '/../migrations/*{.js,.ts}'],

      cli: {
        migrationsDir: __dirname + '/../migrations',
      },

      extra: {
        charset: 'utf8mb4_unicode_ci',
      },

      synchronize: true,

      logging: true,
    };
  },
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',

  host: process.env.DB_HOST_MIGRATION,

  port: Number(process.env.DB_PORT),

  database: process.env.DB_DATABASE,

  username: process.env.DB_USERNAME,

  password: process.env.DB_PASSWORD,

  entities: [__dirname + '/../**/*.entity{.js,.ts}'],

  migrations: [__dirname + '/../migrations/*{.js,.ts}'],

  cli: {
    migrationsDir: __dirname + '/../migrations',
  },

  extra: {
    charset: 'utf8mb4_unicode_ci',
  },

  synchronize: true,

  logging: true,
};
