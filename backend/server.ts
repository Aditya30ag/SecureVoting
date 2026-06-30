// ─── Step 1: Load env vars FIRST, before anything else ───────────────────────
// dotenv and path use no env vars themselves so they are safe to import up top
import dotenv from 'dotenv';
import path from 'path';

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: path.resolve(__dirname, envFile) });

// ─── Step 2: All other imports (env is now populated) ─────────────────────────
import express from 'express';
import cors from 'cors';

// These modules read process.env at load-time, so they MUST come after dotenv.config()
// We use require() to prevent TypeScript from hoisting them above the dotenv call
const { connectToPg } = require('./db');
const { connectRedis } = require('./redisClient');
const { initMinio } = require('./minioClient');
const { exampleQueue } = require('./queue');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const adminRoutes = require('./routes/admin');
const otpRoutes = require('./routes/otp');

// ─── Step 3: Start app ────────────────────────────────────────────────────────
connectToPg();
connectRedis();
initMinio();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/otp', otpRoutes);

// Test route for BullMQ
app.post('/api/test-queue', async (req: express.Request, res: express.Response) => {
    try {
        const job = await exampleQueue.add('testJob', { message: 'Hello BullMQ!' });
        res.json({ success: true, jobId: job.id, message: 'Job added to queue!' });
    } catch (error: any) {
        console.error('Error adding job to queue:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port} [${process.env.NODE_ENV || 'development'}]`);
});