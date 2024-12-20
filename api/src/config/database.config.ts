export const config = {
  HOST: '127.0.0.1',
  USER: 'root',
  PASSWORD: '',
  DB: 'orders',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

export const dialect = 'mysql';