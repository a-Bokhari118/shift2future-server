import express from 'express';
import cors from 'cors';
import { readdirSync } from 'fs';
import mongoose from 'mongoose';
const morgan = require('morgan');
require('dotenv').config();

// Express App
const app = express();

//db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

// apply middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

//port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server is runnig on port ${port}`));
