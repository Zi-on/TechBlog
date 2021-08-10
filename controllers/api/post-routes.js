const router = require('express').Router();
const { Post } = require('../../models');
const { User } = require('../../models');
const { Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{model: User, attributes: ['name']},
            {model: Comment, attributes: ['id', 'text', 'post_id', 'user_id'], include: [{model: User, attributes: ['name']}]}]
        });
        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const addPost = await Post.create({
            title: req.body.title,
            body: req.body.body,
            user_id: req.body.user_id
        });
        res.status(200).json(addPost)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletePost = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
    if (!deletePost) {
        res.status(404).json({ message: "no post with his id!" });
        return;
    }
    res.status(200).json(deletePost);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;