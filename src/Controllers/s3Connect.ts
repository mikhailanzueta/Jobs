// Import necessary modules from AWS SDK
import { S3Client, DeleteObjectsCommand, GetObjectCommand, ListObjectsV2Command, HeadObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';
import { ReadStream, } from 'fs';
dotenv.config()

// Initialize an S3 client with provided credentials
const s3Client = new S3Client({
    region: process.env.AWS_REGION || "", // Specify the AWS region from environment variables
    credentials: {
        accessKeyId: process.env.AWS_ACCESSKEYID || "", // Access key ID from environment variables
        secretAccessKey: process.env.AWS_SECRETACCESSKEY || "" // Secret access key from environment variables
    }
});

// Export folder names for easier reference
exports.awsFolderNames = {
    sub1: 'File_Folder'
};

export const uploadFileToAws = async (fileName: string, fileStream: string): Promise<string> => {
    console.log('Uploading file to aws: ', fileName)
    try {
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: `${exports.awsFolderNames.sub1}/${fileName}`, // Ensures the file is uploaded to the folder and not just the bucket
            Body: fileStream,
        };
        console.log("AWS Upload Params:", uploadParams);
        await s3Client.send(new PutObjectCommand(uploadParams));
        console.log("Upload successful for:", fileName);
        return 'success';
    } catch (err) {
        console.error('Error', err);
        return 'error';
    }
};

// Export function to get a signed URL for downloading a file from AWS S3
export const getFileUrlFromAws = async (fileName: string, expireTime: number | null = null): Promise<string> => {
    try {
        const isAvailable = await isFileAvailableInAwsBucket(fileName);
        if (!isAvailable) return 'error';

        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: fileName,
        });

        const url = await getSignedUrl(s3Client, command, expireTime ? { expiresIn: expireTime } : {});
        return url;
    } catch (err) {
        console.log('error ::', err);
        return 'error';
    }
};

export const isFileAvailableInAwsBucket = async (fileName: string): Promise<boolean> => {
    try {
        await s3Client.send(new HeadObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: fileName,
        }));
        return true;
    } catch (err: any) {
        return err.name === 'NotFound' ? false : false;
    }
};

export const deleteFileFromAws = async (fileName: string): Promise<string> => {
    try {
        const deleteParams = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: fileName,
        };

        await s3Client.send(new DeleteObjectCommand(deleteParams));
        return 'success';
    } catch (err) {
        console.error('Error', err);
        return 'error';
    }
};