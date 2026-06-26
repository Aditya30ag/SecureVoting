const { Queue, Worker } = require('bullmq');
require('dotenv').config();

// BullMQ uses ioredis internally. We can just pass the connection options.
const connection = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    // Add password or username if needed:
    // password: process.env.REDIS_PASSWORD
};

// Create a new queue
const exampleQueue = new Queue('exampleQueue', { connection });

// Create a worker for the queue
const exampleWorker = new Worker('exampleQueue', async job => {
    console.log(`Processing job ${job.id} with data:`, job.data);
    
    // Simulate some work
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true, processed: job.data };
}, { connection });

exampleWorker.on('completed', job => {
    console.log(`Job ${job.id} has completed!`);
});

exampleWorker.on('failed', (job, err) => {
    console.error(`Job ${job.id} has failed with ${err.message}`);
});

module.exports = { exampleQueue };
