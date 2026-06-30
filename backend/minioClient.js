const Minio = require('minio');
// env vars are loaded centrally by server.ts / env.js before this module is required

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT || '127.0.0.1',
    port: parseInt(process.env.MINIO_PORT || '9000'),
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY || 'admin',
    secretKey: process.env.MINIO_SECRET_KEY || 'adminpassword'
});

const BUCKET_NAME = 'votes-photos';

async function initMinio() {
    try {
        const exists = await minioClient.bucketExists(BUCKET_NAME);
        if (!exists) {
            await minioClient.makeBucket(BUCKET_NAME, 'us-east-1');
            console.log(`MinIO bucket "${BUCKET_NAME}" created successfully.`);
            
            // Set bucket policy to public read so frontend can display the images
            const policy = {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: ['s3:GetObject'],
                        Effect: 'Allow',
                        Principal: '*',
                        Resource: [`arn:aws:s3:::${BUCKET_NAME}/*`]
                    }
                ]
            };
            await minioClient.setBucketPolicy(BUCKET_NAME, JSON.stringify(policy));
            console.log(`MinIO bucket "${BUCKET_NAME}" policy set to public read.`);
        }
    } catch (err) {
        console.error('Error initializing MinIO bucket:', err);
    }
}

module.exports = { minioClient, initMinio, BUCKET_NAME };
