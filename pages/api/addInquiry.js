import clientPromise from './mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('Leads'); // Ensure this matches your DB
    const collection = db.collection('Lead_Data'); // Ensure this matches your Collection

    console.log("📢 Fetching leads...");

    const {
        company_name,
        type,
        city,
        enquiry_date,
        enquiry_type,
        project_status,
        followup1_description,
      } = req.body;
  
      if (!company_name || !city || !enquiry_date) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      const newInquiry = {
        company_name,
        type,
        city,
        enquiry_date,
        enquiry_type,
        project_status,
        followup1_description,
        createdAt: new Date(),
      };
  
      await collection.insertOne(newInquiry);
      res.status(201).json({ message: "Inquiry added successfully", data: newInquiry });
  
    } catch (error) {
      console.error("Error inserting inquiry:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  }