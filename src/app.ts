import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import errorHandler from './middleware/error_handler';
import exampleRoutes from './routes/example';
import logger from './middleware/logger';
import userRoutes from './routes/user';

const app = express();

// Middleware
app.use(cors()); // Allow CORS
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(logger); // Log incoming requests

// Routes
app.use('/', exampleRoutes);
app.use('/user', userRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
