const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const url = 'mongodb://localhost:27017';
const dbName = 'post-eats';
const collectionName = 'menu-items';
const PORT = 10101
app.use(express.json());

app.post('/check-mongodb', (req, res) => {
    const ids = req.body.ids;
    MongoClient.connect(url, function(err, client) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Error connecting to MongoDB' });
        } else {
            console.log('Connected to MongoDB');
            const db = client.db(dbName);
            const collection = db.collection(collectionName);
            const promises = ids.map(id => {
                return collection.findOne({ id: id })
                .then(result => {
                    return { id: id, exists: result !== null };
                });
            });
            Promise.all(promises)
            .then(data => {
                res.send(data);
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
