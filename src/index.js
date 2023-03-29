import express from 'express';
import passport from 'passport';

import {connect} from './config/database.js';

import {passportAuth} from './config/jwt-middleware.js';

import apiRoutes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());
passportAuth(passport);

app.use('/api', apiRoutes);

app.listen(PORT, async () => {
    console.log('Server started on port ' + PORT);
    await connect();
    console.log('MongoDB connected');
});