import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

// Load environment variables
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = "Users";
const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { username, password, role } = req.body;

    if (!JWT_SECRET) {
        console.error("❌ JWT_SECRET is missing! Check .env.local");
        return res.status(500).json({ message: "Internal server error" });
    }

    try {
        const client = await MongoClient.connect(MONGODB_URI);
        const db = client.db(MONGODB_DB);
        const usersCollection = db.collection('Accounts');

        const user = await usersCollection.findOne({ username, role });

        if (!user) {
            client.close();
            return res.status(401).json({ message: 'Invalid username or role' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            client.close();
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ username, role }, JWT_SECRET, { expiresIn: '1h' });

        res.setHeader('Set-Cookie', serialize('session', token, { path: '/', httpOnly: true, maxAge: 3600 }));

        let redirectPath = '/dashboard';
        if (role === 'admin') redirectPath = '/admin';
        if (role === 'project manager') redirectPath = '/pm-dashboard';

        client.close();
        return res.status(200).json({ message: 'Login successful', redirect: redirectPath });

    } catch (error) {
        console.error('❌ Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}