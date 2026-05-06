import http from 'http';
import express from 'express';
import morgan from 'morgan';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { notFoundHandler } from '#middlewares/not-found-handler.js';

export const initializeApp = async () => {
    const app = express();
    const httpServer = http.createServer(app);

    // Body parser middleware
    app.use(express.json());

    // HTTP request logger middleware
    app.use(
        morgan(':method :url :status :res[content-length] - :response-time ms'),
    );

    // Healthy check endpoint
    app.get('/health', (_req, res) => {
        res.status(200).json({
            status: 'OK',
            service: 'Todo_Service',
            timestamp: new Date().toISOString(),
        });
    });
    // GraphQL Server
    const server = new ApolloServer({
        typeDefs: `
        type Query {
            hello: String
        }`,
        resolvers: {
            Query: {
                hello: () => 'Hello World!',
            },
        },
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();
    // GraphQL endpoint
    app.use('/api/todo', expressMiddleware(server));

    // Not found handler
    app.use(notFoundHandler);
    return httpServer;
};
