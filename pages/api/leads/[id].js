import { ObjectId } from 'mongodb';
import clientPromise from '../../mongodb';

export default async function handler(req, res) {

  const {
    query: { id },
    method,
  } = req;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('Leads');
    const collection = db.collection('Lead_Data');

    switch (method) {
      case 'GET':
  const lead = await collection.findOne({ _id: new ObjectId(id) });
  if (!lead) return res.status(404).json({ message: 'Not found' });
  return res.status(200).json(lead);
  
      case 'PUT':
        const updatedData = req.body;

        const updateResult = await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updatedData }
        );

        if (updateResult.modifiedCount === 0) {
          return res.status(404).json({ message: 'Lead not found or unchanged' });
        }

        return res.status(200).json({ message: 'Lead updated successfully' });

      case 'DELETE':
        const deleteResult = await collection.deleteOne({ _id: new ObjectId(id) });

        if (deleteResult.deletedCount === 0) {
          return res.status(404).json({ message: 'Lead not found' });
        }

        return res.status(200).json({ message: 'Lead deleted successfully' });

      default:
        res.setHeader('Allow', ['PUT', 'DELETE']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('❌ DB Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}