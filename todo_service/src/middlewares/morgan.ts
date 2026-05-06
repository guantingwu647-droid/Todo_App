import { logger } from '#configs/logger.js';
import morgan from 'morgan';

const stream = {
    write: (text: string) => {
        logger.info(text.trim());
    },
};

export const morganMiddleware = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    {
        stream,
    },
);
