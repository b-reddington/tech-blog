const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new comment
router.post('/', withAuth, async (req, res) => {
    try {
        console.log(req.body.post_id);
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        });
        res.status(200).json(newComment);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;
