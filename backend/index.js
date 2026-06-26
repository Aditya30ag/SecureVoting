const { connectToPg } = require('./db');
const express = require('express');
var cors = require('cors');
require('dotenv').config();
const { connectRedis } = require('./redisClient');
const { initMinio } = require('./minioClient');

connectToPg();
connectRedis();
initMinio();
const app = express()
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(cors({ origin: "*" }));  

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.use('/api/admin', require('./routes/admin'))
app.use('/api/otp', require('./routes/otp'))

// Test route for BullMQ
const { exampleQueue } = require('./queue');
app.post('/api/test-queue', async (req, res) => {
    try {
        const job = await exampleQueue.add('testJob', { message: 'Hello BullMQ!' });
        res.json({ success: true, jobId: job.id, message: 'Job added to queue!' });
    } catch (error) {
        console.error('Error adding job to queue:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})