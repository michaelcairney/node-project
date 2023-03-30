require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');

const mongoString = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});

app.listen(8000, () => {
  console.log('listening on port 8000');
});
