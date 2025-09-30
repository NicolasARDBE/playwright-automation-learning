const crypto = require('crypto');

export async function getRandomNumber(min: number, max: number): Promise<number> {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function generateRandomString(length: number): Promise<string> {
    return crypto.randomBytes(20).toString('hex');
}