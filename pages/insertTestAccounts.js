const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

async function insertAccounts() {
  // 1) MongoDB Atlas connection string
  const uri = "mongodb+srv://admin:admin@accent.wxjct.mongodb.net/?retryWrites=true&w=majority&appName=ACCENT";

  // 2) Connect to MongoDB Atlas
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");

    // 3) Specify your database and collection
    const db = client.db("Users");
    const usersCollection = db.collection("Accounts"); // Changed collection name to store all roles

    // Helper function to insert/update user accounts
    async function upsertUser(username, password, role) {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password securely

      const result = await usersCollection.updateOne(
        { username: username, role: role }, // Ensure uniqueness by username + role
        { $set: { username, password: hashedPassword, role } },
        { upsert: true }
      );

      if (result.upsertedCount > 0) {
        console.log(`✅ ${role} account created successfully!`);
      } else {
        console.log(`🔄 ${role} account already exists and was updated successfully!`);
      }
    }

    // ========== INSERT/UPDATE ADMIN ==========
    await upsertUser("admin", "admin123", "admin");

    // ========== INSERT/UPDATE PROJECT MANAGER ==========
    await upsertUser("pm", "pm123", "project manager");

    // ========== INSERT/UPDATE USER ==========
    await upsertUser("user1", "user123", "user");

  } catch (error) {
    console.error("❌ Error inserting accounts:", error);
  } finally {
    // 4) Close the MongoDB connection
    await client.close();
    console.log("🔒 Connection to MongoDB closed");
  }
}

// Execute the function
insertAccounts();