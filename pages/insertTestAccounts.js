// insertAccounts.js

const { MongoClient } = require("mongodb");
const { createHash } = require("crypto");

async function insertAccounts() {
  // 1) Hardcode your Atlas connection string here:
  //    Replace <username>, <password>, <clusterURL>, and <dbname> with your actual details.
  const uri = "mongodb+srv://admin:admin@accent.wxjct.mongodb.net/?retryWrites=true&w=majority&appName=ACCENT";

  // 2) Connect to MongoDB Atlas
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");

    // 3) Specify your database name (must match <dbname> above)
    const db = client.db("Users");

    // ============== INSERT/UPDATE ADMIN ==============
    const adminUsername = "admin";      // Adjust as needed
    const adminPassword = "admin123";   // Use a strong password in production

    // Hash the admin password
    const adminHash = createHash("sha256").update(adminPassword).digest("hex");

    // Upsert the admin record into the "Admins" collection
    const resultAdmin = await db.collection("Admins").updateOne(
      { Username: adminUsername },
      { $set: { Username: adminUsername, Password: adminHash } },
      { upsert: true }
    );

    if (resultAdmin.upsertedCount > 0) {
      console.log("Admin account created successfully!");
    } else {
      console.log("Admin account already exists and was updated successfully!");
    }

    // ============== INSERT/UPDATE USER ==============
    const userUsername = "testuser";    // Adjust as needed
    const userPassword = "password123"; // Use a strong password in production

    // Hash the user password
    const userHash = createHash("sha256").update(userPassword).digest("hex");

    // Upsert the user record into the "Profiles" collection
    const resultUser = await db.collection("Profiles").updateOne(
      { Username: userUsername },
      { $set: { Username: userUsername, Password: userHash } },
      { upsert: true }
    );

    if (resultUser.upsertedCount > 0) {
      console.log("User account created successfully!");
    } else {
      console.log("User account already exists and was updated successfully!");
    }

  } catch (error) {
    console.error("Error inserting accounts:", error);
  } finally {
    // 4) Close the MongoDB connection
    await client.close();
    console.log("🔒 Connection to MongoDB closed");
  }
}

// Execute the function
insertAccounts();