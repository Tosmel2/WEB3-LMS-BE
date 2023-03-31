const express = require('express')

const router = express.Router()

const addComment = require('../controller/Comment/addComment')
const getAllComment = require('../controller/Comment/getAllComment')
const getOneComment = require('../controller/Comment/getOneComment')
const deleteComment = require('../controller/Comment/deleteComment')
const updateComment = require('../controller/Comment/updateComment')

router.post('/:id', addComment)
router.get('/:id', getAllComment)
router.get('/:postId/comments/:commentId/getone', getOneComment)
router.delete('/:commentId', deleteComment)

router.put('/putcomment/:commentId', updateComment)

module.exports = router
