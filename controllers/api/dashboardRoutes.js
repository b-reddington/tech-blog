const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Dashboard should contain the posts of the logged in user

module.exports = router;