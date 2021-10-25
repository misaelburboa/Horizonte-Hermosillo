const dbConfig = {
  synchronize: false,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'root',
      database: 'horizontehermosillo',
      entities: ['**/*.entity.js'],
      subscribers: ['**/*.subscriber.js'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'root',
      database: 'test-horizontehermosillo',
      entities: ['**/*.entity.js'],
      subscribers: ['**/*.subscriber.js'],
      migrationsRun: true,
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      migrationsRun: true,
      entities: ['**/*.entity.js'],
      subscribers: ['**/*.subscriber.js'],
      ssl: {
        rejectUnauthorized: false,
      },
    });
    break;
  default:
    throw new Error('Unknown environment');
}

module.exports = dbConfig;
