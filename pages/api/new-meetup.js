import { MongoClient } from "mongodb";

// /api/new-meetup

// qCDpAYzq5WJvNdeL

async function handler(req, res) {
    if (req.method === 'POST'){
        const data = req.body;

        //const { title, image, address, description } = data;

        const client = await MongoClient.connect('mongodb+srv://dherya:qCDpAYzq5WJvNdeL@cluster0.keqbyhu.mongodb.net/?retryWrites=true&w=majority');
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({message: 'Meetup inserted!'});
    }
}

export default handler;