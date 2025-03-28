import clientPromise from '../lib/mongodb';

export async function getLeads() {
  try {
    const client = await clientPromise;
    const db = client.db('ACCENT'); // Make sure this matches your database name
    const collection = db.collection('Lead_Data'); // Your MongoDB collection name

    const leads = await collection.find({}).limit(10).toArray();
    return leads;
  } catch (error) {
    console.error('Error fetching leads:', error);
    return [];
  }
}