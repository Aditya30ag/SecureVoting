const { createClient } = require('redis');

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

async function connectRedis() {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect();
            console.log('Connected to Redis successfully');
        }
    } catch (error) {
        console.error('Failed to connect to Redis', error);
    }
}

module.exports = { redisClient, connectRedis };
