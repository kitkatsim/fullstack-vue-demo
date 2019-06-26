const express = require('express');
const mongodb = require('mongodb');

//store connection string on a file named config
const config = require('./config');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});


//Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });

    res.status(200).send();
    //await posts.deleteOne({_id: req.params.id});
});

//update post
router.put('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.updateOne(
        {
            _id: new mongodb.ObjectID(req.params.id)
        },
        {
            $set: {
                text: req.body.text,
                updatedAt: new Date()
            }
        }
    );

    res.status(200).send();
});


async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(config.string, {
        useNewUrlParser: true
    });

    return client.db('vue-express').collection('posts');
}

module.exports = router;