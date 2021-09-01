const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [{model: User, attributes: ['name']}]
        });
        res.status(200).json(commentData)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const addComment = await Comment.create({
            text: req.body.text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        });
        res.status(200).json(addComment)
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;