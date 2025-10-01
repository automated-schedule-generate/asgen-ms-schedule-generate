import process from 'node:process';

export default {
  mode: process.env.MODE ?? 'dev',
};
