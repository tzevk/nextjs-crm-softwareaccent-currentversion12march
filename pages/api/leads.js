import clientPromise from './mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('Leads'); // Database Name
    const collection = db.collection('Lead_Data'); // Collection Name

    console.log("📢 Fetching leads...");

    if (req.method === 'GET') {
      const { search, filterField } = req.query;
      let query = {};

      // Apply search filter if provided
      if (search && filterField) {
        query[filterField] = { $regex: search, $options: "i" }; // Case-insensitive search
      }

      const leads = await collection.find(query, {
        projection: { 
          sr_no: 1, 
          company_name: 1, 
          type: 1, 
          city: 1, 
          enquiry_date: 1, 
          enquiry_type: 1, 
          project_status: 1, 
          followup1_description: 1
        }
      }).sort({ sr_no: 1 }).toArray(); // Sorting by sr_no

      if (leads.length === 0) {
        console.log("❌ No data found.");
      }

      return res.status(200).json(leads);
    } 
    
    if (req.method === 'POST') {
      const newLead = req.body;
      
      if (!newLead.company_name || !newLead.enquiry_date) {
        return res.status(400).json({ message: "Company name and enquiry date are required" });
      }

      await collection.insertOne(newLead);
      return res.status(201).json({ message: "Lead added successfully" });
    }

    // If method is not GET or POST
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);

  } catch (error) {
    console.error('🚨 Database Error:', error);
    return res.status(500).json({ error: 'Database connection failed', details: error.message });
  }
}