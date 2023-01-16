// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from "mongodb";

const connectionString = `mongodb+srv://${process.env.mongodb_userName}:${process.env.mongodb_password}@${process.env.mongodb_clusterName}.ivppj.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };

    let client;

    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: "Couldn't connect to database." });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection("messages").insertOne(newMessage);

      newMessage.id = result.insertedId;
    } catch (error) {
      await client.close();
      res.status(500).json({ message: "Can not insert data to database." });
      return;
    }

    await client.close();

    res.status(201).json({
      message: "Successfully added message.",
      newMessage: newMessage,
    });
  }
};

export default handler;
