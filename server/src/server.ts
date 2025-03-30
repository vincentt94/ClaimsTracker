import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import path from 'node:path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';

import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';
import { authenticateToken } from './utils/auth.js'; // this should handle context injection

// Setup __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.join(__dirname, '../.env') });
console.log('JWT_SECRET_KEY loaded:', process.env.JWT_SECRET_KEY);

// App + Port
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for file uploads in GraphQL (optional for claims, can remove if not needed)
app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }));

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start Apollo and DB
const startApolloServer = async () => {
  await server.start();
  await db();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Production static serving
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
  }

  // Apollo middleware with JWT context
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: authenticateToken, // your custom context function
    })
  );

  app.listen(PORT, () => {
    console.log(` Server ready at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
